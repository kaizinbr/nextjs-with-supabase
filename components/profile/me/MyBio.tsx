import Link from "next/link";
import ProfilePic from "../general/ProfilePic";

type userProps = {
    id: string;
    username: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    Profile: {
        id: string;
        bio: string | null;
        name: string | null;
        image: string | null;
        userId: string;
        pronouns: string | null;
    } | null;
    posts: {
        id: string;
        slug: string;
        title: string | null;
        color: string | null;
        subtitle: string | null;
        tags: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

export default function MyBio({ userData }: userProps | any) {
    console.log(userData);
    // const ProfilePicProps = {
    //     src: userData.Profile?.image!,
    //     size: 220,
    //     alt: `Foto de perfil de ${userData.name}`,
    // };

    // console.log("aaaa");

    return (
        <div
            className={`
            flex items-center justify-center
            col-span-4 
            relative
        
        `}
        >
            {/* <div
                className={`
                    flex flex-col justify-center items-center
                    border-2 border-gray-300/80
                    bg-gray-100/60
                    rounded-2xl fixed w-[352px] top-9
                    py-4 px-6 gap-6
                `}
            >
                <ProfilePic props={ProfilePicProps} />
                    <div className="flex flex-col justify-start items-start w-full">
                        <h1 className="text-3xl displayBold mt-2">
                            {userData.name}
                        </h1>
                        <h2 className="text-base displayMedium text-gray-600 ">
                            @{userData.username}
                        </h2>
                        <div
                            className={`
                                    flex flex-row gap-6 justify-center items-center mt-2
                                    text-gray-800 text-sm
                                `}
                        >
                            {userData.Profile?.pronouns ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                >
                                    {userData.Profile?.pronouns!}
                                </Link>
                            ) : null}
                            {userData.createdAt ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                >
                                    Entrou em{" "}
                                    {new Date(
                                        userData.createdAt
                                    ).getUTCFullYear()}
                                </Link>
                            ) : null}
                            {userData.posts ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                    className="flex flex-row items-center hover:text-violet-500 transition-all"
                                >
                                    {userData.posts?.length} Posts
                                </Link>
                            ) : null}
                        </div>
                    </div>
                <div
                    className={`
                    
                        text-gray-600 text-sm
                        w-full
                    `}
                >
                    <span className="font-semibold">Bio:</span>
                    <p>{userData.Profile?.bio!}</p>
                </div>
            </div> */}
            <h1>bio</h1>
        </div>
    );
}
