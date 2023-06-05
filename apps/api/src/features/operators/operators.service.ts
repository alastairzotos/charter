import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  LoggedInUserDetails,
  OperatorDto,
  OperatorNoId,
  UserDetails,
} from 'dtos';

import { OperatorsRepository } from 'features/operators/operators.repository';
import { QRCodeService } from 'features/qr-code/qr-code.service';
import { ServicesService } from 'features/services/services.service';
import { TemplatesService } from 'features/templates/templates.service';
import { UsersService } from 'features/users/users.service';
import { EmailService } from 'integrations/email/email.service';
import { createOperatorSlug } from 'urls';

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

  async getOperators(instance: string) {
    return await this.operatorsRepo.getOperators(instance);
  }

  async getOperatorById(id: string) {
    return await this.operatorsRepo.getOperatorById(id);
  }

  async getOperatorBySlug(slug: string, instance: string) {
    return await this.operatorsRepo.getOperatorBySlug(slug, instance);
  }

  async getOperatorByOwnerId(id: string) {
    return await this.operatorsRepo.getOperatorByOwnerId(id);
  }

  async getOperatorByEmail(email: string) {
    return await this.operatorsRepo.getOperatorByEmail(email);
  }

  async getOperatorWithServicesBySlug(slug: string, instance: string) {
    const operator = await this.getOperatorBySlug(slug, instance);
    const services = await this.servicesService.getServicesForOperator(
      operator._id,
    );

    return {
      operator,
      services,
    };
  }

  async createOperator(operator: OperatorNoId) {
    const createdOperatorId = await this.operatorsRepo.createOperator({
      ...operator,
      slug: createOperatorSlug(operator),
    });

    if (!!operator.owner) {
      if (
        await this.usersService.promoteBasicUserToOperator(operator.owner._id)
      ) {
        const createdOperator =
          await this.operatorsRepo.getOperatorByIdWithInstance(
            createdOperatorId,
          );
        await this.emailOperatorAfterPromotion(createdOperator);
      }
    }

    return createdOperatorId;
  }

  async updateOperator(id: string, newOperator: Partial<OperatorDto>) {
    await this.operatorsRepo.updateOperator(id, {
      ...newOperator,
      slug: createOperatorSlug(newOperator),
    });

    if (!!newOperator.owner) {
      if (
        await this.usersService.promoteBasicUserToOperator(
          newOperator.owner._id,
        )
      ) {
        const updatedOperator =
          await this.operatorsRepo.getOperatorByIdWithInstance(id);
        await this.emailOperatorAfterPromotion(updatedOperator);
      }
    }
  }

  async emailOperatorAfterPromotion(operator: OperatorDto) {
    await this.emailService.sendEmailToOperator(
      operator,
      this.templatesService.operatorPromoted(operator),
    );
  }

  async deleteOperator(id: string) {
    await this.servicesService.deleteServicesForOperator(id);
    await this.operatorsRepo.deleteOperator(id);
  }

  async searchOperators(term: string, instance: string) {
    return await this.operatorsRepo.searchOperators(term, instance);
  }

  async setOperatorNotificationToken(
    user: LoggedInUserDetails,
    token: string | undefined,
  ) {
    const operator = await this.operatorsRepo.getOperatorByOwnerId(user._id);
    await this.operatorsRepo.setOperatorNotificationToken(operator._id, token);
  }

  async revokeNotificationToken(operatorId: string) {
    await this.operatorsRepo.setOperatorNotificationToken(
      operatorId,
      undefined,
    );
  }

  async getOperatorNotificationToken(id: string) {
    return await this.operatorsRepo.getOperatorNotificationToken(id);
  }
}
