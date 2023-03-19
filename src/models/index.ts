
interface Adress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface UsersInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Adress;
  phone: string;
  website: string;
  company: Company;
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
