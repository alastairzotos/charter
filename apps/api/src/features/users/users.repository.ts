import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDetails, UserRole } from 'dtos';
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

  async getAdmins() {
    return await this.userModel.find({
      $or: [{ role: 'admin' }, { role: 'super-admin' }],
    });
  }

  async getSuperAdmins() {
    return await this.userModel.find({ role: 'super-admin' });
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id);
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

  async updatePassword(id: string, hashedPassword: string) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { hashedPassword },
    );
  }

  async setUserRole(id: string, role: UserRole) {
    await this.userModel.findOneAndUpdate({ _id: id }, { role });
  }

  async createUserFromOAuth2(details: UserDetails) {
    return await this.userModel.create(details);
  }
}
