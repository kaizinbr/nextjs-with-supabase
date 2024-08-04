// import Header from "@/components/Header/Header";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SubmitButton } from "@/components/core/SubmitBtn";
import BackBtn from "@/components/core/BackBtn";

export default async function ResetPassword({
    searchParams,
}: {
    searchParams: { message: string; code: string, error: string };
}) {
    const supabase = createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // if (session) {
    //     return redirect("/");
    // }

    const resetPassword = async (formData: FormData) => {
        "use server";

        const password = formData.get("password") as string;
        const supabase = createClient();

        if (searchParams.code) {
            const supabase = createClient();
            const { error } = await supabase.auth.exchangeCodeForSession(
                searchParams.code,
            );

            if (error) {
                return redirect(
                    `/reset/password/update?message=Unable to reset Password. Link expired!`,
                );
            }
        }

        const { error } = await supabase.auth.updateUser({
            password,
        });

        if (error) {
            if (error.code === "same_password") {
                return redirect(
                    `/reset/password/update?message=Sua senha não pode ser a mesma!`,
                );
            }


            console.log(error);
            return redirect(
                `/reset/password/update?message=Unable to reset Password. Try again!`,
            );
        }

        redirect(
            `/`,
        );
    };

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
                    autoComplete="off"
                    action={resetPassword}
                >
                    
                    <legend className={`text-xl font-bold text-center mb-8`}>
                        Atualize sua senha
                    </legend>
                    <label className="text-md" htmlFor="password">
                        Nova senha
                    </label>
                    <input
                        className="rounded-xl px-4 py-2 bg-inherit border-2 border-fantasy-950/30 focus:border-fantasy-950/50 transition-all duration-300 outline-none mb-6"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        autoComplete="off"
                    />
                    <label className="text-md" htmlFor="password">
                        Confirme sua nova senha
                    </label>
                    <input
                        className="rounded-xl px-4 py-2 bg-inherit border-2 border-fantasy-950/30 focus:border-fantasy-950/50 transition-all duration-300 outline-none mb-6"
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        autoComplete="off"
                        required
                    />
                    <SubmitButton
                        formAction={resetPassword}
                        className="bg-sandybrown-400 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                        pendingText="Logando..."
                    >
                        Salvar
                    </SubmitButton>

                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                    {searchParams?.error && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            Parece que o seu link não é válido. Tente novamente.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
