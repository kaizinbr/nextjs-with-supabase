import { createClient } from "@/utils/supabase/client";

export default async function usernameAlreadyExists({
    username,
    actualUsername,
}: {
    username: string;
    actualUsername: string;
}) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username);

    if (error) {
        console.log(error);
        return false;
    }
    

    if (data.length > 0) {
        if (data[0].username === actualUsername) {
            return false;
        } else {
            return true;
        }
    }

}
