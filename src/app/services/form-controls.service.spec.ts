import { TestBed } from '@angular/core/testing';

import FormControlService from '@/services/form-controls.service';
import DataService from '@/services/data.service';

describe('services.FormControlService', () => {
  let service: FormControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormControlService);
    TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the market and action values correctly with known year', async () => {
    const modelId = '67352';
    const year = '2007';
    const result = await service.getValues(modelId, year);
    expect(result.success).toBeTruthy();
    expect(result.marketValue).toEqual(216384.71025600002);
    expect(result.auctionValue).toEqual(126089.52642);
  });

  it('should calculate the market and action values with default ratios', async () => {
    const modelId = '67352';
    const year = '2005';
    const result = await service.getValues(modelId, year);
    expect(result.success).toBeTruthy();
    expect(result.marketValue).toEqual(13625.04);
    expect(result.auctionValue).toEqual(13625.04);
  });

  it('should calculate the auction value correctly with known year', async () => {
    const modelId = '87964';
    const year = '2011';
    const result = await service.getValues(modelId, year);
    expect(result.success).toBeFalsy();
    expect(result.auctionValue).toEqual(0);
    expect(result.marketValue).toEqual(0);
  });
});
