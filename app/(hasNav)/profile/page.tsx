import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from 'next/navigation'

export default async function Index() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { data, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", user.id);

        if (data) {
            redirect(`/profile/${data[0].username}`);
        }
    }

    // console.log(user);

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div
                className={`
                    h-lvh w-full flex justify-center items-center
                    flex-col
                    px-10
                `}
            >
                <span className="text-center mb-6">
                    Parece que você não está logado...
                </span>
                <Link
                    href="/login"
                    className="bg-primary-500 px-4 py-2 rounded-md text-woodsmoke-50 font-bold"
                >
                    Faça login ou cadastre-se!
                </Link>
            </div>
        </div>
    );
}
