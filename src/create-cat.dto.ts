import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class User {
  @IsEnum(['test', 'test2'], { message: 'name에 허용된 값이 아닙니다.' })
  name: string;
  @IsString()
  locale?: string;
}

export class CreateCatDto {
  @ApiProperty({ default: '이름' })
  @IsOptional()
  name?: string;

  @IsInt({ message: 'age는 숫자여야합니다.' })
  age: number;

  @ValidateNested()
  @Type(() => User)
  master: User;
}
