export interface Figure {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  images: string[];
  collection: string;
  limited: boolean;
  soldOut: boolean;
}
