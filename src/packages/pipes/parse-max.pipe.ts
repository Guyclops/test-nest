import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomParseMinPipe implements PipeTransform<number, number> {
  private readonly maxValue;
  constructor(maxValue: number) {
    this.maxValue = maxValue;
  }
  transform(value: number, metadata: ArgumentMetadata): number {
    if (value < this.maxValue) {
      throw new BadRequestException({ code: -1, message: `${metadata.data}형식이 맞지 않습니다.` });
    } else {
      return value;
    }
  }
}
