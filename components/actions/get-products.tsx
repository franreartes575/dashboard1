import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  storeId: string;
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_URL}/${query.storeId}/products`,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  // --- AÑADE ESTA LÍNEA PARA DEPURAR ---
  console.log("URL DE LA API LLAMADA:", url);

  const res = await fetch(url);

  return res.json();
};

export default getProducts;