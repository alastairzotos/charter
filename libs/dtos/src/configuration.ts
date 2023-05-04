export interface ConfigurationDto {
  googleLogin: boolean;
  facebookLogin: boolean;
}

export const defaultConfiguration: ConfigurationDto = {
  googleLogin: false,
  facebookLogin: true,
};
