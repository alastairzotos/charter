export interface ConfigurationDto {
  socialLogin: boolean;
}

export const defaultConfiguration: ConfigurationDto = {
  socialLogin: false,
};
