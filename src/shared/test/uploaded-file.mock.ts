import { readFile } from 'fs';
import { promisify } from 'util';

export class UploadedFileMock {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async createPlain(): Promise<any> {
    const fileContent = await promisify(readFile)('src/shared/test/sample.pdf');

    return {
      buffer: Buffer.from(fileContent),
      fieldname: 'file',
      mimetype: 'application/pdf',
      originalname: 'sample.pdf',
      size: 13264,
    };
  }

  static createFile(): Promise<Express.Multer.File> {
    return UploadedFileMock.createPlain();
  }
}
