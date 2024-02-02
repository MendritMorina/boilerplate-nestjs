import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity('images')
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id?: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  mimeType: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  size: number;
}
