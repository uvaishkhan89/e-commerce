import { IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    price: string

    @IsString()
    category: string;

    @IsString()
    company: string;

    @IsString()
    userId: string;
}
