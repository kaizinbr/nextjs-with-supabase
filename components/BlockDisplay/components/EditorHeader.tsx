import { Icon } from "../../ui/Icon";
import { EditorInfo } from "./EditorInfo";
import { EditorUser } from "../types";
import { WebSocketStatus } from "@hocuspocus/provider";
import { Toolbar } from "../../ui/Toolbar";

export type EditorHeaderProps = {
    isSidebarOpen?: boolean;
    toggleSidebar?: () => void;
    characters: number;
    words: number;
    collabState: WebSocketStatus;
    users: EditorUser[];
    room: string | any;
};

export const EditorHeader = ({
    characters,
    collabState,
    users,
    words,
    isSidebarOpen,
    toggleSidebar,
    room
}: EditorHeaderProps) => {
    return (
        <div className="h-[72px] flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-stone-100 border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
            <div className="flex flex-row gap-x-1.5 items-center ml-14">
                <div className="flex items-center gap-x-1.5">
                    <Toolbar.Button
                        tooltip={
                            isSidebarOpen ? "Close sidebar" : "Open sidebar"
                        }
                        onClick={toggleSidebar}
                        active={isSidebarOpen}
                        className={isSidebarOpen ? "bg-transparent" : ""}
                    >
                        <Icon
                            name={
                                isSidebarOpen ? "PanelLeftClose" : "PanelLeft"
                            }
                        />
                    </Toolbar.Button>
                </div>
            </div>
            <EditorInfo
                characters={characters}
                words={words}
                collabState={collabState}
                users={users}
                room={room}
            />
        </div>
    );
};
