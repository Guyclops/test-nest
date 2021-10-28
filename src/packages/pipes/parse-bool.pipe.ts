import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomParseBoolPipe implements PipeTransform<string, boolean> {
  transform(value: string, metadata: ArgumentMetadata): boolean {
    const types = ['true', 'false'];
    if (!types.includes(value)) {
      throw new BadRequestException({ code: -1, message: `${metadata.data}형식이 맞지 않습니다.` });
    } else {
      if (value == 'true') return true;
      else return false;
    }
  }
}
