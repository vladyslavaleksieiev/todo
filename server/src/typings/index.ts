export interface IServerError {
  status: number;
  message: string;
}

export interface IQueryOptions {
  limit?: number;
  offset?: number;
}
