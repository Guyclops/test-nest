import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCatDto } from './create-cat.dto';
import { Roles } from './packages/decorators/roles.decorator';
import { CustomParseIntPipe } from './packages/pipes/parse-int.pipe';
import { CustomParseMinPipe } from './packages/pipes/parse-min.pipe';
import { CustomParseTypesPipe } from './packages/pipes/parse-types.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      a: 1,
      b: 2,
    };
  }

  @Get('/test/:id')
  getTest(
    @Param('id', new CustomParseTypesPipe(['abc'])) id: number,
    @Query('page', new DefaultValuePipe(10), CustomParseIntPipe, new CustomParseMinPipe(10)) page: number,
  ): string {
    console.log(page);
    // throw new BadRequestException({ code: -1, message: '잘못된요청' });
    return 'test';
  }

  @Post()
  @HttpCode(200)
  async create(@Body() createCatDto: CreateCatDto) {
    return 'cat';
  }

  @Get('/auth')
  @Roles('admin')
  getAuth(): string {
    return 'auth';
  }

  @Get('/timeout')
  timeout() {}
}
