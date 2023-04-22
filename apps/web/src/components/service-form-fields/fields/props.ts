import { ServiceSchemaFieldDto } from "dtos";

import { ServiceFieldsProps } from "components/service-form-fields/props";

export interface ServiceFieldProps extends ServiceFieldsProps {
  field: ServiceSchemaFieldDto;
  fullField: string;
}
