import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Instance = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query.instance as string;
  },
);
