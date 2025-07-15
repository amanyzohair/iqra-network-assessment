export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}
export interface FilterPayload {
  price_min?: number;
  price_max?: number;
  title?: string;
  price?: number;
  categoryId?: number;
}
