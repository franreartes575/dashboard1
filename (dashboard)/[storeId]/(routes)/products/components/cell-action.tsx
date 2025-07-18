"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
    data:ProductColumn;
};


export const CellAction: React.FC<CellActionProps> = ({
    data
}) =>{
    const router = useRouter();
    const params = useParams();

    const[loading,setLoading] = useState(false);
    const[open, setOpen]= useState(false);

    const onCopy = (id:string)=>{
        navigator.clipboard.writeText(id);
        toast.success("Copiado al portapapeles.");
      };
    const onDelete = async ()=> {
        try{
          setLoading(true)
          await axios.delete(`/api/${params.storeId}/products/${data.id}`);
          router.refresh();
          toast.success("Producto eliminado.");
        } catch(error){
            toast.error("Ocurrio un error.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
    
    
    return(
        <>
        <AlertModal 
        isOpen={open}
        onClose={()=>setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir Menu</span>
                  <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actciones
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={()=> onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Copiar Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/products/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Actualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4"/>
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
};
