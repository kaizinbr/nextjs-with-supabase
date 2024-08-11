import { Menu, Button, Text, rem } from "@mantine/core";
// import {
//     IconSettings,
//     IconSearch,
//     IconPhoto,
//     IconMessageCircle,
//     IconTrash,
//     IconArrowsLeftRight,
// } from "@tabler/icons-react";
import { Trash2, Eye, EllipsisVertical } from "lucide-react";
import classes from "@/styles/EditOptions.module.css";

export default function EditOptions({ post }: { post?: any }) {
    return (
        <Menu
            shadow="md"
            width={200}
            position="left-start"
            offset={10}
            classNames={{
                dropdown: classes.dropdown + " rounded-xl",
            }}
        >
            <Menu.Target>
                <button
                    className={`z-40 size-6`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <EllipsisVertical className="size-6" />
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item
                    leftSection={
                        <Eye style={{ width: rem(14), height: rem(14) }} />
                    }
                >
                    Visualizar post
                </Menu.Item>
                {/* <Menu.Item
                    leftSection={
                        <IconMessageCircle
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Messages
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconPhoto
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Gallery
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconSearch
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                    rightSection={
                        <Text size="xs" c="dimmed">
                            ⌘K
                        </Text>
                    }
                >
                    Search
                </Menu.Item> */}

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                {/* <Menu.Item
                    leftSection={
                        <IconArrowsLeftRight
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Transfer my data
                </Menu.Item> */}
                <Menu.Item
                    color="red"
                    leftSection={
                        <Trash2 style={{ width: rem(14), height: rem(14) }} />
                    }
                >
                    Deletar post
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
