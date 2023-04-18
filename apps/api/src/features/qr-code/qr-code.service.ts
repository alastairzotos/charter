import * as qrcode from 'qrcode';
import { Injectable } from "@nestjs/common";
import { EnvService } from 'environment/environment.service';
import { S3Service } from 'integrations/s3/s3.service';
import { BookingDto, OperatorDto } from 'dtos';
import { urls } from 'urls';
import { getQrCodeFilePathForBooking, getQrCodeFilePathForOperatorSignup } from 'utils';

@Injectable()
export class QRCodeService {
  constructor(
    private readonly env: EnvService,
    private readonly s3Service: S3Service,
  ) {}

  async createQRCodeForBooking(booking: BookingDto) {
    const url = `${this.env.get().frontendUrl}${urls.operators.booking(booking._id)}`;

    await this.s3Service.store(
      getQrCodeFilePathForBooking(booking),
      await qrcode.toBuffer(url)
    )
  }

  getUrlForBookingQRCode(booking: BookingDto) {
    return `${this.env.get().awsCloudfrontDomain}${getQrCodeFilePathForBooking(booking)}`;
  }

  async createQRCodeForOperatorSignup(operator: OperatorDto) {
    const data = JSON.stringify({
      server: this.env.get().server,
      operator: {
        id: operator._id,
        name: operator.name,
        email: operator.email,
        owner: {
          name: operator.owner.givenName,
          email: operator.owner.email,
        }
      }
    })

    await this.s3Service.store(
      getQrCodeFilePathForOperatorSignup(operator),
      await qrcode.toBuffer(data)
    )
  }

  getUrlForOperatorSignup(operator: OperatorDto) {
    return `${this.env.get().awsCloudfrontDomain}${getQrCodeFilePathForOperatorSignup(operator)}`;
  }
}
