export type ApiResponse<T> = {
  data: T | null;
  error: {
    code: number;
    message: string;
  } | null;
};
