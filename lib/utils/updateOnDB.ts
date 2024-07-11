export default function updateOnDB(editor: any, room: any, supabase: any) {
    try {
        const updatePost = async () => {
            const content = editor.getJSON();
            const {
                data: { user },
            } = await supabase.auth.getUser();

            const exists = await supabase
                    .from("posts")
                    .select("*")
                    .eq("room", room);
                console.log(exists);

            if (exists.data?.length === 0) {
                await supabase.from("posts").insert([
                    {
                        room,
                        content,
                        author_id: user.id,
                    },
                ]);
            } else {
                console.log("Updating post");
                const { data, error } = await supabase
                    .from("posts")
                    .update({ content, updated_at: new Date()})
                    .eq("room", room);

                if (error) {
                    console.log("Error updating post: ", error);
                    throw error;
                }
            }

            
            // if (error) {
            //     console.log("Error updating post: ", error);
            //     throw error;
            // }
        };
        if (editor) {
            updatePost();
        }
    } catch (error) {
        console.log("Error downloading image: ", error);
    }

    if (!editor) {
        return null;
    }

    console.log(editor.getJSON());
    return null;
}
