export interface signUpFormData {
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface signInFormData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  imageUrl: string;
}
