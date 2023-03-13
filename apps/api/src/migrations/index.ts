import { INestApplication } from "@nestjs/common";
import { ServiceSchemaRepository } from "features/service-schemas/service-schema.repository";
import { ServicesRepository } from "features/services/services.repository";
import { ServicesService } from "features/services/services.service";

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

export const migrateChangeFieldToKey = async (app: INestApplication) => {
  const schemaRepo = await app.get<ServiceSchemaRepository>(ServiceSchemaRepository);
  const schemas = await schemaRepo.getServiceSchemas();

  const servicesRepo = await app.get<ServicesRepository>(ServicesRepository);

  for (const schema of schemas.map(schema => schema.toObject())) {
    console.log('Schema:', schema.name);
    console.log('Fields:', schema.fields);

    const updatedFields = schema.fields.map(field => ({
      ...field,
      key: (field as any)['field']
    }));

    console.log(updatedFields);

    await schemaRepo.updateServiceSchema(schema._id, {
      ...schema,
      fields: updatedFields
    })

    const services = await servicesRepo.getServicesBySchema(schema._id);

    for (const service of services.map(service => service.toObject())) {
      console.log('Service:', service.name);
      console.log('Data:', service.data);

      if (service.data) {
        const updatedData = {
          ...service.data,
          ...updatedFields.reduce((acc, cur) => ({
            ...acc,
            [cur.key]: service.data[cur.label]
          }), {})
        }

        console.log('>>>', updatedData);
        servicesRepo.updateService(service._id, {
          ...service,
          data: updatedData
        })
      } else {
        servicesRepo.updateService(service._id, { ...service, data: {} });
      }
    }
  }
}
