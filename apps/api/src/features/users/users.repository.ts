import { UserDetails } from "dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "src/schemas/user.schema";

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

  async deleteUser(id: string) {
    await this.userModel.deleteOne({ _id: id });
  }

  async registerUser(details: UserDetails, hashedPassword: string) {
    return await this.userModel.create({
      ...details,
      hashedPassword
    });
  }
}
