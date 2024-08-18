import RoomMain from "@/components/room/RoomMain";
import { createClient } from "@/utils/supabase/server";
import DetailsHeader from "@/components/core/header/DetailsHeader";

import Image from "next/image";
import Link from "next/link";
import { formatTimeAsDate, formatTimeAsTime } from "@/lib/utils/time";
import PastRelativeTime from "@/components/core/PastRelativeTime";
import ShowViews from "@/components/posts/ShowViews";
import Avatar from "@/components/posts/AvatarDisplay";
import Divider from "@/components/Divider";

export default async function Page({ params }: { params: { room: string } }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("posts")
        .select(
            `*,
	        profiles!posts_author_id_fkey("*")`,
        )
        .eq("room", params.room)
        .eq("public", true)
        .single();
    // console.log(error, "aaaaaaa");

    if (error) {
        console.error(error);
    }

    const criado = formatTimeAsDate(new Date(data?.created_at));
    // const atualizadoAs = formatTimeAsTime(new Date(data?.updated_at));

    const json = data?.content;
    // console.log(data.profiles);

    return (
        <>
            <DetailsHeader
                content="Details"
                chapterTitle={data?.title}
                username={data?.profiles.full_name}
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
                        <div className="px-4 mb-4 mx-auto w-full max-w-2xl sm:px-0 flex flex-col">
                            <Link
                                href={`/profile/${data?.author_username}`}
                                className="flex flex-col mb-2 w-fit"
                            >
                                <picture className="rounded-full overflow-hidden size-16 relative mb-2">
                                    {/* <Image
                                        src={
                                            data?.profiles.avatar_url
                                                ? data?.profiles.avatar_url
                                                : `/static/images/default-profile.webp`
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        alt="avatar"
                                        className=""
                                    /> */}
                                    <div className="flex relative flex-col justify-center items-center size-16 rounded-full ">
                                        <Avatar
                                            size={66}
                                            url={data?.profiles.avatar_url}
                                            username={data?.profiles.username}
                                            intrisicSize={"size-16"}
                                        />
                                    </div>
                                </picture>
                                <h2 className="text-xl font-bold PFRegalTextPro">
                                    {data?.profiles.full_name}{" "}
                                    <span className="text-sm text-woodsmoke-500">
                                        @{data?.profiles.username}
                                    </span>
                                </h2>
                            </Link>
                            <span className="text-xs text-woodsmoke-500">
                                {criado} | Atualizado{" "}
                                <PastRelativeTime
                                    date={new Date(data?.updated_at)}
                                />
                            </span>
                            <ShowViews slug={params.room} />
                        </div>
                        {/* <div className="divider w-full border-b my-4 px-4 border-woodsmoke-200"></div> */}
                        <div className="w-full max-w-2xl px-4 lg:px-0 mx-auto">
                            <Divider />
                        </div>

                        <RoomMain json={json} />
                    </div>
                    <div className="px-4 mb-4 mx-auto w-full max-w-2xl sm:px-0 flex flex-col my-16">
                        
                    </div>
                </>
            )}
        </>
    );
}
