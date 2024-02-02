import { BaseEntity } from '../../base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Image } from '../../images/entities/image.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title?: string;

  @Column()
  description?: string;

  @Column({ type: 'int', default: 1 })
  status?: number;

  //Many to One
  @ManyToOne(() => User, (user) => user.posts)
  user?: User;

  //Many to One
  @ManyToOne(() => Image)
  thumbnail?: Image;
}
