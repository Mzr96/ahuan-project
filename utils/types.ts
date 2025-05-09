export interface Product {
  Id?: number;
  Title: string;
  Description: string;
  Price: number;
  Category: string;
  Image: string;
  C_OR_R: "T" | "C" | "R";
}
