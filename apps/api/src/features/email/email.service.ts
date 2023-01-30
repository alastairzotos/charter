import { Injectable } from "@nestjs/common";
import * as sgMail from '@sendgrid/mail';
import { EmailData } from "../../content/email";
import { EnvService } from "../../environment/environment.service";

@Injectable()
export class EmailService {
  constructor(private readonly envService: EnvService) {
    sgMail.setApiKey(envService.get().sendGridApiKey!);
  }

  async sendEmail(to: string, { subject, content }: EmailData) {
    await sgMail.send({
      from: 'alastairzotos@gmail.com',
      to,
      subject,
      html: content,
    })
  }
}
