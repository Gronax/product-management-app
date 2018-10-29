export class Category {
    code: number;
    title: string;
}

export interface Category {
    code: number;
    title: string;
}

interface CategoryId extends Category {
    id: string;
}

export class Product {
    name: string;
    price: number;
    description: string;
    category: number;
    availability: boolean;
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
