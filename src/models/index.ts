export interface usersInfo {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface todoList {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
