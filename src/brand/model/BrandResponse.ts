import Brand from './Brand';
import { AxiosResponse } from 'axios';

interface BrandResponse extends AxiosResponse {
  data: Brand;
}

export default BrandResponse;
