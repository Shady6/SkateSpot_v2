import { Client, ErrorResponse } from './client'

export class ApiClient extends Client {
  constructor() {
    super(import.meta.env.VITE_API_URL)
  }
}

export type ApiResponse<T> = {
  content?: T
  error?: Partial<ErrorResponse>
}
