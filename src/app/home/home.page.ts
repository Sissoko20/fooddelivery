import { Component } from '@angular/core';
import { Cake, Pizza, PlAfricain } from './../../../type';
import { Observable } from 'rxjs';
import { AssetService } from 'asset.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage {
  selectedSegment:string='pizza';
  PizzaMenu!:Observable<Pizza[]>;
  CakeMenu!:Observable<Cake[]>;
  PlAfricainMenu!:Observable<PlAfricain[]>;
  

  constructor(

   
    public assetService:AssetService,
   


  ) {
    this.PizzaMenu=this.assetService.getAllPizza();
    this.CakeMenu=this.assetService.getAllCake();   
    this.PlAfricainMenu=this.assetService.getAllPlAfricain(); 

  }

  segmentChanged(event:any){
    console.log(event.target.value);
    this.selectedSegment=event.target.value
  } 

}
