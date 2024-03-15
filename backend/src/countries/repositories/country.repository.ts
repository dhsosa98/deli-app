import { injectable } from "inversify";
import Country from "../entities/country";
import dataSource from "../../common/infraestructure/database/db";


@injectable()
class CountryRepository {

    async findAll(): Promise<Country[]> {
        return await dataSource.getRepository(Country).find({
            order: {
                name: 'ASC',
            },
        });
    }

    async findById(id: number): Promise<Country> {
        return await dataSource.getRepository(Country).findOneBy({
            id,
        });
    }
}

export default CountryRepository;
