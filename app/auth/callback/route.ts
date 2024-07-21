import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { generateFromEmail, generateUsername } from "unique-username-generator";

export async function GET(request: Request) {
    // The `/auth/callback` route is required for the server-side auth flow implemented
    // by the SSR package. It exchanges an auth code for the user's session.
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;

    if (code) {
        const supabase = createClient();
        await supabase.auth.exchangeCodeForSession(code);
        const {
            data: { user },
        } = await supabase.auth.getUser();

        const username1 = generateUsername("", 0, 15);
        const full_name1 = generateUsername("", 0, 15);
        console.log(username1, " uuuu ", full_name1);

        const { data, error } = await supabase
            .from("profiles")
            .update({
                username: username1,
                full_name: full_name1,
            })
            .eq("id", user!.id);

        if (error) {
            console.log(error);
            // return NextResponse.error(new Error("Failed to create profile"));
        }
    }

    // URL to redirect to after sign up process completes
    return NextResponse.redirect(`${origin}/set-profile`);
}
