"use client";

import Icon from "@/components/core/Icon";
// import useHistory from "@/hooks/history";
// import useTitle from "@/hooks/title";
import { usePathname, useRouter } from "next/navigation";
import useScrollDirection from "@/hooks/useScrollDirection";

export default function BackBtn() {
    const router = useRouter();

    const scrollDirection = useScrollDirection();

    function handleBackClick() {
        router.back();
    }

    return (
        <div
            onClick={handleBackClick}
            className=" cursor-pointer rounded-8 p-3 transition-all text-woodsmoke-300 hover:bg-woodsmoke-200 hover:text-sandybrown-500 selected:bg-gray-50 selected:text-gray-400"
        >
            <Icon type="left" className="w-4" />
        </div>
    );
}
