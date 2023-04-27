import { ServiceSchemaFieldDto } from "dtos";

import { ServiceFieldsProps } from "components/screens/backend/screens/operator/screens/dashboard/screens/services/lib/service-form-fields/props";

export interface ServiceFieldProps extends ServiceFieldsProps {
  field: ServiceSchemaFieldDto;
  fullField: string;
}
