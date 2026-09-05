export interface APIResponse<TData = unknown> {
  message: string;
  data: TData;
}

export interface PaginatedResponse<TData = unknown> {
  message: string;
  data: TData[];
  total: number;
  page: number;
  totalPages: number;
}
