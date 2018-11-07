export class Product {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public category: string,
    public availability: boolean
  ) {  }
}

export interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    category: string;
    availability: boolean;
}

export class Category {
  constructor(
    public code: string,
    public title: string,
  ) {  }
}

export interface Category {
    code: string;
    title: string;
}
