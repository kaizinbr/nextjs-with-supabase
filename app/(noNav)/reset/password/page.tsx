

import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/core/SubmitBtn";
import { useEffect } from "react";	
import submitPasswordReset from "./submitPasswordReset";
import BackBtn from "@/components/core/BackBtn";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    // const submitPasswordReset = async (formData: FormData) => {
    //     "use server";

    //     const email = formData.get("email") as string;
    //     console.log(email);
    //     const password = formData.get("password") as string;
    //     const supabase = createClient();

    //     const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //         redirectTo: "http://localhost:3000/reset/password/update",
    //     });

    //     console.log(error);

    //     if (error) {
    //         console.log(error);
    //         return redirect(
    //             "/login?message=Não conseguimos encontrar esse usuário",
    //         );
    //     }

    //     // return redirect("/");
    // };

    
    return (
        <div className="flex w-full min-h-lvh justify-center items-center">
            <div className=" flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
                <Link
                    href="/"
                    className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                >
                    <BackBtn />
                </Link>
                <form
                    className={`
                        flex-1 flex flex-col w-full justify-center gap-2 
                        text-foreground 
                        p-8
                        border-2 border-[#cbc4c1] rounded-3xl overflow-hidden
                    `}
                >
                    <legend className={`text-xl font-bold text-center mb-8`}>
                        Confirme seu email para continuar
                    </legend>

                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-xl px-4 py-2 bg-inherit border-2 border-fantasy-950/30 focus:border-fantasy-950/50 transition-all duration-300 outline-none mb-6"
                        name="email"
                        placeholder="luiZinho@example.com"
                        required
                    />
                    <SubmitButton
                        formAction={submitPasswordReset}
                        className="bg-sandybrown-400 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                        pendingText="Enviando..."
                    >
                        Solicitar reset
                    </SubmitButton>
                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
