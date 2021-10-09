import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly usersService: UserService) {}

    @Query(() => User)
    async getUser(@Args('id') id: string, @Args('force') force?: boolean): Promise<User> {
        const rawuser = await this.usersService.getUser(id, force);
        console.log(rawuser)
        const createdAt = rawuser?.createdAt?._seconds ? new Date(rawuser.createdAt._seconds) : new Date(rawuser.createdAt)
        const user = { ...rawuser, createdAt, id }
        return user;
    }
}
