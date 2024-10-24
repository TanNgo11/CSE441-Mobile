export interface ProductResponseType {
  id: number;
  modifiedDate: string;
  modifiedBy: string;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  quantity: number;
  image: string;
  slug: string;
  ratings: number;
  productStatus: string;
  category: CategoryResponseType;
}

export interface CategoryResponseType {
  id: number;
  createdDate: any;
  modifiedDate: string;
  createdBy: any;
  modifiedBy: string;
  name: string;
  description: string;
  status: string;
}
