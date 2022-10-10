import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IS_CPF = 'isCpf';

@ValidatorConstraint({ name: IS_CPF, async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  // Multiply cpf values without veryfing digits, in order by these values
  cpfMultiplyValuesFirstDigit = [10, 9, 8, 7, 6, 5, 4, 3, 2];

  // Multiply cpf values with first veryfing digit, in order by these values
  cpfMultiplyValuesSecondDigit = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  knownFalsePositives = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  cpfPattern = new RegExp('^[0-9]{11}$');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(value: string, _args: ValidationArguments): boolean {
    if (!value) {
      return false;
    }

    if (typeof value !== 'string') {
      return false;
    }

    if (!this.cpfPattern.test(value)) {
      return false;
    }

    if (this.knownFalsePositives.includes(value)) {
      return false;
    }

    return this.validateCpf(value);
  }

  // eslint-disable-next-line class-methods-use-this
  public validateCpf(value: string): boolean {
    const cpfValues: number[] = [...value].map((char: string) =>
      parseInt(char, 10),
    );

    // Remove last two digits
    const verifyingDigits = cpfValues.splice(9, 2);

    cpfValues.push(
      this.generateDigit(cpfValues, this.cpfMultiplyValuesFirstDigit),
    );

    cpfValues.push(
      this.generateDigit(cpfValues, this.cpfMultiplyValuesSecondDigit),
    );

    const calculatedDigits = cpfValues.splice(9, 2);

    return verifyingDigits.every(
      (digit: number, index) => digit === calculatedDigits[index],
    );
  }

  /**
   * Calculated a verifying digit.
   *
   * Multiply all cpf values by an array of number of the same length,
   * then sum the resulting values and calculate values % 11. After that
   * return 0 if the values is less than 2, else return 11 - value
   */
  // eslint-disable-next-line class-methods-use-this
  public generateDigit(cpfArray: number[], values: number[]): number {
    const result: number[] = values.map((value, i) => cpfArray[i] * value);

    const sum = result.reduce((prev, current) => prev + current, 0);

    const remainder = sum % 11;

    return remainder < 2 ? 0 : 11 - remainder;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public defaultMessage(args: ValidationArguments): string {
    return `$property must be a valid CPF`;
  }
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string): void => {
    registerDecorator({
      name: IS_CPF,
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCpfConstraint,
    });
  };
}
