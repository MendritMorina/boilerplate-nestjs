import { Column, Entity } from 'typeorm';
import { UserRoles } from '../../enum/user-roles.enum';
import { BaseEntity } from '../../base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  username?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role?: UserRoles;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column()
  refreshToken?: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
