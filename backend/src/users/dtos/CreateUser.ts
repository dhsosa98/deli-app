import { IsDefined, Min } from 'class-validator';

export class CreateUserRequest {
  @IsDefined()
  username!: string;

  @IsDefined()
  email!: string;

  @IsDefined()
  fullname!: string;

  @IsDefined()
  age!: number;

  @IsDefined()
  password!: string;

  @IsDefined()
  countryId!: number;
}
