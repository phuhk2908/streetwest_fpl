export interface Product {
  id: string;
  name: string;
  price: number;
  img: string[];
  idCategory: string;
  date: string;
  size: {
    [key: string]: {
      sold: number;
      amount: number;
    };
  };
  slug?: string;
  quantity?: number;
  total?: number;
  sizeSelected?: string;
  feature?: string;
}
