import { createClient } from "@/utils/supabase/client";

export default async function getUserProfileClient({
    id,
}: {
    id: string;
}) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.log(error);
        return null;
    }

    return data;

}