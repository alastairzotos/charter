import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as path from 'path';

import { EnvService } from 'environment/environment.service';
import { EmailData } from 'integrations/email/email.models';

@Injectable()
export class EmailService {
  constructor(private readonly env: EnvService) {
    sgMail.setApiKey(env.get().sendGridApiKey!);
  }

  async sendEmail(to: string, { subject, content }: EmailData) {
    if (this.env.get().nodeEnv === 'development') {
      const outputPath = path.resolve(process.cwd(), 'test-emails');
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
      } else {
        fsExtra.emptyDirSync(outputPath);
      }

      fs.writeFileSync(path.resolve(outputPath, `${subject}.html`), content, 'utf-8');
    } else {
      await sgMail.send({
        from: 'alastairzotos@gmail.com',
        to,
        subject,
        html: content,
      });
    }
  }
}
