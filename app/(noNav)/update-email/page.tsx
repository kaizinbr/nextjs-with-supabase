// import Header from "@/components/Header/Header";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { headers } from "next/headers";
import { SubmitButton } from "@/components/core/SubmitBtn";
import BackBtn from "@/components/core/BackBtn";

export default async function UpdateEmail({
    searchParams,
}: {
    searchParams: { message: string; code: string; error: string };
}) {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    // console.log(data)

    const updateEmail = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const supabase = createClient();
        const origin = headers().get("origin");

        const { error } = await supabase.auth.updateUser({
            email: email,
        },);

        if (error) {
            if (error.code === "email_exists") {
                return redirect(`/update-email?message=E-mail já cadastrado!`);
            }

            console.log(error);
            return redirect(
                `/update-email?message=Verifique o email e tente novamente!`,
            );
        }

        redirect(
            `/update-email?message=Acesse o link enviado para seu novo email!`,
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
                    action={updateEmail}
                >
                    <legend className={`text-xl font-bold text-center mb-8`}>
                        Insira seu novo email
                    </legend>

                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-xl px-4 py-2 bg-inherit border-2 border-fantasy-950/30 focus:border-fantasy-950/50 transition-all duration-300 outline-none mb-6"
                        name="email"
                        type="email"
                        placeholder="luiZinho@example.com"
                        required
                    />
                    <SubmitButton
                        formAction={updateEmail}
                        className="bg-sandybrown-400 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                        pendingText="Alterando..."
                    >
                        Alterar
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
