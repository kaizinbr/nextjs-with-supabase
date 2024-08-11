import { PenBox, Folder } from "lucide-react";
import Link from "next/link";

export default function LoggedStart({ user }: { user: any }) {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center py-16 lg:pt-28 px-4 relative  mx-auto max-w-4xl">
            
            <div className="w-full flex flex-col gap-4 z-20">
                <h1 className="text-2xl font-bold PFRegalTextPro">
                    Olá, {user.full_name}! 👋
                </h1>
                <div className="flex flex-row gap-3">
                    <Link
                        href="/create"
                        className={`
                            border-2 border-woodsmoke-400/70 bg-woodsmoke-200/50
                            flex items-center justify-center
                            size-40 rounded-2xl
                        `}
                    >
                        <PenBox size={24} />
                        <span className="ml-2">Criar post</span>
                    </Link>
                    <Link
                        href="manage"
                        className={`
                            border-2 border-woodsmoke-400/70 
                            flex items-center justify-center
                            size-40 rounded-2xl
                        `}
                    >
                        <Folder size={24} />
                        <span className="ml-2">Seus posts</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
