
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
