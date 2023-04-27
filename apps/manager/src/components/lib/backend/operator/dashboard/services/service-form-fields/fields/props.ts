import { ServiceSchemaFieldDto } from "dtos";

import { ServiceFieldsProps } from "components/lib/backend/operator/dashboard/services/service-form-fields/props";

export interface ServiceFieldProps extends ServiceFieldsProps {
  field: ServiceSchemaFieldDto;
  fullField: string;
}
