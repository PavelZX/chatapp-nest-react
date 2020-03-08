import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Expose()
  get fullName() {
    return this.firstName + this.lastName;
  }

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(
    type => User,
    user => user.inverseFriends,
    {
      cascade: true,
    },
  )
  @JoinTable()
  friends: User[];

  @ManyToMany(
    type => User,
    user => user.friends,
    {
      cascade: true,
    },
  )
  inverseFriends: User[];
}
