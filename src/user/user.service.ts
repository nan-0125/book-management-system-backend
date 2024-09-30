import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UserService {
  
  @Inject(DbService)
  dbService: DbService<User>

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();
    const existUser = users.find(item => item.username === registerUserDto.username);

    if(existUser) {
      throw new BadRequestException('该用户已经注册');
    }

    const user = new User(registerUserDto.username, registerUserDto.password);
    users.push(user);
    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const existUser = users.find(item => item.username === loginUserDto.username);

    if(!existUser) {
      throw new BadRequestException('用户不存在!')
    }

    if(existUser.password !== loginUserDto.password) {
      throw new BadRequestException('密码错误!')
    }

    return existUser;
  }
}
