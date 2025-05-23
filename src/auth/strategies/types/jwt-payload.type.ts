import { Session } from 'src/session/entities/session.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type JwtPayloadType = Pick<User, 'id'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
