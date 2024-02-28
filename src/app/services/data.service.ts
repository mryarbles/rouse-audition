import { Injectable } from '@angular/core';
import data from '../../assets/api-response.json';
import { ProductDetail } from 'src/app/types/ProductDetail';

type ApiResponse = {
  [key: string]: ProductDetail
}

// This is just a mock data service to simulate the data fetching from a server.
@Injectable({
  providedIn: 'root'
})
export default class DataService {

  private data: ApiResponse = data;

  getProducts(): Promise<ApiResponse> {
    return Promise.resolve(this.data);
  }
}
