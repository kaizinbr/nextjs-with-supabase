"use client";

import Icon from "@/components/core/Icon";
// import useHistory from "@/hooks/history";
// import useTitle from "@/hooks/title";
import { usePathname, useRouter } from "next/navigation";
import useScrollDirection from "@/hooks/useScrollDirection";

export default function DetailsHeader({
    content,
    username,
    chapterTitle,
    isPost
}: {
    content?: string;
    username?: string;
    chapterTitle?: string;
    isPost?: boolean;
}) {
    const pathname = usePathname();
    const router = useRouter();
    
    const scrollDirection = useScrollDirection();

    function handleBackClick() {
        router.back();
    }

    let title: string;
    switch (pathname) {
        case "/videos":
            title = "Videos";
            break;
        case "/musics":
            title = "Musics";
            break;
        case "/photocards":
            title = "Photocards";
            break;
        case "/videos/cover":
            title = "Cover";
            break;
        case "/videos/challenge":
            title = "Challenge";
            break;
        case "/videos/live":
            title = "Live";
            break;
        case "/videos/shorts":
            title = "Shorts";
            break;
        case "/schedules":
            title = "Calendar";
            break;
        case "/talk/write":
            title = "Write";
            break;
        case "/talk/login":
            title = "Login";
            break;
        default:
            title = content || "";
    }

    return (
        <div
            className={`
            fixed left-0 top-0 z-20 h-16 w-full
            ${scrollDirection > "down" ? "top-0" : "-top-20"}
            transition-all duration-300
            lg:hidden
            border-b border-woodsmoke-50/70 bg-woodsmoke-50/70 backdrop-blur-lg py-3
        `}
        >
            <div className="absolute h-10 w-full lg:left-1/2 lg:max-w-screen-lgx lg:-translate-x-1/2">
                <div
                    onClick={handleBackClick}
                    className="jelly jelly-increased absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-8 p-3 text-gray-200 hover:bg-gray-50 hover:text-gray-400 selected:bg-gray-50 selected:text-gray-400"
                >
                    <Icon type="left" className="w-4" />
                </div>
                <div className="text-center flex flex-col">
                    {isPost ? (
                        <>
                            <h2 className=" text-base font-700 text-black mx-auto w-2/3 overflow-hidden">{chapterTitle}</h2>
                            <h3 className="text-sm -mt-1 text-woodsmoke-300">{username}</h3>
                        </>
                    ) : (
                        <h2 className=" text-xl font-700 text-black ">{content}</h2>
                    )}
                </div>
            </div>
        </div>
    );
}
