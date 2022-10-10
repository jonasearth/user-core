import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IS_CNPJ = 'isCnpj';

@ValidatorConstraint({ name: IS_CNPJ, async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  // Multiply cnpj values without veryfing digits, in order by these values
  cnpjMultiplyValuesFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Multiply cnpj values with first veryfing digit, in order by these values
  cnpjMultiplyValuesSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  blackList = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
    '11111111111180',
  ];

  cnpjPattern = new RegExp('^[0-9]{14}$');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(value: string, _args: ValidationArguments): boolean {
    // Check if the value has the structure of a cnpj
    if (typeof value !== 'string') {
      return false;
    }

    if (!this.cnpjPattern.test(value)) {
      return false;
    }

    if (this.blackList.includes(value)) {
      return false;
    }

    if (!this.validateCnpj(value)) {
      return false;
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  public validateCnpj(value: string): boolean {
    const cnpjValues: number[] = [];

    [...value].forEach((char: string) => {
      cnpjValues.push(parseInt(char, 10));
    });

    // Remove last two digits
    const verifyingDigits = cnpjValues.splice(12, 2);

    cnpjValues.push(
      this.generateDigit(cnpjValues, this.cnpjMultiplyValuesFirstDigit),
    );

    cnpjValues.push(
      this.generateDigit(cnpjValues, this.cnpjMultiplyValuesSecondDigit),
    );

    const calculatedDigits = cnpjValues.splice(12, 2);

    return verifyingDigits.every(
      (digit: number, index) => digit === calculatedDigits[index],
    );
  }

  /**
   * Calculated a verifying digit.
   *
   * Multiply all cnpj values by an array of number of the same length,
   * then sum the resulting values anc calculate values % 11. After that
   * return 0 if the values is less than 2, else return 11 - value
   */
  // eslint-disable-next-line class-methods-use-this
  public generateDigit(cnpjArray: number[], values: number[]): number {
    const result: number[] = [];

    for (let i = 0; i < values.length; i += 1) {
      result.push(cnpjArray[i] * values[i]);
    }

    const sum = result.reduce((prev, current) => prev + current, 0);

    const remainder = sum % 11;

    if (remainder < 2) {
      return 0;
    }

    return 11 - remainder;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public defaultMessage(args: ValidationArguments): string {
    return `$property must be a valid CNPJ`;
  }
}

export function IsCnpj(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string): void => {
    registerDecorator({
      name: IS_CNPJ,
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCnpjConstraint,
    });
  };
}
