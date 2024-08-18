import PastRelativeTime from "@/components/core/PastRelativeTime";
import Avatar from "@/components/posts/AvatarDisplay";

export default function CoreComment({ comment }: { comment: any }) {
    return (
        <div
            className={`
                                    w-full flex flex-row gap-2
                                `}
        >
            <picture className="rounded-full overflow-hidden size-11 relative mb-2">
                <div className="flex relative flex-col justify-center items-center size-11 rounded-full ">
                    <Avatar
                        size={44}
                        url={comment?.profiles.avatar_url}
                        username={comment?.profiles.username}
                        intrisicSize={"size-11"}
                    />
                </div>
            </picture>
            <div className="flex flex-col text-sm w-10/12">
                <div className="flex flex-row items-center gap-1">
                    <h2 className=" font-bold">
                        {comment?.profiles.full_name}{" "}
                        <span className="text-xs font-400 PFRegalTextPro text-woodsmoke-500">
                            @{comment?.profiles.username}
                        </span>
                    </h2>

                    <p className="text-xs text-woodsmoke-500">
                        |{" "}
                        <span className="">
                            <PastRelativeTime
                                date={new Date(comment?.updated_at)}
                            />
                        </span>
                    </p>
                </div>
                <p className="">{comment?.content}</p>
            </div>
        </div>
    );
}
