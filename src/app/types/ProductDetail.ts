type Ratios = {
  marketRatio: number;
  auctionRatio: number;
}

type Schedule = {
  years: { [key: string]: Ratios };
  defaultMarketRatio: number;
  defaultAuctionRatio: number;
}

type SaleDetails = {
  cost: number;
  retailSaleCount: number;
  auctionSaleCount: number;
}

type Classification = {
  category: string;
  subcategory: string;
  make: string;
  model: string;
}

export type ProductDetail = {
  schedule: Schedule;
  saleDetails: SaleDetails;
  classification: Classification;
}
