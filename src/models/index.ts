export interface UsersInfo {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoList {
  userId?: number;
  id: number;
  title: string;
  completed?: boolean;
}
