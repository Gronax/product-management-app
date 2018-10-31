export class Product {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public category: number,
    public availability: string
  ) {  }
}

export interface Product {
    name: string;
    price: number;
    description: string;
    category: number;
    availability: string;
}

interface ProductId extends Product {
    id: string;
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

interface CategoryId extends Category {
    id: string;
}
