import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  username: string;

  @Field()
  tag: string;

  @Field({ nullable: true })
  pp: string

  @Field(type => [String], {nullable: true})
  badges: string[]

  @Field()
  createdAt: Date

  @Field()
  fromCache: boolean;

  @Field()
  id: string;

}
