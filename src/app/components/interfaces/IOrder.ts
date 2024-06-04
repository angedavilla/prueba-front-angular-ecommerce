export interface User {
  id: number;
}

export interface IOrder {
  id?: number;
  user: User;
  total: number;
  discount: number;
}