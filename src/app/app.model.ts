export class Product {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public category: number,
    public availability: boolean
  ) {  }
}

export interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    category: number;
    availability: boolean;
}

export class Category {
  constructor(
    public code: number,
    public title: string,
  ) {  }
}

export interface Category {
    code: number;
    title: string;
}
