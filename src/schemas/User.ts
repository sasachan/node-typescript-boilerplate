import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity('users')
class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @IsNotEmpty()
  @Column({ default: 'user' })
  role = 'user';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;


