import { TransactionHost } from "@nestjs-cls/transactional";
import { TransactionalAdapterPrisma } from "@nestjs-cls/transactional-adapter-prisma";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { USER_ERROR_RESPONSE } from "./responses";

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;
  constructor(private readonly prismaHost: TransactionHost<TransactionalAdapterPrisma>) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    createUserDto.password = await hash(password, this.SALT_ROUNDS);
    const user = await this.prismaHost.tx.user.create({ data: createUserDto });
    if (!user) throw new HttpException(USER_ERROR_RESPONSE.USER_NOT_CREATED, HttpStatus.BAD_REQUEST);
    return user;
  }
}
