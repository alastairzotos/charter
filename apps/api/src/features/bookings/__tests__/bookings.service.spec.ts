import { Test } from '@nestjs/testing';
import { BookingNoId, OperatorDto, ServiceDto } from 'dtos';

import { EnvService } from 'environment/environment.service';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { BookingsService } from 'features/bookings/bookings.service';
import { OperatorsService } from 'features/operators/operators.service';
import { EmailService } from 'integrations/email/email.service';

const mockOperator: OperatorDto = {
  _id: '123',
  address: '',
  description: '',
  email: '',
  name: '',
  phoneNumber: '',
  photo: '',
};

const mockService: ServiceDto = {
  _id: '',
  type: 'boat-trip',
  price: {},
  description: '',
  name: '',
  operator: mockOperator,
  photos: [],
  minPeople: null,
  maxPeople: null,
  data: { fields: [] }
};

const mockBooking: BookingNoId = {
  name: 'Joe Bloggs',
  email: 'foo@bar.com',
  priceDetails: {},
  date: '12 January 2023',
  status: 'confirmed',
  operator: mockOperator,
  service: mockService,
};

const envServiceMock: Pick<EnvService, keyof EnvService> = {
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
  })),
};

const operatorsServiceMock: Partial<
  Pick<OperatorsService, keyof OperatorsService>
> = {};

const emailServiceMock: Partial<Pick<EmailService, keyof EmailService>> = {
  sendEmail: jest.fn(async (to, emailData) => {}),
};

const bookingsRepoMock: Partial<
  Pick<BookingsRepository, keyof BookingsRepository>
> = {
  createBooking: jest.fn(
    async () => new Promise((resolve) => resolve({ _id: '123' } as any)),
  ),
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
        bookingsRepoMock,
      );
      await bookingsService.createBooking(mockBooking);
    });

    it('should create the booking', () => {
      expect(bookingsRepoMock.createBooking).toHaveBeenLastCalledWith(
        mockBooking,
      );
    });

    it('should send emails', () => {
      expect(emailServiceMock.sendEmail).toHaveBeenCalledTimes(2);
    });
  });
});

const createService = async (
  envServiceMock: Pick<EnvService, keyof EnvService>,
  operatorsServiceMock: Partial<Pick<OperatorsService, keyof OperatorsService>>,
  emailServiceMock: Partial<Pick<EmailService, keyof EmailService>>,
  bookingsRepoMock: Partial<Pick<BookingsRepository, keyof BookingsRepository>>,
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
        provide: BookingsRepository,
        useValue: bookingsRepoMock,
      },
    ],
  }).compile();

  return testingModule.get<BookingsService>(BookingsService);
};
