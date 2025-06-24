import getActiveBillboard from "@/actions/getActiveBillboard"; // 1. Usamos la nueva acción
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

// 2. La página AHORA recibe 'params' para obtener el storeId
const HomePage = async ({ params }: { params: { storeId: string } }) => {

    // 3. Obtenemos datos dinámicamente usando el storeId de la URL
    const products = await getProducts({ 
      storeId: params.storeId, 
      isFeatured: true 
    });

    const billboard = await getActiveBillboard(params.storeId);

    return (
        <Container>
            <div className="space-y-10 pb-10">
                {/* Renderizamos el cartel solo si existe. 
                  Tu componente Billboard debe ser capaz de aceptar 'null'.
                  Si no lo hace, podemos hacer una comprobación:
                  {billboard && <Billboard data={billboard} />}
                */}
                <Billboard data={billboard} />
            
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                   <ProductList title="Productos destacados" items={products} />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;