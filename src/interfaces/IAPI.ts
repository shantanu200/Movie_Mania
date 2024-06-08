import { IImageDetails, IMovie } from "./IMovie";

export interface IAPIResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IAPIImageResponse {
  backdrops: IImageDetails[];
}
