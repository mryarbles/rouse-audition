import { Injectable } from '@angular/core';

import DataService from './data.service';
import { ProductDetail } from 'src/app/types/ProductDetail';
import { SelectOption } from 'src/app/types/SelectOption';

export type ValuationResponse = {
  success?: boolean;
  error?: string;
  marketValue: number;
  auctionValue: number;
}

// This is just a mock http service to simulate the data fetching from a server.
@Injectable({
  providedIn: 'root'
})
export default class FormControlService {

  constructor(private ds: DataService) {}

  async getModelIdOptions(): Promise<SelectOption[]> {
    const products = await this.ds.getProducts();
    const result = Object.keys(products).map((key: string) => {
      const product = products[key];
      return {
        label: `${ product.classification.make } ${ product.classification.model }`,
        value: key
      };
    });
    return result;
  }

  async getYearOptions(modelId: string): Promise<SelectOption[]> {
    const products = await this.ds.getProducts();
    const product = products[modelId];
    const result = Object.keys(product.schedule.years).map((year: string) => (
      {
        label: year,
        value: year
      }
    ));

    // TODO: This other functionality may not be needed, but it's implied by the defaultRatio values in the api response.
    result.push({label: 'Other', value: 'other'});
    return result;
  }

  /*
MarketValue = {cost} * {marketRatio}
AuctionValue = {cost} * {auctionRatio}
 */
  async getValues(modelId: string, year: string): Promise<ValuationResponse> {
    console.log('form-controls.service.getValues  modelId', modelId, 'year', year);
    const products = await this.ds.getProducts();
    const product = products[modelId];

    if (!modelId || !year) {
      throw new Error('modelId and year are required');
    }

    // TODO: Maybe we should throw here instead of returning an object with success: false
    if (!product) {
      return {
        success: false,
        error: 'product not found',
        marketValue: 0,
        auctionValue: 0
      }
    }
    const marketRatio = product.schedule.years[year]?.marketRatio || product.schedule.defaultMarketRatio
    const marketValue = product.saleDetails.cost * marketRatio;
    const auctionRatio = product.schedule.years[year]?.auctionRatio || product.schedule.defaultAuctionRatio
    const auctionValue: number = product.saleDetails.cost * auctionRatio;
    return {
      success: true,
      marketValue,
      auctionValue
    }
  }

}
