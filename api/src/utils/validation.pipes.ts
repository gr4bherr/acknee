import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class PageAndLimitPipe
  implements PipeTransform<string | undefined, number | undefined>
{
  transform(value: string | undefined): number | undefined {
    if (value === null || value === undefined) {
      return undefined
    }

    const val = parseInt(value, 10)
    if (isNaN(val) || val < 1) {
      throw new BadRequestException(
        'Page must be a positive integer greater than or equal to 1'
      )
    }
    return val
  }
}

@Injectable()
export class LatitudePipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseFloat(value)
    if (isNaN(val) || val < -90 || val > 90) {
      throw new BadRequestException(
        'Latitude must be a number between -90 and 90'
      )
    }
    return val
  }
}

@Injectable()
export class LongitudePipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseFloat(value)
    if (isNaN(val) || val < -180 || val > 180) {
      throw new BadRequestException(
        'Longitude must be a number between -180 and 180'
      )
    }
    return val
  }
}
