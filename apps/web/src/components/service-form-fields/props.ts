import { ServiceNoId } from "dtos";

export interface ServiceFieldsProps {
  values: ServiceNoId;
  isSubmitting: boolean;
  setValues: (
    values: React.SetStateAction<ServiceNoId>,
    shouldValidate?: boolean | undefined
  ) => void;
}
