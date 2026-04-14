import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@root/config/redis.config';
import { LoginDto, RegisterDto } from '@auth/dto';
import { Tokens } from './types/token.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import argon2 from 'argon2';
import ms, { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Tokens> {
    const { username, email, password } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    await this.userRepository.save(user);

    const { password: _, ...userInfo } = user;

    return await this.issueTokens(userInfo);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: Partial<User>; tokens: Tokens }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user)
      throw new BadRequestException('User with this email does not exist');

    const checkPassword = await bcrypt.compareSync(password, user.password);

    if (!checkPassword) throw new BadRequestException('Password is incorrect');

    const { password: _, ...userInfo } = user;

    const tokens = await this.issueTokens(userInfo);

    return { user: userInfo, tokens };
  }

  async logout(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException('User not found');

    this.clearTokenHashes(id);
  }

  async issueTokens(user: Partial<User>) {
    return this.generateTokens(user);
  }

  private async generateTokens(payload: Partial<User>): Promise<Tokens> {
    const { id, ...data } = payload;
    const cleanPayload = {
      id,
      sub: id,
      ...data,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(cleanPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<StringValue>('JWT_ACCESS_EXPIRE'),
      }),
      this.jwtService.signAsync(cleanPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<StringValue>('JWT_REFRESH_EXPIRE'),
      }),
    ]);

    await this.storeTokenHashes(id, { refreshToken, accessToken });

    return { accessToken, refreshToken };
  }

  async storeTokenHashes(
    id: string,
    { refreshToken, accessToken },
  ): Promise<void> {
    const accessHash = await argon2.hash(accessToken);
    const refreshHash = await argon2.hash(refreshToken);
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRE');

    const expirationInMilliseconds = ms(expiresIn as StringValue);

    if (!expirationInMilliseconds)
      throw new BadRequestException('Invalid Duration Format');

    const expirationInSeconds = Math.floor(
      Number(expirationInMilliseconds) / 1000,
    );

    await this.redisService.set(
      `auth:user:${id}:accessTokenHash`,
      accessHash,
      expirationInSeconds,
    );
    await this.redisService.set(
      `auth:user:${id}:refreshTokenHash`,
      refreshHash,
    );
  }

  async clearTokenHashes(id: string) {
    await this.redisService.del(`auth:user:${id}:accessTokenHash`);
    await this.redisService.del(`auth:user:${id}:refreshTokenHash`);
  }
}
