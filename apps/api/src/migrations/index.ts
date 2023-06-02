import { INestApplication } from '@nestjs/common';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { ConfigurationRepository } from 'features/configuration/configuration.repository';
import { InstancesRepository } from 'features/instances/instances.repository';
import { OperatorsRepository } from 'features/operators/operators.repository';
import { OperatorsService } from 'features/operators/operators.service';
import { ServiceSchemaCategoryRepository } from 'features/service-schema-categories/service-schema-categories.repository';
import { ServiceSchemaRepository } from 'features/service-schemas/service-schema.repository';
import { ServicesRepository } from 'features/services/services.repository';
import { UsersService } from 'features/users/users.service';
import { DEFAULT_OPERATOR_PASSWORD } from 'utils';

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

export const autoCreateOperatorAccounts = async (app: INestApplication) => {
  const { operatorsRepo } = await getRepos(app);

  const usersService = app.get<UsersService>(UsersService);
  const operatorsService = app.get<OperatorsService>(OperatorsService);

  let operators = await operatorsRepo.getOperators('644e8d8be3d3eeff3c2bffcd');

  operators = operators.filter((op) => op.slug === 'corfu-travel-guide-test');

  for (const operator of operators.map((op) => op.toObject())) {
    if (!operator.owner) {
      await usersService.registerUser({
        givenName: operator.name,
        email: operator.email,
        password: DEFAULT_OPERATOR_PASSWORD,
      });

      const owner = await usersService.getUserByEmail(operator.email);
      await operatorsService.updateOperator(operator._id, { owner });

      console.log('Finished', operator.name);
    }
  }
};
