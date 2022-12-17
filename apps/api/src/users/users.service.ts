import { LoginResponse, UserDetails, RegisterDetails, LoginDetails } from "dtos";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { EnvService } from "../environment/environment.service";
import { User } from "../schemas/user.schema";
import * as jwt from 'jsonwebtoken';
import * as  bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly env: EnvService,
    private readonly usersRepository: UsersRepository,
  ) { }

  async getUsers() {
    return await this.usersRepository.getUsers()
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  async updateUser(id: string, newUser: Partial<UserDetails>) {
    await this.usersRepository.updateUser(id, newUser);
  }

  async deleteUser(id: string) {
    await this.usersRepository.deleteUser
  }

  async registerUser({ givenName, email, password }: RegisterDetails): Promise<LoginResponse> {
    const user = await this.usersRepository.registerUser(
      {
        givenName,
        email
      },
      await bcrypt.hash(password, 10)
    );

    return {
      accessToken: this.generateAccessToken(user),
    }
  }

  async loginUser({ email, password }: LoginDetails): Promise<LoginResponse | null> {
    const user = await this.usersRepository.getUserByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    const pwCheck = await bcrypt.compare(password, user.hashedPassword);

    if (!pwCheck) {
      return null;
    }

    return {
      accessToken: this.generateAccessToken(user)
    }
  }

  private generateAccessToken({ _id, email, givenName }: User) {
    return jwt.sign({ _id, email, givenName }, this.env.get().jwtSigningKey);
  }
}