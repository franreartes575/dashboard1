"use client";

import { Color} from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/,{
        message:"Introduce un codigo hex valido"
    }),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
    initialData:Color| null;
}


export const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) =>{
    const params = useParams();
    const router = useRouter();


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Editar color" : "Crear color";
    const description = initialData ? "Edita un color" : "Agregar un nuevo color";
    const toastMessage = initialData ? "color actualizado" : "color creado";
    const action = initialData ? "Guardar cambios" : "Crear";


    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name:'',
            value:''
        }
    });

    const onSubmit = async (data: ColorFormValues)=>{
        try{
          setLoading(true);
          if(initialData){
            await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`,data);
          } else{
            await axios.post(`/api/${params.storeId}/colors`,data);
          }
          router.refresh();
          router.push(`/${params.storeId}/colors`)
          toast.success(toastMessage);
        } catch(error) {
            toast.error("Ocurrio un error.");
        } finally {
            setLoading(false);
        }

    };

    const onDelete = async ()=> {
        try{
          setLoading(true)
          await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
          router.refresh();
          router.push(`/${params.storeId}/colors`);
          toast.success("color borrado.");
        } catch(error){
            toast.error("Asegurate de eliminar todos los productos con este color primero.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
      <>  
        <AlertModal
          isOpen={open}
          onClose={()=>setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
        <div className="flex items-center justify-between">
            <Heading
            title={title}
            description={description}
            />
            {initialData && (
             <Button
                disabled={loading}
                variant="destructive"
                color="icon"
                onClick={()=>setOpen(true)} 
            >
                <Trash className="h-4 w-4"/>
             </Button>
            )}
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem> 
                            <FormLabel> Nombre </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="color name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="value"
                    render={({field}) => (
                        <FormItem> 
                            <FormLabel> Valor </FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-x-4">
                                 <Input disabled={loading} placeholder="color value" {...field} />
                                 <div className="border p-4 rounded-full" style={{ backgroundColor: field.value}}   />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
            
                </div>
                <Button disabled={loading} className="ml-auto" type="submit" >
                    {action}
                </Button>
            </form>
        </Form>
       </>
    );
};
