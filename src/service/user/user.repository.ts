import { model, Schema } from 'mongoose'


export interface UserInterface {
  ID: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  avatar: string,
  createAt: string,
  updatedAt: string,
  lastAcess: string,
  typeUser: string
}

export interface UpdateUser {
  ID: String;
  userInput: {
    firstName: String,
    lastName: String,
    email: String,
    avatar: String
  }
}

export interface LoginInteface {
  email: string,
  password: string,
}

export const UserSchema = new Schema({
  ID: String,
  firstName: String,
  lastName: String,
  email: String!,
  password: String!,
  avatar: String,
  createdAt: String,
  updatedAt: String,
  lastAcess: String,
  typeUser: String
})

export const UserModel = model('users-tests', UserSchema)
