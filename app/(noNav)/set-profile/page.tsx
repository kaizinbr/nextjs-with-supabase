import SetProfileForm from "@/components/profile/user/setProfile/SetProfileForm";
import { createClient } from "@/utils/supabase/server";


export default async function SetProfile() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col w-full h-full m-auto justify-center items-center px-8 sm:max-w-md gap-2">
                <SetProfileForm user={user} />
            </div>
        </div>
    );
}