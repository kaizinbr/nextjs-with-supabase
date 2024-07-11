import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

import { createClient } from "@/utils/supabase/client";
import classes from "@/styles/EditorInfo.module.css";

export default function PubModal({
    room,
    isPublic,
    setIsPublic,
}: {
    room: string;
    isPublic: boolean;
    setIsPublic: Function;
}) {
    const [opened, { open, close }] = useDisclosure(false);

    const supabase = createClient();

    async function setPublished({
        room,
        value,
    }: {
        room: string;
        value: boolean;
    }) {
        // const supabase = createClient();
        const { data, error } = await supabase
            .from("posts")
            .update({ public: value })
            .eq("room", room);

        setIsPublic(value);

        if (error) {
            console.log("Error updating post: ", error);
            throw error;
        }
    }
    return (
        <>
            {isPublic ? (
                <>
                    <Button
                        onClick={open}
                        className="rounded-lg px-3 py-2 bg-sky-600 text-xs"
                        classNames={{
                            root: classes.modalBtn,
                        }}
                    >
                        Despublicar
                    </Button>
                    <Modal
                        opened={opened}
                        onClose={close}
                        centered
                        withCloseButton={false}
                        classNames={{
                            content: classes.content,
                        }}
                    >
                        <p className="text-bold text-center text-2xl mb-4">
                            Remover publicação?
                        </p>
                        <div className="flex justify-around">
                            <button
                                onClick={close}
                                className="rounded-lg px-6 py-2 bg-gray-400 text-base text-stone-200 font-bold"
                            >
                                Não
                            </button>
                            <button
                                onClick={async () => {
                                    await setPublished({ room, value: false });
                                    close();
                                }}
                                className="rounded-lg px-6 py-2 bg-sky-600 text-base text-stone-200 font-bold"
                            >
                                Sim
                            </button>
                        </div>
                    </Modal>
                </>
            ) : (
                <>
                    <Button
                        onClick={open}
                        className="rounded-lg px-3 py-2 bg-sky-600 text-xs"
                        classNames={{
                            root: classes.modalBtn,
                        }}
                    >
                        Publicar
                    </Button>
                    <Modal
                        opened={opened}
                        onClose={close}
                        centered
                        withCloseButton={false}
                        classNames={{
                            content: classes.content,
                        }}
                    >
                        <p className="text-bold text-center text-2xl mb-4">
                            Publicar para todos?
                        </p>
                        <div className="flex justify-around">
                            <button
                                onClick={close}
                                className="rounded-lg px-6 py-2 bg-gray-400 text-base text-stone-200 font-bold"
                            >
                                Não
                            </button>
                            <button
                                onClick={async () => {
                                    await setPublished({ room, value: true });
                                    close();
                                }}
                                className="rounded-lg px-6 py-2 bg-sky-600 text-base text-stone-200 font-bold"
                            >
                                Sim
                            </button>
                        </div>
                    </Modal>{" "}
                </>
            )}
        </>
    );
}
