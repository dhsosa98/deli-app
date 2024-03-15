import { injectable } from "inversify";
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";


@injectable()
@Entity({
    name: "users",
})
class User extends BaseEntity {
    @PrimaryColumn({
        unsigned: true,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    email: string;

    @Column()
    fullname: string;

    @Column()
    isVerified: boolean;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column({
        unsigned: true,
    })
    countryId: number;
}

export default User;
