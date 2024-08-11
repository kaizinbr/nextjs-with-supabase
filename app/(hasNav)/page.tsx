import { createClient } from "@/utils/supabase/server";
import CardsContainer from "@/components/posts/cardsContainer";
import LoggedStart from "@/components/feed/LoggedStart";

export default async function Index() {
    const supabase = createClient();

    const { data: notes } = await supabase
        .from("posts")
        .select()
        .eq("public", true)
        .order("updated_at", { ascending: false });


    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase.from("profiles").select().eq("id", user!.id).single()

    // console.log(profile)

    return (
        <div className="flex-1 w-full flex flex-col items-center pb-20 relative">
            <div
                className={`
                    absolute top-0 left-0 right-0 h-48
                    bg-gradient-to-b from-sandybrown-300 to-transparent
                    z-10
                `}
            ></div>
            <LoggedStart user={profile} />
            <CardsContainer posts={notes} />
        </div>
    );
}
