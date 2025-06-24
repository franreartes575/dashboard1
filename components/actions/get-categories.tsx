import { Category } from "@/types";


const getCategories = async (storeId: string): Promise<Category[]> => {
    try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/categories`;
        console.log("GET Categories desde:", URL);

        const res = await fetch(URL);
        
        // Verifica si la respuesta es exitosa (200-299)
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        // Verifica si la respuesta tiene el tipo de contenido JSON antes de intentar parsearla
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await res.json();
        } else {
            throw new Error("La respuesta no es JSON.");
        }
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};

export default getCategories;
