import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/");
    };

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            console.log(error)
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect(
            "/login?message=Check email to continue sign in process",
        );
    };

    return (
        <div className="flex w-full min-h-lvh justify-center items-center">
            <div className=" flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
                <Link
                    href="/"
                    className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>{" "}
                    Back
                </Link>
                <form
                    className={`
                        flex-1 flex flex-col w-full justify-center gap-2 
                        text-foreground 
                        p-8
                        border border-woodsmoke-200 rounded-3xl overflow-hidden
                    `}
                >
                    <legend className={`text-xl font-bold text-center mb-8`}>Faça login ou cadastre-se</legend>

                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-lg px-4 py-2 bg-inherit border border-woodsmoke-200 focus:border-woodsmoke-500 transition-all duration-300 outline-none mb-6"
                        name="email"
                        placeholder="luiZinho@example.com"
                        required
                    />
                    <label className="text-md" htmlFor="password">
                        Senha
                    </label>
                    <input
                        className="rounded-lg px-4 py-2 bg-inherit border border-woodsmoke-200 focus:border-woodsmoke-500 transition-all duration-300 outline-none mb-6"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                    <SubmitButton
                        formAction={signIn}
                        className="bg-woodsmoke-400 rounded-lg px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                        pendingText="Logando..."
                    >
                        Login
                    </SubmitButton>
                    <SubmitButton
                        formAction={signUp}
                        className="border border-woodsmoke-600 rounded-lg px-4 py-2 text-foreground font-bold mb-2"
                        pendingText="Cadastrando..."
                    >
                        Cadastrar
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
