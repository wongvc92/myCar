export interface PageResponse<T> {
  results: T;
  pageCount: number;
  totalCount: number;
}
