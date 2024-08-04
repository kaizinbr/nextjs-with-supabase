"use server"; 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const submitPasswordReset = async (formData: FormData) => {
    
    const email = formData.get("email") as string;
    console.log(email);
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset/password/update",
    });

    console.log(error);

    if (error) {
        console.log(error);
        return redirect(
            "/reset/password?message=Não conseguimos encontrar esse usuário",
        );
    }

    return redirect("/reset/password?message=Verifique seu email para continuar");
};

export default submitPasswordReset;