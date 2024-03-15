import { injectable } from "inversify";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@injectable()
@Entity({
    name: "countries",
})
class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;
}

export default Country;
