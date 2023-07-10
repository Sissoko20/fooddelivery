import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Cake, PlAfricain, itemCart, itemPafr } from 'type';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, AlertOptions, ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { AssetService } from 'asset.service';
@Component({
  selector: 'app-details-plat-africains',
  templateUrl: './details-plat-africains.page.html',
  styleUrls: ['./details-plat-africains.page.scss'],
})
export class DetailsPlatAfricainsPage implements OnInit {

  activitePlatAfri$:Observable<any>;
  isModalOpen = false;
  CartItem:itemPafr[]

 constructor(

   private service:AssetService,
   private actroute:ActivatedRoute,
   private storage: Storage,
   public toast: ToastController,
   public modal:ModalController,
   public alertctrl:AlertController

  ) {
    this.storage.create();

 
      }

  ngOnInit() {
    this.activitePlatAfri$ = this.actroute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getPlAfricainbyId(params.get('id'))
      )
    );
    this.getStorageItemCart();
  }


  async addPanier(PlatDetail: PlAfricain) {
    
    let added: boolean = false;
    /*  si le panier est vide */
    const heureActuelle= moment.utc();
    const heureDebut = moment.utc().set({ hour: 6, minute: 0, second: 0 });
      const heureFin = moment.utc().set({ hour: 16, minute: 0, second: 0 });
  
      if (heureActuelle.isBetween(heureDebut,heureFin)) {
        console.log("Le bouton est fonctionnel");
        this.storage.get('PlatDetail').then((data: itemPafr[]) => {
          if (data === null || data.length === 0) {
            data = [];
            data.push({
              item: PlatDetail,
              qty: 1,
              amount: PlatDetail.price,
            });
          } else {
            for (let i = 0; i < data.length; i++) {
              const element: itemPafr = data[i];
              if (PlatDetail.id === element.item.id) {
                /* le panier nest pas vide et contient  l'article  */
    
                element.qty += 1;
                element.amount += PlatDetail.price;
                added = true;
              }
            }
            if (!added) {
              /* le panier nest pas vide et contient pas l'article  */
              data.push({
                item: PlatDetail,
                qty: 1,
                amount: PlatDetail.price,
              });
            }
          }
          this.storage
            .set('PlatDetail', data)
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
        const alert = await this.alertctrl.create({
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
    this.storage.get('PlatDetail').then((data:itemPafr[])=>{
      this.CartItem=data
    }).catch(err=>{
      console.log(err);
    })
   }
   removeItem(article: itemPafr, index: number): void {
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
              .set('PlatDetail', this.CartItem)
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
  
    this.alertctrl.create(options).then((data) => {
      data.present();
    });
  }

}
