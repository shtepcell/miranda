import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, lowercase: true, required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  // TODO: Department Schema
  @Prop()
  department: string;

  @Prop({ required: true })
  status: 'active' | 'deleted';

  @Prop()
  lastVisit: Date;

  @Prop()
  firstVisit: Date;

  @Prop({ required: true })
  created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
