import { AxiosError } from 'axios';

export class AxiosResponseHelper {
  static async convertHeadResponseToBoolean(
    requestCall: Promise<unknown>,
  ): Promise<boolean> {
    try {
      await requestCall;
      return true;
    } catch (error) {
      
      const axiosError = error as AxiosError;
      
      if (!axiosError.isAxiosError) {
        throw error;
      }
      if (axiosError.response?.status !== 404) {
        throw error;
      }

      return false;
    }
  }
}
