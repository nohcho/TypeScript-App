interface adress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
export interface UsersInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: adress;
  phone: string;
  website: string;
}

export interface TodoList {
  userId?: number;
  id: number;
  title: string;
  completed?: boolean;
}
