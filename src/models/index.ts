
interface adress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface company {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface UsersInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: adress;
  phone: string;
  website: string;
  company: company;
}

export interface TodoList {
  userId?: number;
  id?: number;
  title: string;
  completed?: boolean;
}

export interface Auth {
  user: string;
  isAuthenticated: boolean;
}
export interface MyFormProps {
  password?: string;
  email?: string;
}
