import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, ToastOptions, AlertController, AlertOptions } from '@ionic/angular';
import { Observable, of, switchMap } from 'rxjs';
import { Cake, PlAfricain, itemCart, itemPafr } from 'type';

import { ActivatedRoute,ParamMap } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

import * as moment from 'moment';
import { AssetService } from 'asset.service';

@Component({
  selector: 'app-details-cake',
  templateUrl: './details-cake.page.html',
  styleUrls: ['./details-cake.page.scss'],
})
export class DetailsCakePage implements OnInit {
  myArray$: Observable<number[]>;
  dataLoaded = true;
  asset: AssetService;

  cake: Observable<Cake>;
  id: string;
  activiteCake$: Observable<any>;

  isModalOpen = false;
  CartItem:itemCart[];


  constructor(
    private service: AssetService,
    private actroute: ActivatedRoute,
    private storage: Storage,
    public toast: ToastController,
    public modal:ModalController,
    public alertcrtl:AlertController,
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.activiteCake$ = this.actroute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getCakebyId(params.get('id'))
      )
    );
    this.getStorageItemCart();
  }

  async addPanier(cakeDetail: Cake) {
    const heureActuelle= moment.utc();
    const heureDebut = moment.utc().set({ hour: 6, minute: 0, second: 0 });
      const heureFin = moment.utc().set({ hour: 16, minute: 0, second: 0 });
  
   
   
    let added: boolean = false;
    /*  si le panier est vide */

    if (heureActuelle.isBetween(heureDebut,heureFin)) {
      console.log("Le bouton est fonctionnel")

      this.storage.get('Cart').then((data: itemCart[]) => {
        if (data === null || data.length === 0) {
          data = [];
          data.push({
            item: cakeDetail,
            qty: 1,
            amount: cakeDetail.price,
          });
        } else {
          for (let i = 0; i < data.length; i++) {
            const element: itemCart = data[i];
            if (cakeDetail.id === element.item.id) {
              /* le panier nest pas vide et contient  l'article  */
  
              element.qty += 1;
              element.amount += cakeDetail.price;
              added = true;
            }
          }
          if (!added) {
            /* le panier nest pas vide et contient pas l'article  */
            data.push({
              item: cakeDetail,
              qty: 1,
              amount: cakeDetail.price,
            });
          }
        }
        this.storage
          .set('Cart', data)
          .then((data) => {
            this.toast
              .create({
                header: 'Notification ',
                message: 'Votre panier a été mis à jour ',
                duration: 1000,
                keyboardClose: true,
                position: 'bottom',
                animated: true,
                mode: 'md',
              })
              .then((res) => {
                res.present();
              });
          })
          .catch((err) => console.log(err));
      });
      
    } else {
      const alert = await this.alertcrtl.create({
        header: 'Info',
        message: 'Veuillez patienter jusqu\'à 06h pour utiliser ce bouton.',
        buttons: ['OK'],
      });
      await alert.present();
    }



  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async getStorageItemCart(){
    this.storage.get('Cart').then((data:itemCart[])=>{
      this.CartItem=data
    }).catch(err=>{
      console.log(err);
    })
   }

   removeItem(article: itemCart, index: number): void {
    let options: AlertOptions = {
      subHeader: `Etes-vous de bien vouloir retirer ${article.item.title} ?`,
      header: "Suppression d'article",
      mode: 'md',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Retirer',
          handler: () => {
            let price: number = article.item.price;
            let qty: number = article.qty;
            let amount: number = article.amount;
            this.CartItem.splice(index, 1);
            this.storage
              .set('Cart', this.CartItem)
              .then((res) => {
                this.toast
                  .create({
                    message: 'Artcle retiré du panier',
                    duration: 1000,
                    color:"success",
                  })
                  .then((res) => {
                    res.present();
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
    };
  
    this.alertcrtl.create(options).then((data) => {
      data.present();
    });
  }

  }


