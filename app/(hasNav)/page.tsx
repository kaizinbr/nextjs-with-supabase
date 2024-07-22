import { createClient } from "@/utils/supabase/server";
import CardsContainer from "@/components/posts/cardsContainer";

export default async function Index() {
    const supabase = createClient();

    const { data: notes } = await supabase
        .from("posts")
        .select()
        .eq("public", true)
        .order("updated_at", { ascending: false });


    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <CardsContainer posts={notes} />
        </div>
    );
}
