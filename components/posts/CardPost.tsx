import Image from "next/image";
import Link from "next/link";

interface Post {
    title: string;
    content: string | any;
    public: boolean;
    author_id: string;
    id: string;
    created_at: string;
    updated_at: string;
    room: string;
}

export default function CardPost({
    post,
    edit,
}: {
    post: any;
    edit?: Boolean;
}) {
    return (
        <div className="flex flex-col gap-2 border border-woodsmoke-700 rounded-3xl overflow-hidden">
            <Link href={`/${edit ? "create" : "chapter"}/${post.room}`}>
                <picture>
                    <Image
                        src="/img.jpg"
                        alt="Authentication"
                        width={500}
                        height={500}
                    />
                </picture>
                <div className="flex flex-col gap-3 p-3">
                    <span className=" text-xs text-stone-500">
                        room /{post.room}
                    </span>
                    <h1 className="text-3xl PFRegalTextPro">{post.title}</h1>
                    <p className="text-sm">
                        This is a starter template for Supabase and Mantine. It
                        includes a basic setup for authentication and data
                        fetching...
                    </p>
                </div>
            </Link>
            {edit && (
                <div className="footercard grid grid-cols-2 gap-4">
                    <button className="w-full rounded-lg bg-sky-700/30 border-2 border-sky-600/30 py-3">
                        Ver publicação
                    </button>
                    <button className="w-full rounded-lg bg-sky-700/30 border-2 border-sky-600/30 py-3">
                        Mais opções
                    </button>
                </div>
            )}
        </div>
    );
}
