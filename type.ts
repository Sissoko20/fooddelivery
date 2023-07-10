export interface Pizza {
    id: number
    title: string
    description: string
    img: string
    price: number,
  };
  export interface Cake {
    id: number
    title: string
    description: string
    img: string
    price: number
  };
  export interface PlAfricain {
    id: number
    title: string
    description: string
    img: string
    price: number
  }
  export interface itemCart {
    item: Cake
    qty: number;
    amount: number
   
  }

  export interface itemPizza {
    item: Pizza
    qty: number;
    amount: number;
   
  }

  export interface itemPafr {
    item: PlAfricain
    qty: number;
    amount: number;
   
  }


  
  /* if itemCart ==null, add to Panier */
  