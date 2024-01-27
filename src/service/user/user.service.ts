import { HttpException, Injectable } from '@nestjs/common';
import { LoginInteface, UpdateUser, UserInterface, UserModel } from './user.repository';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  async user(user: LoginInteface): Promise<UserInterface> {
    const isUserValid = await UserModel.findOne({ email: user.email });

    if (!isUserValid?.id) return null

    const currentPassword = user.password as string;

    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      String(isUserValid.password))

    if (!isCorrectPassword) return null

    const res = isUserValid.toObject() as UserInterface;
    return res
  }
  async getUsers() {
    return await UserModel.find().sort({ createdAt: -1 });
  }
  async createUser(user: UserInterface) {
    const isUserValid = await UserModel.findOne({ email: user.email });

    if (isUserValid) throw new HttpException('User already exists', 409)

    const password = user.password

    if (!password) return 'Invalid data'

    const hashPassword = bcrypt.hashSync(password, 5);
    const id = uuidv4();

    const newUser = new UserModel({
      ID: id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email,
      password: hashPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      typeUser: 'treinee'
    })

    const res = await newUser.save()

    return res
  }
  async deleteUser(id: string) {
    const wasDeleted = (await UserModel.deleteOne({ ID: id })).deletedCount
    return wasDeleted
  }
  async updateUser(userInput: UpdateUser) {
    const user = userInput.userInput
    const wasUpdated = (await UserModel.updateOne({ ID: userInput.ID }, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      updatedAt: new Date().toISOString(),
      avatar: user.avatar
    })).modifiedCount;

    return wasUpdated
  }
}
