import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InstanceDto, UserDetails, UserRole } from 'dtos';
import { Model } from 'mongoose';
import { ResetPasswordOtc } from 'schemas/reset-pwd-otc.schema';

import { User } from 'schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ResetPasswordOtc.name)
    private readonly resetPwdOtcModel: Model<ResetPasswordOtc>,
  ) {}

  async getUsers() {
    return await this.userModel.find();
  }

  async getAdmins(instance: string) {
    return await this.userModel.find({
      $or: [{ role: 'admin', instance }, { role: 'super-admin' }],
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

  async setUserRole(id: string, role: UserRole, instance: InstanceDto) {
    await this.userModel.findOneAndUpdate({ _id: id }, { role, instance });
  }

  async createUserFromOAuth2(details: UserDetails) {
    return await this.userModel.create(details);
  }

  async createResetPwdOtc(user: User, hashedCode: string, expires: number) {
    return await this.resetPwdOtcModel.create({ user, hashedCode, expires });
  }

  async getResetPwdOtcById(id: string) {
    return await this.resetPwdOtcModel.findById(id).populate('user');
  }

  async getResetPwdOtcByHashedCode(hashedCode: string) {
    return await this.resetPwdOtcModel.findOne({ hashedCode }).populate('user');
  }

  async expireResetPwdOtc(id: string) {
    await this.resetPwdOtcModel.findOneAndUpdate({ _id: id }, { expires: -1 });
  }
}
