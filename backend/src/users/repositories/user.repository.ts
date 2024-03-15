import { inject, injectable } from "inversify";
import User from "../entitities/user";
import dataSource from "../../common/infraestructure/database/db";
import { FindOptionsWhere } from "typeorm";


@injectable()
class UserRepository {

    constructor(){}

    async save(user: User): Promise<User> {
        return await dataSource.getRepository(User).save(user);
    }

    async findAll(): Promise<User[]> {
        return await dataSource.getRepository(User).find();
    }

    async findById(id: number): Promise<User|undefined> {
        const user = await dataSource.getRepository(User).findOneBy({
            id,
        });
        return user;
    }

    async findOneBy(findOptions: FindOptionsWhere<User>): Promise<User|undefined> {
        const user = await dataSource.getRepository(User).findOneBy({
            ...findOptions,
        });
        return user;
    }
}

export default UserRepository;
