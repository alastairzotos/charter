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
