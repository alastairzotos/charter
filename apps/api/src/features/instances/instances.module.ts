import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from 'environment/environment.module';
import { InstancesService } from 'features/instances/instances.service';
import { InstancesController } from 'features/instances/instances.controller';
import { InstancesRepository } from 'features/instances/instances.repository';
import { UsersModule } from 'features/users/users.module';
import { Instance, InstanceSchema } from 'schemas/instance.schema';

@Module({
  imports: [
    EnvModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: Instance.name, schema: InstanceSchema },
    ]),
  ],
  controllers: [InstancesController],
  providers: [InstancesService, InstancesRepository],
  exports: [InstancesService],
})
export class InstancesModule {}
