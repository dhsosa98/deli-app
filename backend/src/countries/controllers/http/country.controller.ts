import { inject, injectable } from "inversify";
import { Request, Response } from 'express';
import { CountryController as CountryControllerInterface } from "@/countries/controllers/country.controller.interface";
import CountryRepository from "@/countries/repositories/country.repository";
import Types from "@/common/dependency-injection/types";


@injectable()
class CountryController implements CountryControllerInterface {

    constructor(
        @inject(Types.CountryRepository) private repository: CountryRepository,
    ) {
        this.getAll = this.getAll.bind(this);
     }

    async getAll(req: Request, res: Response): Promise<void> {
        const countries = await this.repository.findAll();
        res.json({ countries });
    }
}

export default CountryController;
