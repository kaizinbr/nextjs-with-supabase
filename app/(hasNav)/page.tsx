import DeployButton from "../../components/DeployButton";
import AuthButton from "../../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Image from "next/image";
import CardsContainer from "@/components/posts/cardsContainer";

export default async function Index() {
    const supabase = createClient();

    const { data: notes } = await supabase.from("posts").select();
    // console.log(notes)

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <CardsContainer posts={notes} />
        </div>
    );
}
