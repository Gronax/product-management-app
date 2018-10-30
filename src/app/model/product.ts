
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
    name: string;
    price: number;
    description: string;
    category: number;
    availability: boolean;
}

interface ProductId extends Product {
    id: string;
}
