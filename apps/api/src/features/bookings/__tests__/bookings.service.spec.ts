import { Test } from '@nestjs/testing';
import { BookingNoId, OperatorDto, ServiceDto, ServiceSchemaCategoryDto, ServiceSchemaDto } from 'dtos';

import { EnvService } from 'environment/environment.service';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { BookingsService } from 'features/bookings/bookings.service';
import { OperatorsService } from 'features/operators/operators.service';
import { ServicesService } from 'features/services/services.service';
import { EmailService } from 'integrations/email/email.service';
import { ExtractInterface } from 'utils';

const mockOperator: OperatorDto = {
  _id: '123',
  address: '',
  description: '',
  email: '',
  name: '',
  phoneNumber: '',
  photo: '',
};

const mockServiceSchemaCategory: ServiceSchemaCategoryDto = {
  _id: '',
  name: 'Trip',
  pluralName: 'Trips',
  description: '',
  photo: '',
}

const mockServiceSchema: ServiceSchemaDto = {
  _id: '',
  schemaCategory: mockServiceSchemaCategory,
  name: 'Boat trip',
  defaultBookingFields: ['date'],
  pricingStrategy: 'perAdultAndChild',
  shouldPayNow: true,
  fields: []
}

const mockService: ServiceDto = {
  _id: '',
  price: {},
  description: '',
  name: '',
  operator: mockOperator,
  serviceSchema: mockServiceSchema,
  photos: [],
  minPeople: null,
  maxPeople: null,
  data: { fields: [] },
  numberOfBookings: 0,
};

const mockBooking: BookingNoId = {
  name: 'Joe Bloggs',
  email: 'foo@bar.com',
  priceDetails: {},
  date: '12 January 2023',
  time: '09:00',
  numberOfPeople: 0,
  status: 'confirmed',
  operator: mockOperator,
  service: mockService,
  paymentIntentId: 'paymentintent'
};

const envServiceMock: ExtractInterface<EnvService> = {
  get: jest.fn(() => ({
    frontendUrl: 'foo.com',
    dbConnectionString: '',
    jwtSigningKey: '',
    awsAccessKeyId: '',
    awsAccessKeySecret: '',
    awsS3BucketName: '',
    awsS3Region: '',
    awsCloudfrontDomain: '',
    sendGridApiKey: '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
  })),
};

const operatorsServiceMock: Partial<
  ExtractInterface<OperatorsService>
> = {};

const servicesServiceMock: Partial<
  ExtractInterface<ServicesService>
> = {
  addBookingToService: jest.fn(),
  getService: jest.fn(() => Promise.resolve(mockService as any)),
};

const emailServiceMock: Partial<ExtractInterface<EmailService>> = {
  sendEmail: jest.fn(async (to, emailData) => { }),
};

const bookingsRepoMock: Partial<
  ExtractInterface<BookingsRepository>
> = {
  createBooking: jest.fn(
    async () => new Promise((resolve) => resolve({ _id: '123' } as any)),
  ),
  getBookingByPaymentIntentId: jest.fn(
    async () => new Promise(resolve => resolve({ _id: '123', ...mockBooking } as any))
  ),
  setBookingPaymentStatus: jest.fn(),
  getBookingWithOperatorAndService: jest.fn(
    async () =>
      new Promise((resolve) =>
        resolve({
          _id: '123',
          ...mockBooking,
        } as any),
      ),
  ),
};

describe('BookingService', () => {
  describe('createBooking', () => {
    let bookingsService: BookingsService;

    beforeAll(async () => {
      bookingsService = await createService(
        envServiceMock,
        operatorsServiceMock,
        emailServiceMock,
        servicesServiceMock,
        bookingsRepoMock,
      );
      await bookingsService.createBooking(mockBooking);

      const retrievedBooking = await bookingsService.getBookingByPaymentIntentId('paymentintent');
      await bookingsService.setBookingPaymentStatus(retrievedBooking._id, 'succeeded');
    });

    it('should create the booking', () => {
      expect(bookingsRepoMock.createBooking).toHaveBeenLastCalledWith(
        mockBooking,
      );
    });

    it('should send emails', () => {
      expect(emailServiceMock.sendEmail).toHaveBeenCalledTimes(2);
    });

    it('should increment the number of bookings on the service', () => {
      expect(servicesServiceMock.addBookingToService).toHaveBeenCalled();
    })
  });
});

const createService = async (
  envServiceMock: ExtractInterface<EnvService>,
  operatorsServiceMock: Partial<ExtractInterface<OperatorsService>>,
  emailServiceMock: Partial<ExtractInterface<EmailService>>,
  servicesServiceMock: Partial<ExtractInterface<ServicesService>>,
  bookingsRepoMock: Partial<ExtractInterface<BookingsRepository>>,
) => {
  const testingModule = await Test.createTestingModule({
    providers: [
      BookingsService,
      {
        provide: EnvService,
        useValue: envServiceMock,
      },
      {
        provide: OperatorsService,
        useValue: operatorsServiceMock,
      },
      {
        provide: EmailService,
        useValue: emailServiceMock,
      },
      {
        provide: ServicesService,
        useValue: servicesServiceMock,
      },
      {
        provide: BookingsRepository,
        useValue: bookingsRepoMock,
      },
    ],
  }).compile();

  return testingModule.get<BookingsService>(BookingsService);
};
