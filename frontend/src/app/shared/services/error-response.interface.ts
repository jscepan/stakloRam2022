export interface ErrorResponseI {
  error: {
    message: string;
    timestamp: Date;
  };
  status: number;
  statusText: string;
}
