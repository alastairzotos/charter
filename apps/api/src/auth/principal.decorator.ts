import { createParamDecorator } from '@nestjs/common';

export const Principal = createParamDecorator(
  (_: string, { args }) => args[0].principal,
);
