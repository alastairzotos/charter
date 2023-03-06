import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDetails } from 'dtos';
import { Model } from 'mongoose';

import { User } from 'schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUsers() {
    return await this.userModel.find();
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async getUserByEmailWithPassword(email: string) {
    return await this.userModel.findOne({ email }).select('+hashedPassword');
  }

  async updateUser(id: string, newUser: Partial<UserDetails>) {
    await this.userModel.findOneAndUpdate({ _id: id }, newUser);
  }

  async deleteUser(email: string) {
    await this.userModel.deleteOne({ email });
  }

  async registerUser(details: UserDetails, hashedPassword: string) {
    return await this.userModel.create({
      ...details,
      hashedPassword,
    });
  }
}
