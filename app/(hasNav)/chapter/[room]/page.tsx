import RoomMain from "@/components/room/RoomMain";
import { createClient } from "@/utils/supabase/server";
import DetailsHeader from "@/components/core/header/DetailsHeader";

import Image from "next/image";
import Link from "next/link";
import { formatTimeAsDate, formatTimeAsTime } from "@/lib/utils/time";

export default async function Page({ params }: { params: { room: string } }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("room", params.room)
        .eq("public", true)
        .single();
    // console.log(error, "aaaaaaa");

    if (error) {
        console.error(error);
    }

    const criado = formatTimeAsDate(new Date(data?.created_at));
    const atualizadoAs = formatTimeAsTime(new Date(data?.updated_at));

    const json = data?.content;
    // console.log(formatTimeAsTime(new Date(data?.created_at)));

    return (
        <>
            <DetailsHeader
                content="Details"
                chapterTitle={data?.title}
                username={data?.author_username}
                isPost={true}
            />
            {error ? (
                <div className="w-full h-dvh flex justify-center items-center">
                    <span className="">
                        Parece que esse post não está mais disponível.
                    </span>
                </div>
            ) : (
                <>
                    <div className="w-full mt-24 lg:mt-32">
                        <div className="px-4 mb-4 mx-auto w-full max-w-2xl sm:px-0">
                            <span className="text-sm text-woodsmoke-500">
                                {criado} | Atualizado em {atualizadoAs}
                            </span>
                        </div>
                        <RoomMain json={json} />
                    </div>
                    <div className="flex justify-center mx-auto w-full my-16">
                        <Link
                            href={`/profile/${data?.author_username}`}
                            className="w-full max-w-56 border border-woodsmoke-200 rounded-3xl flex flex-col items-center p-4"
                        >
                            <span className=" font-bold  text-center">
                                Publicado por:
                            </span>
                            <picture className="rounded-full overflow-hidden size-24 relative my-4">
                                <Image
                                    src="/static/images/default-profile.webp"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="avatar"
                                    className=""
                                />
                            </picture>
                            <h2 className="text-xl font-bold text-center PFRegalTextPro">
                                @{data?.author_username}
                            </h2>
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}
