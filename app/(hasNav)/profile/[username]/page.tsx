import AccountForm from "@/components/profile/user/account-form";
import { createClient } from "@/utils/supabase/server";
import DisplayUser from "@/components/profile/user/displayUser";
import DisplayPosts from "@/components/profile/user/DisplayPosts";

export default async function Account({
    params,
}: {
    params: { username: string };
}) {
    const supabase = createClient();

    console.log("user", params.username);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const lowercasedUsername = params.username.toLowerCase();

    const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("lower_username", lowercasedUsername);
    const itsMe = user?.id === data![0].id;

    return (
        <div className="flex flex-col w-full md:flex-row">
            {itsMe ? <AccountForm user={user} /> : <DisplayUser user={data} />}
            <DisplayPosts user={data} />
        </div>
    );
}
