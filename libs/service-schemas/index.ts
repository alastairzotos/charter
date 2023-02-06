import { ServiceSchemaDto, ServiceType } from 'dtos';

export const NoneSchema: ServiceSchemaDto = {
  label: 'None',
  pluralLabel: 'None',
  description: 'None',
  pricingStrategy: 'fixed',
  fields: []
}

export const BoatTripSchema: ServiceSchemaDto = {
  label: 'Boat trip',
  pluralLabel: 'Boat trips',
  description: 'Take a guided trip on a boat around the island',
  pricingStrategy: 'perAdultAndChild',
  fields: [
    { 
      field: 'duration',
      type: 'timeframe',
      label: 'Duration',
    },
    {
      field: 'startLocation',
      type: 'string',
      label: 'Pickup point',
    },
    {
      field: 'startTime',
      type: 'time',
      label: 'Start time',
    },
  ]
}

export const BoatRentalSchema: ServiceSchemaDto = {
  label: 'Boat rental',
  pluralLabel: 'Boat rentals',
  description: 'Rent boats at cheap prices to explore the seas at your leisure',
  pricingStrategy: 'fixed',
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
  label: 'Sun bed',
  pluralLabel: 'Sun beds',
  description: 'Reserve a sun bed and breathe easy knowing you\'ll have one waiting for you',
  pricingStrategy: 'fixed',
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

export const getSchemaForServiceType = (serviceType: ServiceType): ServiceSchemaDto => ({
  'none': NoneSchema,
  'boat-trip': BoatTripSchema,
  'boat-rental': BoatRentalSchema,
  'sunbed': SunbedSchema,
} as Record<ServiceType, ServiceSchemaDto>)[serviceType]
