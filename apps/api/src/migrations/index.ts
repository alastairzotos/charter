import { INestApplication } from "@nestjs/common";
import { ServiceSchemaRepository } from "features/service-schemas/service-schema.repository";
import { ServicesRepository } from "features/services/services.repository";

export const migrateToServiceSchemas = async (app: INestApplication) => {
  const schemaRepo = await app.get<ServiceSchemaRepository>(ServiceSchemaRepository);
  const schemas = await schemaRepo.getServiceSchemas();

  const repo = await app.get<ServicesRepository>(ServicesRepository);
  const services = await repo.getServices() as any[];

  for (const svc of services) {
    const foundSchema = schemas.find(schema => (schema as any).label.toLocaleLowerCase().replace(/\s+/g, '-') === svc.type as string);

    if (foundSchema) {
      console.log(`Matched ${svc.name} to schema ${(foundSchema as any).label}. Updating...`);

      await repo.updateService(svc._id, {
        serviceSchema: foundSchema._id as any
      });
    } else {
      console.log(`Schema not found for ${svc.name}`);
    }
  }
}

export const migrateServiceFields = async (app: INestApplication) => {
  const schemaRepo = await app.get<ServiceSchemaRepository>(ServiceSchemaRepository);
  const schemas = await schemaRepo.getServiceSchemas();

  const serviceRepo = await app.get<ServicesRepository>(ServicesRepository);

  for (const schema of schemas) {
    const services = await serviceRepo.getServicesBySchema(schema._id.toString());

    if (schema.fields.length > 0) {
      console.log('For schema:', schema.name);
      console.log(schema.fields);

      for (const svc of services.map(svc => svc.toObject())) {
        console.log('Updating:', svc.name);

        const newData = schema.fields.reduce((acc, cur: any) => ({
          ...acc,
          [cur.label]: svc.data[cur.field],
        }), {});

        console.log(svc.data);
        console.log('->');
        console.log({ ...svc.data, ...newData });

        await serviceRepo.updateService(
          svc._id,
          {
            ...svc,
            data: {
              ...svc.data,
              ...newData
            }
          }
        )
      }
    }
  }
}
