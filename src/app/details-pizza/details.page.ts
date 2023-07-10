import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {  Pizza, itemCart } from 'type';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { AlertController, AlertOptions, ModalController, ToastController } from '@ionic/angular';

import { itemPizza } from '../../../type';

import * as moment from 'moment';
import { AssetService } from 'asset.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id:string;
activitePizza$:Observable<any>;
CartItem:itemPizza[]
isModalOpen = false;



  constructor(

   private service: AssetService,
  private actroute: ActivatedRoute,
  private storage :Storage,
  public modal:ModalController,
  public toast:ToastController,
  public alertctrl: AlertController

  ) {

    this.storage.create();
  }

  ngOnInit() {

    this.activitePizza$ = this.actroute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getPizzabyId(params.get('id'))
      )
    );
    this.getStorageItemCart();
  }

  async addPanier(PizzaDetail: Pizza) {
        
    let added: boolean = false;
    /*  si le panier est vide */
    const heureActuelle= moment.utc();
  const heureDebut = moment.utc().set({ hour: 6, minute: 0, second: 0 });
    const heureFin = moment.utc().set({ hour: 16, minute: 0, second: 0 });

    if (heureActuelle.isBetween(heureDebut,heureFin)) {
      console.log("Le bouton est fonctionnel")

      this.storage.get('CartPizza').then((data: itemPizza[]) => {
        if (data === null || data.length === 0) {
          data = [];
          data.push({
            item: PizzaDetail,
            qty: 1,
            amount: PizzaDetail.price,
          });
        } else {
          for (let i = 0; i < data.length; i++) {
            const element: itemPizza = data[i];
            if (PizzaDetail.id === element.item.id) {
              /* le panier nest pas vide et contient  l'article  */
  
              element.qty += 1;
              element.amount += PizzaDetail.price;
              added = true;
            }
          }
          if (!added) {
            /* le panier nest pas vide et contient pas l'article  */
            data.push({
              item: PizzaDetail,
              qty: 1,
              amount: PizzaDetail.price,
            });
          }
        }
        this.storage
          .set('CartPizza', data)
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
        header: 'Infos',
        message: 'Veuillez patienter jusqu\'à 06h pour passer vos commandes',
        buttons: ['OK'],
       
        mode:"ios",
      });
      await alert.present();
    }

    
    

  
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async getStorageItemCart(){
    this.storage.get('CartPizza').then((data:itemPizza[])=>{
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
              .set('CartPizza', this.CartItem)
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
