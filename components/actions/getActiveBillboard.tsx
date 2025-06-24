import { Billboard } from "@/types"; // Asegúrate de que tu tipo Billboard esté definido

// Creamos una variable para la URL base de tu API, usando una variable de entorno
const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

// Esta función ahora solo llama a la API, no usa Prisma.
const getActiveBillboard = async (storeId: string): Promise<Billboard | null> => {
  if (!storeId) {
    return null;
  }

  // Hacemos un fetch a la nueva ruta de API que crearemos en el siguiente paso
  // La URL será algo como: /api/tu-tienda-123/billboards
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${storeId}/billboards`);

  if (!res.ok) {
    return null;
  }
  
  return res.json();
};

export default getActiveBillboard;