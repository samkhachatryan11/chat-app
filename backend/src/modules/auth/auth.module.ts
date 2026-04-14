import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from '@root/config/redis.config';
import { AuthHelper } from '@auth/helpers/auth.helper';
import * as PublicDecorator from '@common/decorators/public.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, RedisService],
})
export class AuthModule {}
