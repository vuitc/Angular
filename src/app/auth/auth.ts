export interface LoginForm {
    email: string;
    password: string;
  }
  export interface RegisterForm {
    email: string;
    password: string;
    comfirm_password: string;
  }
  export interface Users {
    id:string,
    email:string,
    password:string,
    role:number
}
  