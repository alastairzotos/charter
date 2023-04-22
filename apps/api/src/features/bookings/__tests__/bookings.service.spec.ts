import { Test } from '@nestjs/testing';
import { BookingNoId, defaultOpeningTimes, OperatorDto, ServiceDto, ServiceSchemaCategoryDto, ServiceSchemaDto } from 'dtos';

import { EnvService } from 'environment/environment.service';
import { BookingsRepository } from 'features/bookings/bookings.repository';
import { BookingsService } from 'features/bookings/bookings.service';
import { OperatorsService } from 'features/operators/operators.service';
import { PaymentsService } from 'features/payments/payments.service';
import { QRCodeService } from 'features/qr-code/qr-code.service';
import { ServicesService } from 'features/services/services.service';
import { TemplatesService } from 'features/templates/templates.service';
import { EmailService } from 'integrations/email/email.service';
import { NotificationsService } from 'integrations/notifications/notifications.service';
import { ExtractInterface } from 'utils';

const mockOperator: OperatorDto = {
  _id: '123',
  address: '',
  description: '',
  email: '',
  name: '',
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
}

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
}

const mockService: ServiceDto = {
  _id: '',
  price: {},
  description: '',
  content: {},
  name: '',
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
};

const envServiceMock: ExtractInterface<EnvService> = {
  get: jest.fn(() => ({
    nodeEnv: '',
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
  })),
};

const operatorsServiceMock: Partial<
  ExtractInterface<OperatorsService>
> = {
  getOperatorNotificationToken: jest.fn(async () => 'foo')
};

const servicesServiceMock: Partial<
  ExtractInterface<ServicesService>
> = {
  addBookingToService: jest.fn(),
  getService: jest.fn(() => Promise.resolve(mockService as any)),
};

const emailServiceMock: Partial<ExtractInterface<EmailService>> = {
  sendEmail: jest.fn(async () => { }),
  sendEmailToOperator: jest.fn(),
};

const templatesServiceMock: Partial<ExtractInterface<TemplatesService>> = {
  bookingMadeOperator: jest.fn(() => ({ subject: '', content: '' })),
  bookingMadeUser: jest.fn(() => ({ subject: '', content: '' })),
}

const qrCodeServiceMock: Partial<ExtractInterface<QRCodeService>> = {
  createQRCodeForBooking: jest.fn()
}

const notificationsServiceMock: Partial<ExtractInterface<NotificationsService>> = {
  notifyOperatorOfBooking: jest.fn()
}

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

const paymentsServiceMock: Partial<ExtractInterface<PaymentsService>> = {};

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
        paymentsServiceMock,
        templatesServiceMock,
        qrCodeServiceMock,
        notificationsServiceMock,
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

    it('should generate a QR code', () => {
      expect(qrCodeServiceMock.createQRCodeForBooking).toHaveBeenCalled();
    })

    it('should send emails', () => {
      expect(emailServiceMock.sendEmail).toHaveBeenCalledTimes(1);
      expect(emailServiceMock.sendEmailToOperator).toHaveBeenCalledTimes(1);
    });

    it('should send a notification to the operator', () => {
      expect(notificationsServiceMock.notifyOperatorOfBooking).toHaveBeenCalled();
    })

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
  paymentsServiceMock: Partial<ExtractInterface<PaymentsService>>,
  templatesServiceMock: Partial<ExtractInterface<TemplatesService>>,
  qrCodeServiceMock: Partial<ExtractInterface<QRCodeService>>,
  notificationsServiceMock: Partial<ExtractInterface<NotificationsService>>,
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
        provide: NotificationsService,
        useValue: notificationsServiceMock,
      }
    ],
  }).compile();

  return testingModule.get<BookingsService>(BookingsService);
};
