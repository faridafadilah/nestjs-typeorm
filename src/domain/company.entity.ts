/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { AutoMap } from '@automapper/classes';
import { User } from './user.entity';

@Entity('company')
export class Company extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  companyName: string;

  @AutoMap(() => User)
  @OneToMany(() => User, (other) => other.company)
  users: User[];
}