export interface IUserFromReq {
  email: string,
  password: string,
}

export interface IUserFromDB extends IUserFromReq {
  role: string,
  username: string,
}

export interface IToken {
  token: string,
}

export default interface IServiceUser {
  login(user: IUserFromReq): Promise<IToken>;
}
