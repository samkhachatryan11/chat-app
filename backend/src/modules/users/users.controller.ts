import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseMessage } from '@root/common/decorators/response-message.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UsersService } from './users.service';

export const USER_CONTROLLER = 'api/users' as const;

export const USER_ROUTS = {
  UPDATE_AVATAR: 'update-avatar',
} as const;

@Controller(USER_CONTROLLER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(USER_ROUTS.UPDATE_AVATAR)
  @ResponseMessage('Uploaded avatar successfully')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Invalid file type'), false);
        }
        callback(null, true);
      },
    }),
  )
  async changeUserAvatar(
    @Req() req,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    await this.usersService.changeAvatar(req.user.id, file.path);
  }
}
