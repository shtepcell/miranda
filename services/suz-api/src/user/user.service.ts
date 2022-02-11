import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.shema';
import { CreateUserDto } from './dto/create-user.dto';
import * as _ from 'lodash';

const SENSITIVE_FIELDS = ['password'];
const withoutSensitive = SENSITIVE_FIELDS.map((i) => `-${i}`).join(' ');

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const createdUser = new this.userModel({
      ...createUserDto,
      status: 'active',
      created: Date.now(),
    });

    const user = (await createdUser.save()).toObject();

    this.logger.log(`Created user ${user.login}`);

    return this.userModel.findById(user._id).select(withoutSensitive).lean();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select(withoutSensitive).lean().exec();
  }
}
