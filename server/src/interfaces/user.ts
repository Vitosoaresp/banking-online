export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUser extends IUserLogin {
  id: number;
}