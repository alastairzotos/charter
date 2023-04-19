import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OperatorDto, OperatorNoId } from 'dtos';

import { OperatorsRepository } from 'features/operators/operators.repository';
import { QRCodeService } from 'features/qr-code/qr-code.service';
import { ServicesService } from 'features/services/services.service';
import { TemplatesService } from 'features/templates/templates.service';
import { UsersService } from 'features/users/users.service';
import { EmailService } from 'integrations/email/email.service';

@Injectable()
export class OperatorsService {
  constructor(
    @Inject(forwardRef(() => ServicesService))
    private readonly servicesService: ServicesService,
    private readonly operatorsRepo: OperatorsRepository,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly templatesService: TemplatesService,
    private readonly qrCodeService: QRCodeService,
  ) {}

  async getOperators() {
    return await this.operatorsRepo.getOperators();
  }

  async getOperatorById(id: string) {
    return await this.operatorsRepo.getOperatorById(id);
  }

  async getOperatorByOwnerId(id: string) {
    return await this.operatorsRepo.getOperatorByOwnerId(id);
  }

  async getOperatorByEmail(email: string) {
    return await this.operatorsRepo.getOperatorByEmail(email);
  }

  async getOperatorWithServicesById(id: string) {
    const operator = await this.getOperatorById(id);
    const services = await this.servicesService.getServicesForOperator(id);

    return {
      operator,
      services,
    };
  }

  async createOperator(operator: OperatorNoId) {
    const createdOperator = await this.operatorsRepo.createOperator(operator);

    if (!!operator.owner) {
      if (await this.usersService.promoteBasicUserToOperator(operator.owner._id)) {
        await this.emailOperatorAfterPromotion(operator as OperatorDto)
      }
    }

    return createdOperator;
  }

  async updateOperator(id: string, newOperator: Partial<OperatorDto>) {
    await this.operatorsRepo.updateOperator(id, newOperator);

    if (!!newOperator.owner) {
      if (await this.usersService.promoteBasicUserToOperator(newOperator.owner._id)) {
        await this.emailOperatorAfterPromotion(newOperator as OperatorDto);
      }
    }
  }

  async emailOperatorAfterPromotion(operator: OperatorDto) {
    await this.qrCodeService.createQRCodeForOperatorSignup(operator);
    await this.emailService.sendEmailToOperator(operator, this.templatesService.operatorPromoted(operator));
  }

  async deleteOperator(id: string) {
    await this.operatorsRepo.deleteOperator(id);
  }

  async searchOperators(term: string) {
    return await this.operatorsRepo.searchOperators(term);
  }

  async setOperatorNotificationToken(id: string, token: string | undefined) {
    await this.operatorsRepo.setOperatorNotificationToken(id, token);
  }

  async getOperatorNotificationToken(id: string) {
    return await this.operatorsRepo.getOperatorNotificationToken(id);
  }
}
