import Navbar from "@/components/Navbar/Navbar";
import { createClient } from "@/utils/supabase/server";


export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar user={user} />
            <div className="flex-1">
                {children}
            </div>
            {/* <Footer /> */}
        </div>
    );
}