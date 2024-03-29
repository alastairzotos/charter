import * as qrcode from 'qrcode';
import { Injectable } from '@nestjs/common';
import { EnvService } from 'environment/environment.service';
import { S3Service } from 'integrations/s3/s3.service';
import { BookingDto } from 'dtos';
import { urls } from 'urls';
import { getQrCodeFilePathForBooking } from 'utils';

@Injectable()
export class QRCodeService {
  constructor(
    private readonly env: EnvService,
    private readonly s3Service: S3Service,
  ) {}

  async createQRCodeForBooking(booking: BookingDto) {
    const url = `${this.env.get().managerUrl}${urls.operators.booking(
      booking._id,
    )}`;

    await this.s3Service.store(
      getQrCodeFilePathForBooking(booking),
      await qrcode.toBuffer(url),
    );
  }

  getUrlForBookingQRCode(booking: BookingDto) {
    return `${this.env.get().awsCloudfrontDomain}${getQrCodeFilePathForBooking(
      booking,
    )}`;
  }
}
