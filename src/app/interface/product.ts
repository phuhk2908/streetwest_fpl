export interface Product {
  id: string;
  name: string;
  price: number;
  img: [[name: string]];
  idCategory: string;
  date: string;
  size: {
    [key: string]: {
      sold: number;
      amount: number;
    };
  };
}
