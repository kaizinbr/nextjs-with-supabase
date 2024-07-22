import { createClient } from "@/utils/supabase/client";

export class API {
    public static uploadImage = async (file: File | any) => {
        // await new Promise((r) => setTimeout(r, 500));
        const supabase = createClient();

        // const file = event.target.files[0];
        console.log(file);
        const fileExt = file.name.split(".").pop();
        const filePath = `${file.lastModified}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("images")
            .upload(filePath, file);

        if (uploadError) {
            console.log("Error uploading image: ", uploadError);
            throw uploadError;
        }
        const imageUrl = supabase.storage
            .from("images")
            .getPublicUrl(filePath);

        console.log(imageUrl);

        return imageUrl.data.publicUrl;
    };
}

export default API;
