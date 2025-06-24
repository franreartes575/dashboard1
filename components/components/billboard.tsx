import { Billboard as BillboardType } from "@/types";

interface BillboardProps{
    data: BillboardType | null; // Es buena práctica indicar que data puede ser null
};

const Billboard: React.FC<BillboardProps> = ({
    data
})=>{
    // --- INICIO DE LA SOLUCIÓN ---
    // Si no hay datos (data es null o undefined), no renderices nada y termina aquí.
    if (!data) {
        return null;
    }
    // ---- FIN DE LA SOLUCIÓN ----

    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div 
              className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover" 
              style={{backgroundImage: `url(${data?.imageUrl})`}}
            >
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold text-3xl sm:text-5xl lg:text-6x sm:max-w-xl max-w-xs">
                  {data.label}
                </div>
              </div>
            </div>
        </div>
    );
}

export default Billboard;