import { Client, IErrorResponse } from "./client";
import { skateSpotApiBaseUrl } from "./constants";

export class ApiClient extends Client {
  constructor() {
    super(skateSpotApiBaseUrl);
  }
}

export type ApiResponse<T> = {
  content?: T;
  error?: IErrorResponse;
};
