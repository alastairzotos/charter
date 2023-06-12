import { Test } from '@nestjs/testing';
import {
  BookingNoId,
  defaultOpeningTimes,
  OperatorDto,
  ServiceDto,
  ServiceSchemaCategoryDto,
  ServiceSchemaDto,
} from 'dtos';

import { EnvService } from 'environment/environment.service';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { BookingsService } from 'features/bookings/bookings.service';
import { BroadcastService } from 'features/broadcast/broadcast.service';
import { OperatorsService } from 'features/operators/operators.service';
import { PaymentsService } from 'features/payments/payments.service';
import { QRCodeService } from 'features/qr-code/qr-code.service';
import { ServicesService } from 'features/services/services.service';
import { TemplatesService } from 'features/templates/templates.service';
import { UsersService } from 'features/users/users.service';
import { EmailService } from 'integrations/email/email.service';
import { NotificationsService } from 'integrations/notifications/notifications.service';
import { ExtractInterface } from 'utils';

const mockOperator: OperatorDto = {
  _id: '123',
  address: '',
  description: '',
  email: '',
  name: '',
  slug: '',
  phoneNumber: '',
  photo: '',
  openingTimes: defaultOpeningTimes,
};

const mockServiceSchemaCategory: ServiceSchemaCategoryDto = {
  _id: '',
  name: 'Trip',
  pluralName: 'Trips',
  description: '',
  photo: '',
  hidden: false,
};

const mockServiceSchema: ServiceSchemaDto = {
  _id: '',
  schemaCategory: mockServiceSchemaCategory,
  name: 'Boat trip',
  defaultBookingFields: ['date'],
  pricingStrategy: 'perAdultAndChild',
  shouldPayNow: true,
  fields: [],
  contentSections: [],
  additionalBookingFields: [],
};

const mockService: ServiceDto = {
  _id: '',
  price: {},
  description: '',
  content: {},
  name: '',
  slug: '',
  operator: mockOperator,
  serviceSchema: mockServiceSchema,
  photos: [],
  minPeople: null,
  maxPeople: null,
  data: { fields: [] },
  numberOfBookings: 0,
  hidden: false,
  approveBookingBeforePayment: false,
  openingTimes: defaultOpeningTimes,
};

const mockBooking: BookingNoId = {
  name: 'Joe Bloggs',
  email: 'foo@bar.com',
  phoneNumber: '1234567890',
  priceDetails: {},
  date: '12 January 2023',
  bookingDate: new Date(),
  time: '09:00',
  numberOfPeople: 0,
  status: 'confirmed',
  operator: mockOperator,
  service: mockService,
  paymentStatus: 'pending',
  paymentIntentId: 'paymentintent',
  setupIntentId: 'setupintent',
  fulfilled: false,
};

const envServiceMock: ExtractInterface<EnvService> = {
  get: jest.fn(() => ({
    nodeEnv: '',
    managerUrl: '',
    server: '',
    appName: '',
    frontendUrl: 'foo.com',
    dbConnectionString: '',
    jwtSigningKey: '',
    awsAccessKeyId: '',
    awsAccessKeySecret: '',
    awsS3BucketName: '',
    awsS3Region: '',
    awsCloudfrontDomain: '',
    sendGridApiKey: '',
    stripeApiVersion: '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    googleClientId: '',
    googleClientSecret: '',
    googleClientIdAndroid: '',
    googleClientIdIOS: '',
    fbAppId: '',
    sentryDsn: '',
    fromEmail: '',
  })),
};

const operatorsServiceMock: Partial<ExtractInterface<OperatorsService>> = {
  getOperatorNotificationToken: jest.fn(async () => 'foo'),
};

const servicesServiceMock: Partial<ExtractInterface<ServicesService>> = {
  addBookingToService: jest.fn(),
  getService: jest.fn(() => Promise.resolve(mockService as any)),
};

const templatesServiceMock: Partial<ExtractInterface<TemplatesService>> = {
  bookingMadeOperator: jest.fn(() => ({ subject: '', content: '' })),
  bookingMadeAdmin: jest.fn(() => ({ subject: '', content: '' })),
};

const qrCodeServiceMock: Partial<ExtractInterface<QRCodeService>> = {
  createQRCodeForBooking: jest.fn(),
};

const bookingsRepoMock: Partial<ExtractInterface<BookingsRepository>> = {
  createBooking: jest.fn(
    async () => new Promise((resolve) => resolve({ _id: '123' } as any)),
  ),
  getBookingByPaymentIntentId: jest.fn(
    async () =>
      new Promise((resolve) => resolve({ _id: '123', ...mockBooking } as any)),
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

const paymentsServiceMock: Partial<ExtractInterface<PaymentsService>> = {};

const broadcastServiceMock: Partial<ExtractInterface<BroadcastService>> = {
  broadcastSuccessfulBooking: jest.fn(),
};

describe('BookingService', () => {
  describe('createBooking', () => {
    let bookingsService: BookingsService;

    beforeAll(async () => {
      bookingsService = await createService(
        envServiceMock,
        operatorsServiceMock,
        servicesServiceMock,
        bookingsRepoMock,
        paymentsServiceMock,
        templatesServiceMock,
        qrCodeServiceMock,
        broadcastServiceMock,
      );
      await bookingsService.createBooking(mockBooking);

      const retrievedBooking =
        await bookingsService.getBookingByPaymentIntentId('paymentintent');
      await bookingsService.setBookingPaymentStatus(
        retrievedBooking._id,
        'succeeded',
      );
    });

    it('should create the booking', () => {
      expect(bookingsRepoMock.createBooking).toHaveBeenLastCalledWith(
        mockBooking,
      );
    });

    it('should generate a QR code', () => {
      expect(qrCodeServiceMock.createQRCodeForBooking).toHaveBeenCalled();
    });

    it('should broadcast status', () => {
      expect(
        broadcastServiceMock.broadcastSuccessfulBooking,
      ).toHaveBeenCalledTimes(1);
    });

    it('should increment the number of bookings on the service', () => {
      expect(servicesServiceMock.addBookingToService).toHaveBeenCalled();
    });
  });
});

const createService = async (
  envServiceMock: ExtractInterface<EnvService>,
  operatorsServiceMock: Partial<ExtractInterface<OperatorsService>>,
  servicesServiceMock: Partial<ExtractInterface<ServicesService>>,
  bookingsRepoMock: Partial<ExtractInterface<BookingsRepository>>,
  paymentsServiceMock: Partial<ExtractInterface<PaymentsService>>,
  templatesServiceMock: Partial<ExtractInterface<TemplatesService>>,
  qrCodeServiceMock: Partial<ExtractInterface<QRCodeService>>,
  broadcastServiceMock: Partial<ExtractInterface<BroadcastService>>,
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
        provide: ServicesService,
        useValue: servicesServiceMock,
      },
      {
        provide: BookingsRepository,
        useValue: bookingsRepoMock,
      },
      {
        provide: PaymentsService,
        useValue: paymentsServiceMock,
      },
      {
        provide: TemplatesService,
        useValue: templatesServiceMock,
      },
      {
        provide: QRCodeService,
        useValue: qrCodeServiceMock,
      },
      {
        provide: BroadcastService,
        useValue: broadcastServiceMock,
      },
    ],
  }).compile();

  return testingModule.get<BookingsService>(BookingsService);
};
