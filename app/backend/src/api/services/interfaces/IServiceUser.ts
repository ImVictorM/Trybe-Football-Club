export interface IUser {
  email: string,
  password: string,
}

export interface IToken {
  token: string,
}

export default interface IServiceUser {
  login(user: IUser): Promise<IToken>;
}
