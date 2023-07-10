import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Cake, Pizza, PlAfricain } from 'type';



@Injectable({
  providedIn: 'root'
})
export class AssetService {
  items=[];

imgdb:any=[];
cakeAsset:any=[];
PlatAfricainAsset:any=[];
task:any=[];

ngOnInit() {

}


  constructor( 

    public http: HttpClient) {

  

    this.getAllPizza();
      
     }


  getAllPizza(): Observable<Pizza[]>{
    return this.http.get<Pizza[]>(APIPizzaOnline)
  }

  getPizzabyId(activityId:string){
    
    return this.http.get(APIPizzaOnline +"/" +activityId)
  }

  getAllCake(): Observable<Cake[]>{
    return this.http.get<Cake[]>(APICakeOnline)
  }

  getCakebyId(activityId:string){
    
    return this.http.get(APICakeOnline +"/" +activityId)
  }

  getAllPlAfricain(): Observable<PlAfricain[]>{
    return this.http.get<PlAfricain[]>(APIPlAfricainOnline)
  }

  getPlAfricainbyId(activityId:string){
    
    return this.http.get(APIPlAfricainOnline +"/" +activityId)
  }
}

const localAPI="http://localhost:3000/pizza";
const APIPizzaOnline="https://my-json-server.typicode.com/Sissoko20/dbnanidelice/pizza";
const APICakeOnline="https://my-json-server.typicode.com/Sissoko20/dbnanidelice/cake";
const APIPlAfricainOnline="https://my-json-server.typicode.com/Sissoko20/dbnanidelice/plAfricain";