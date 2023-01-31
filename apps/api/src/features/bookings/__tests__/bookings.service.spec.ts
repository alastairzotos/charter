import { Test } from "@nestjs/testing"
import { BookingNoId, OperatorDto, TripDto } from "dtos"
import { EnvService } from "../../../environment/environment.service"
import { EmailService } from "../../../integrations/email/email.service"
import { OperatorsService } from "../../operators/operators.service"
import { BookingsRepository } from "../bookings.repository"
import { BookingsService } from "../bookings.service"

const mockOperator: OperatorDto = {
  _id: '123',
  address: '',
  description: '',
  email: '',
  name: '',
  phoneNumber: '',
  photo: '',
}

const mockTrip: TripDto = {
  _id: '',
  adultPrice: 10,
  childPrice: 5,
  description: '',
  duration: '',
  name: '',
  operator: mockOperator,
  photos: [],
  startLocation: '',
  startTime: ''
}

const mockBooking: BookingNoId = {
  name: 'Joe Bloggs',
  email: 'foo@bar.com',
  adultGuests: 1,
  childGuests: 2,
  date: '12 January 2023',
  status: 'confirmed',
  operator: mockOperator,
  trip: mockTrip,
}

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
  }))
}

const operatorsServiceMock: Partial<Pick<OperatorsService, keyof OperatorsService>> = {}

const emailServiceMock: Partial<Pick<EmailService, keyof EmailService>> = {
  sendEmail: jest.fn(async (to, emailData) => { })
}

const bookingsRepoMock: Partial<Pick<BookingsRepository, keyof BookingsRepository>> = {
  createBooking: jest.fn(async () => new Promise(resolve => resolve({ _id: '123' } as any))),
  getBookingWithOperatorAndTrip: jest.fn(async () => new Promise(resolve => resolve({
    _id: '123',
    ...mockBooking,
  } as any)))
}

describe('BookingService', () => {
  describe('createBooking', () => {
    let bookingsService: BookingsService;

    beforeAll(async () => {
      bookingsService = await createService(envServiceMock, operatorsServiceMock, emailServiceMock, bookingsRepoMock);
      await bookingsService.createBooking(mockBooking);
    })

    it('should create the booking', () => {
      expect(bookingsRepoMock.createBooking).toHaveBeenLastCalledWith(mockBooking);
    })

    it('should send emails', () => {
      expect(emailServiceMock.sendEmail).toHaveBeenCalledTimes(2)
    })
  })
})

const createService = async (
  envServiceMock: Pick<EnvService, keyof EnvService>,
  operatorsServiceMock: Partial<Pick<OperatorsService, keyof OperatorsService>>,
  emailServiceMock: Partial<Pick<EmailService, keyof EmailService>>,
  bookingsRepoMock: Partial<Pick<BookingsRepository, keyof BookingsRepository>>
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
    ]
  }).compile();

  return testingModule.get<BookingsService>(BookingsService);
}