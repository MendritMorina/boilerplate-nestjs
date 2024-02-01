import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity('image')
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id?: string;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column()
  filename: string;

  @Column()
  size: number;
}
