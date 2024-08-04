import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Trash, LockKeyhole, LogOut, Mail } from "lucide-react";

export default async function Index() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single();

    // console.log(data);

    return (
        <div className="w-full mt-28 px-3 mx-auto max-w-4xl">
            <div className="flex-1 w-full flex flex-col gap-8">
                <h1 className="text-4xl font-bold">Suas configurações</h1>
                <div className="flex flex-col gap-4 border-woodsmoke-300 border-2 rounded-2xl p-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-2">
                            <span className="text-lg">
                                Nome: {data?.full_name}
                            </span>
                            <span className="text-lg">
                                Email: {user?.email}
                            </span>
                            
                            <span className="text-lg">
                                {user?.identities! && (
                                    <>
                                        Criado em:{" "}
                                        {new Date(
                                            user?.identities[0]!.created_at ?? 0,
                                        ).toLocaleDateString()}
                                    </>
                                )}
                            </span>
                        </div>
                    </div>

                    <Link
                        href="/reset/password"
                        className="flex flex-row items-center gap-2 w-fit bg-sandybrown-400 transition hover:bg-sandybrown-500 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                    >
                        <LockKeyhole size={18} />
                        <span className="text-lg">Redefinir senha</span>
                    </Link>
                    <Link
                        href="/update-email"
                        className="flex flex-row items-center gap-2 w-fit bg-sandybrown-400 transition hover:bg-sandybrown-500 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                    >
                        <Mail size={18} />
                        <span className="text-lg">Alterar email</span>
                    </Link>

                    <Link
                        href="/profile/settings/account"
                        className="flex flex-row items-center gap-2 w-fit bg-sandybrown-400 transition hover:bg-sandybrown-500 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                    >
                        <Trash size={18} />
                        <span className="text-lg">Excluir conta</span>
                    </Link>
                    <form
                        action="/auth/signout"
                        method="post"
                        className="w-fit"
                    >
                        <button
                            className="flex flex-row items-center gap-2 w-fit bg-red-500 transition hover:bg-red-600 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                            type="submit"
                        >
                            <LogOut size={18} />

                            <span className="text-lg">Sair</span>
                        </button>
                    </form>
                    {/* <Link
                        href="/profile/settings/account"
                        className="flex flex-row items-center gap-2 w-fit bg-sandybrown-400 transition hover:bg-sandybrown-500 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                    >
                        <span className="text-lg">Conta</span>
                    </Link>
                    <Link
                        href="/profile/settings/account"
                        className="flex flex-row items-center gap-2 w-fit bg-sandybrown-400 transition hover:bg-sandybrown-500 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                    >
                        <span className="text-lg">Conta</span>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}
