export interface IAPIServerResponse<T = any> {
  performance: number,
  success: boolean,
  message?: any,
  data: T
}
