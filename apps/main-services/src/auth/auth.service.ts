import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    return this.usersService.createUser(body);
  }

  async signIn(body: SignInDto) {
    const user = await this.usersService.findUserByEmail(body.email);
    if (!user) {
      throw new BadRequestException('email or password is incorrect');
    }

    const isPasswordValid = await comparePassword(body.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('email or password is incorrect');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
