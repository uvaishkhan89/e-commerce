import { Column } from "typeorm";
import { IsIn, Min } from 'class-validator';
import { SORT_ORDER, SORT_ORDER_LIST, STATUS } from "../constants";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationQueryDto {
  @Column({nullable: true})
  keyword:string;

  @Column({nullable: true})
  @ApiProperty()
  limit: number;

  @Column({nullable: true})
  @ApiProperty()
  page: number;

  @Column({nullable: true})
  @ApiProperty()
  sortBy: string;

  @Column({nullable: true})
  @ApiProperty()
  @IsIn(SORT_ORDER_LIST)
  sortOrder: string = SORT_ORDER['ASC'];

  @Column({nullable: true})
  isDropdown = false;
  
  @Column({nullable: true})
  status: string = STATUS['ACTIVE'];
}

