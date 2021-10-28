import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomParseTypesPipe implements PipeTransform {
  private readonly types: any[];
  constructor(types: any[]) {
    this.types = types;
  }
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.types.includes(value)) {
      throw new BadRequestException({ code: -1, message: `${metadata.data}형식이 맞지 않습니다.` });
    } else {
      return value;
    }
  }
}
