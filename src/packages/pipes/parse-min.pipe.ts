import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomParseMinPipe implements PipeTransform<number, number> {
  private readonly minValue;
  constructor(minValue: number) {
    this.minValue = minValue;
  }
  transform(value: number, metadata: ArgumentMetadata): number {
    if (value < this.minValue) {
      throw new BadRequestException({ code: -1, message: `${metadata.data}형식이 맞지 않습니다.` });
    } else {
      return value;
    }
  }
}
