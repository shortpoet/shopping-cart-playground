
import { ObjectType } from 'type-graphql';
import { Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: `purchases`, schema: 'logistics' })
export class SeedingEntity {

  @PrimaryColumn()
  public id: string;

  @CreateDateColumn()
  creationDate: Date;

  constructor(id?: string) {
    this.id = id;
  }
}