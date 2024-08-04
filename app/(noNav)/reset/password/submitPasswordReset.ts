"use server"; 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


const submitPasswordReset = async (formData: FormData) => {
    
    const email = formData.get("email") as string;
    console.log(email);
    const password = formData.get("password") as string;
    const origin = headers().get('origin');

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/reset/password/update`,
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