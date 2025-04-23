import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { Injectable, Inject } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { IAuthService } from 'src/auth/auth';
import { AuthProvidersEnum } from 'src/auth/enums/auth-providers.enum';


@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    super({
      clientID: configService.get<string>('google.clientId', {
        infer: true,
      }),
      clientSecret: configService.get<string>('google.clientId', {
        infer: true,
      }),
      callbackURL: configService.get<string>('google.clientId', {
        infer: true,
      }),
      scope: ['email'],
      profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('profile', JSON.stringify(profile));
    const socialData = {
      id: profile.id,
      email: profile.emails ? profile.emails[0].value : null,
      firstName: profile.name.givenName,
      lastName: profile.name.givenName,
    };

    // Assuming you have a method to handle social login validation
    const loginResponse = await this.authService.validateSocialLogin(
      AuthProvidersEnum.facebook,
      socialData,
    );
    console.log('loginResponse', JSON.stringify(loginResponse));

    return loginResponse
  }
}
