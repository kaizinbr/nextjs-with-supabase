import RoomMain from "@/components/room/RoomMain";
import { createClient } from "@/utils/supabase/server";
import DetailsHeader from "@/components/core/header/DetailsHeader";

export default async function Page({ params }: { params: { room: string } }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("room", params.room)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    const json = data?.content;
    console.log(data);

    return (
        <>
            <DetailsHeader
                content="Details"
                chapterTitle={data?.title}
                username={data?.author_username}
                isPost={true}
            />
            <div className="w-full">
                <RoomMain json={json} />
            </div>
            <div className="flex text-center mx-auto">
                <div className="w-1/2">aqui vao aparecer os dados de quem postou</div>
            </div>
        </>
    );
}
