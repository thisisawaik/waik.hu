import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Download {
  @Field()
  name: string;

  @Field({ nullable: true })
  downloadUrl: string;

  @Field({ nullable: true })
  githubUrl: string

  @Field({nullable: true})
  imageUrl: string

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  author: string;

  @Field()
  timestamp: Date

  @Field()
  fromCache: boolean;

  @Field()
  id: string;

}
