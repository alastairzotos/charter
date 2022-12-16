import { Injectable } from '@nestjs/common';


@Injectable()
export class EnvService {
  private readonly env_vars = {
    dbConnectionString: process.env.DB_CONNECTION_STRING as string,
  };

  get() {
    return this.env_vars;
  }
}
