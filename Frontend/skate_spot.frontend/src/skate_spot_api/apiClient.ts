import { Client } from "./client";
import { skateSpotApiBaseUrl } from "./constants";

export class ApiClient extends Client {
  constructor() {
    super(skateSpotApiBaseUrl);
  }
}
