import { ServiceSchemaDto, ServiceType } from 'dtos';

export const BoatTripSchema: ServiceSchemaDto = {
  fields: [
    { 
      field: 'duration',
      type: 'timeframe',
      label: 'Duration',
    },
    {
      field: 'startLocation',
      type: 'string',
      label: 'Starting location',
    },
    {
      field: 'startTime',
      type: 'time',
      label: 'Start time',
    },
  ]
}

export const BoatRentalSchema: ServiceSchemaDto = {
  fields: [
    { 
      field: 'duration',
      type: 'timeframe',
      label: 'Duration',
    },
    {
      field: 'location',
      type: 'string',
      label: 'Location',
    },
    {
      field: 'startTime',
      type: 'time',
      label: 'Start time',
    },
  ]
}

export const SunbedSchema: ServiceSchemaDto = {
  fields: [
    {
      field: 'location',
      type: 'string',
      label: 'Location',
    },
    {
      field: 'startTime',
      type: 'time',
      label: 'Start time',
    },
  ],
}

export const getSchemaForServiceType = (serviceType: ServiceType): ServiceSchemaDto | null => ({
  'none': null,
  'boat-trip': BoatTripSchema,
  'boat-rental': BoatRentalSchema,
  'sunbed': SunbedSchema,
} as Record<ServiceType, ServiceSchemaDto | null>)[serviceType]
