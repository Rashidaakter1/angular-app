export interface IResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: any;
  };
  results: Array<{}>;
}
