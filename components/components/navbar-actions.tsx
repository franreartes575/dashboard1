"use client";

import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const NavbarActions = () => {

    const [isMounted, setIsMounted] = useState(false);
    const { isSignedIn } = useUser();



    useEffect(()=>{
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if(!isMounted){
        return null;
    }

    return(
        <div className = "ml-auto flex items-center gap-x-4">
            {isSignedIn ? (
                <>
            <Button onClick={()=>router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
                <ShoppingBag size={20} color="white"/>
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
            <UserButton/>
            </>
            ):(
            <SignInButton mode="modal">
                 <Button className="bg-black text-white px-4 py-2 rounded-full">
                    Iniciar sesión
                 </Button>
            </SignInButton>
            )}
        </div>
    );
}

export default NavbarActions;