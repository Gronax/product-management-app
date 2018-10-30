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
