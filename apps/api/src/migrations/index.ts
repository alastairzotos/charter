import { INestApplication } from '@nestjs/common';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { ConfigurationRepository } from 'features/configuration/configuration.repository';
import { InstancesRepository } from 'features/instances/instances.repository';
import { OperatorsRepository } from 'features/operators/operators.repository';
import { ServiceSchemaCategoryRepository } from 'features/service-schema-categories/service-schema-categories.repository';
import { ServiceSchemaRepository } from 'features/service-schemas/service-schema.repository';
import { ServicesRepository } from 'features/services/services.repository';

export default null;

const getRepos = async (app: INestApplication) => {
  const instanceRepo = await app.get<InstancesRepository>(InstancesRepository);
  const schemaCategoriesRepo = await app.get<ServiceSchemaCategoryRepository>(
    ServiceSchemaCategoryRepository,
  );
  const schemasRepo = await app.get<ServiceSchemaRepository>(
    ServiceSchemaRepository,
  );
  const servicesRepo = await app.get<ServicesRepository>(ServicesRepository);
  const operatorsRepo = await app.get<OperatorsRepository>(OperatorsRepository);
  const bookingsRepo = await app.get<BookingsRepository>(BookingsRepository);
  const configRepo = await app.get<ConfigurationRepository>(
    ConfigurationRepository,
  );

  return {
    instanceRepo,
    schemaCategoriesRepo,
    schemasRepo,
    servicesRepo,
    operatorsRepo,
    bookingsRepo,
    configRepo,
  };
};
