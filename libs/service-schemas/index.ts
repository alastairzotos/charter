import { ServiceSchemaDto, ServiceType } from 'dtos';

export const BoatTripSchema: ServiceSchemaDto = {
  description: 'Take a guided trip on a boat around the island',
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
  description: 'Rent boats at cheap prices to explore the seas at your leisure',
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
  description: 'Reserve a sunbed and beathe easy knowing you\'ll have one waiting for you',
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
