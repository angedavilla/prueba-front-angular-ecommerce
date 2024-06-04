export interface IOrderItem {
  order: {
    id: number;
  };
  product: {
    id: number;
  };
  quantity: number;
  price: number;
}