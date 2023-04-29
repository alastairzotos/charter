import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'dtos';

export const Roles = (...roles: (UserRole | 'all')[]) =>
  SetMetadata('roles', roles);
