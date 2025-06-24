"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Definimos las props que ahora incluyen storeId
interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    storeId: string;
}

export function MainNav({
    className,
    storeId, // Recibimos storeId desde las props
    ...props
}: MainNavProps){  
    const pathname = usePathname();
    // Ya no necesitamos useParams()

    const routes = [
       {
          href : `/${storeId}`,
          label:'Vista Previa',
          active: pathname === `/${storeId}`,
        },
        {
          href : `/${storeId}/billboards`,
          label:'Carteles',
          active: pathname === `/${storeId}/billboards`,
        },
        {
          href : `/${storeId}/categories`,
          label:'Categorias',
          active: pathname === `/${storeId}/categories`,
        },
        {
          href : `/${storeId}/sizes`,
          label:'Talles',
          active: pathname === `/${storeId}/sizes`,
        },
        {
          href : `/${storeId}/colors`,
          label:'Colores',
          active: pathname === `/${storeId}/colors`,
        },
        {
          href : `/${storeId}/products`,
          label:'Productos',
          active: pathname === `/${storeId}/products`,
        },
        // Aquí puedes agregar la ruta de transacciones que te sugerí antes
        {
          href : `/${storeId}/transactions`,
          label:'Transacciones',
          active: pathname === `/${storeId}/transactions`,
        },
        {
          href : `/${storeId}/settings`,
          label:'Configuracion',
          active: pathname === `/${storeId}/settings`,
        },
    ];

    return(
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
          {routes.map((route) =>(
            <Link 
              key={route.href} 
              href={route.href} 
              className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white":"text-muted-foreground")}
            >
              {route.label}
            </Link>
          ))}
        </nav>
    )
};