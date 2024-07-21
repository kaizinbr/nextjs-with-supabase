"use client";

import cx from "clsx";
import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import {
    Menu,
    Button,
    Text,
    rem,
    Drawer,
    useMantineTheme,
    NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
import {
    ChevronDown,
    Heart,
    Star,
    MessageCircle,
    Settings,
    SquareArrowRightIcon,
    LogOut,
    Pause,
    Trash,
    Menu as MenuIcon,
    Home,
    FileText,
    LibraryBig,
    SquarePen,
} from "lucide-react";
import Link from "next/link";
import AvatarB from "./Avatar";

// obrigado especial a https://blog.olivierlarose.com/ que me ajudou a montar essa ideia

import { AnimatePresence, motion } from "framer-motion";
import Btn from "./Button/Button";
import Nav from "./Nav/Nav";

export default function HeaderTabs({ user }: { user: User | null }) {
    // console.log(user);
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);

    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    // let user: User | null = null;

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`full_name, username, website, avatar_url`)
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }

            // console.log(data);
        } catch (error) {
            console.log("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                size="xs"
                offset={8}
                radius="md"
                classNames={{
                    root: classes.drawer,
                    body: classes.drawerBody,
                    header: classes.drawerHeader,
                    content: classes.drawerContent,
                }}
            >
                {user === null ? (
                    <div className="">
                        <Link
                            href="/login"
                            className="py-2 px-2 rounded-md bg-stone-600/30"
                        >
                            Faça login ou cadastre-se
                        </Link>
                    </div>
                ) : (
                    <div className="flex-flex-col w-full">
                        <div className="flex flex-col justify-center items-center w-full">
                            <AvatarB size={128} url={avatar_url} />
                            <h1  className="mt-4 text-2xl font-semibold">
                                {fullname}
                            </h1>
                            <p className="mt-1 mb-4 text-lg">
                                @{username}
                            </p>
                        </div>
                        <ul className="flex flex-col gap-3">
                            <NavLink
                                label="Home"
                                leftSection={<Home size="1.3rem" className="mr-4" />}
                                href="/"
                                unstyled
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}
                            />
                            <NavLink
                                label="Posts"
                                leftSection={<FileText size="1.3rem" className="mr-4" />}
                                href="/posts"
                                unstyled
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}
                            />
                            <NavLink
                                label="Livros"
                                leftSection={<LibraryBig size="1.3rem" className="mr-4" />}
                                href="/manage"
                                unstyled
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}
                            />
                            <NavLink
                                label="Criar"
                                leftSection={<SquarePen size="1.3rem" className="mr-4" />}
                                href="/create"
                                unstyled
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}
                            />
                            <NavLink
                                label="Configurações"
                                leftSection={<Settings size="1.3rem" className="mr-4" />}
                                href="/settings"
                                unstyled
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}
                            />
                        </ul>
                    </div>
                )}
            </Drawer>

            <button onClick={open} className="fixed z-50 top-4 left-4">
                {user == null ? (
                    <MenuIcon />
                ) : (
                    <div className="border-2 rounded-full border-woodsmoke-300">
                        <AvatarB size={38} url={avatar_url} />
                    </div>
                )}
            </button>
        </>
    );

    //     return (
    //         <div className={classes.header}>
    //             <Container className={classes.mainSection} size="md">
    //                 <Group justify="space-between">
    //                     <p>Kai</p>

    //                     <Burger
    //                         opened={opened}
    //                         onClick={toggle}
    //                         hiddenFrom="xs"
    //                         size="sm"
    //                     />

    //                     <Menu
    //                         width={260}
    //                         position="bottom-end"
    //                         transitionProps={{ transition: "pop-top-right" }}
    //                         onClose={() => setUserMenuOpened(false)}
    //                         onOpen={() => setUserMenuOpened(true)}
    //                         withinPortal
    //                     >
    //                         <Menu.Target>
    //                             <UnstyledButton
    //                                 className={cx(classes.user, {
    //                                     [classes.userActive]: userMenuOpened,
    //                                 })}
    //                             >
    //                                 <Group gap={7}>
    //                                     <AvatarB url={avatar_url} />
    //                                     <Text fw={500} size="sm" lh={1} mr={3}>
    //                                         {/* {user.name} */}
    //                                     </Text>
    //                                     <ChevronDown
    //                                         style={{
    //                                             width: rem(12),
    //                                             height: rem(12),
    //                                         }}
    //                                         // stroke={1.5}
    //                                     />
    //                                 </Group>
    //                             </UnstyledButton>
    //                         </Menu.Target>
    //                         <Menu.Dropdown>
    //                             <Menu.Item
    //                                 leftSection={
    //                                     <Heart
    //                                         style={{
    //                                             width: rem(16),
    //                                             height: rem(16),
    //                                         }}
    //                                         color={theme.colors.red[6]}
    //                                         // stroke={1.5}
    //                                     />
    //                                 }
    //                             >
    //                                 Liked posts
    //                             </Menu.Item>
    //                             <Menu.Item
    //                                 leftSection={
    //                                     <Star
    //                                         style={{
    //                                             width: rem(16),
    //                                             height: rem(16),
    //                                         }}
    //                                         color={theme.colors.yellow[6]}
    //                                         // stroke={1.5}
    //                                     />
    //                                 }
    //                             >
    //                                 Saved posts
    //                             </Menu.Item>
    //                             <Menu.Item
    //                                 leftSection={
    //                                     <MessageCircle
    //                                         style={{
    //                                             width: rem(16),
    //                                             height: rem(16),
    //                                         }}
    //                                         color={theme.colors.blue[6]}
    //                                         // stroke={1.5}
    //                                     />
    //                                 }
    //                             >
    //                                 Your comments
    //                             </Menu.Item>

    //                             <Menu.Label>Settings</Menu.Label>
    //                             <Menu.Item
    //                                 leftSection={
    //                                     <Settings
    //                                         style={{
    //                                             width: rem(16),
    //                                             height: rem(16),
    //                                         }}
    //                                         // stroke={1.5}
    //                                     />
    //                                 }
    //                             >
    //                                 Account settings
    //                             </Menu.Item>
    //                             <Menu.Item
    //                                 leftSection={
    //                                     <SquareArrowRightIcon
    //                                         style={{
    //                                             width: rem(16),
    //                                             height: rem(16),
    //                                         }}
    //                                         // stroke={1.5}
    //                                     />
    //                                 }
    //                             >
    //                                 Change account
    //                             </Menu.Item>
    //                             <Menu.Item
    //                                 leftSection={
    //                                     <LogOut
    //                                         style={{
    //                                             width: rem(16),
    //                                             height: rem(16),
    //                                         }}
    //                                         // stroke={1.5}
    //                                     />
    //                                 }
    //                             >
    //                                 Logout
    //                             </Menu.Item>

    //                             <Menu.Divider />

    //                             <Menu.Label>Danger zone</Menu.Label>
    //                             <Menu.Item
    //                                 leftSection={
    //                                     <Pause
    //                                         style={{
    //                                             width: rem(16),
    //                                             height: rem(16),
    //                                         }}
    //                                         // stroke={1.5}
    //                                     />
    //                                 }
    //                             >
    //                                 Pause subscription
    //                             </Menu.Item>
    //                             <Menu.Item
    //                                 color="red"
    //                                 leftSection={
    //                                     <Trash
    //                                         style={{
    //                                             width: rem(16),
    //                                             height: rem(16),
    //                                         }}
    //                                         // stroke={1.5}
    //                                     />
    //                                 }
    //                             >
    //                                 Delete account
    //                             </Menu.Item>
    //                         </Menu.Dropdown>
    //                     </Menu>
    //                 </Group>
    //             </Container>
    //         </div>
    //     );
    // }
    // // import { useDisclosure } from '@mantine/hooks';
    // import { Drawer, Button } from "@mantine/core";

    // function Demo() {
}

const menu = {
    open: {
        width: "calc(100vw - 64px)",
        maxWidth: "480px",
        height: "650px",
        top: "-10px",
        right: "10px",
        maxHeight: "calc(100vh - 56px)",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
        width: "20px",
        maxWidth: "480px",
        height: "20px",
        maxHeight: "calc(100vh - 56px)",
        top: "0px",
        right: "0px",
        transition: {
            duration: 0.75,
            delay: 0.35,
            type: "tween",
            ease: [0.76, 0, 0.24, 1],
        },
    },
};

export function Index({ user }: { user: User | null }) {
    const [isActive, setIsActive] = useState(false);
    const [scroll, setScroll] = useState(false);
    const supabase = createClient();
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`full_name, username, website, avatar_url`)
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                // setFullname(data.full_name);
                // setUsername(data.username);
                // setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }

            // console.log(data);
        } catch (error) {
            console.log("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }, []);

    return (
        <div
            className={`
            fixed z-50 bottom-6 mx-auto inset-x-0
            py-3 px-5 rounded-lg bg-woodsmoke-700/80 shadow-sm backdrop-blur-xl w-fit flex flex-row gap-6 items-center
        `}
        >
            <Link href="/">
                <Home size={24} />
            </Link>
            <Menu
                offset={20}
                withArrow
                trigger="click-hover"
                openDelay={100}
                closeDelay={400}
                classNames={{
                    dropdown: `backdrop-blur-xl ` + classes.dropdown,
                    item: `hover:bg-stone-400/30 transition-all duration-300`,
                }}
            >
                <Menu.Target>
                    <Button unstyled>
                        <LibraryBig size={24} />
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <Link href="/manage">Livros</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="/manage">Capítulos</Link>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <Menu
                offset={20}
                withArrow
                trigger="click-hover"
                openDelay={100}
                closeDelay={400}
                classNames={{
                    dropdown: `backdrop-blur-xl ` + classes.dropdown,
                    item: `hover:bg-stone-400/30 transition-all duration-300`,
                }}
            >
                <Menu.Target>
                    <Button unstyled>
                        <SquarePen size={24} />
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <Link href="/create">Criar post</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="/create/book">Criar livro</Link>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Menu
                offset={20}
                withArrow
                trigger="click-hover"
                openDelay={100}
                closeDelay={400}
                classNames={{
                    dropdown: `backdrop-blur-xl ` + classes.dropdown,
                    item: `hover:bg-stone-400/30 transition-all duration-300`,
                }}
            >
                <Menu.Target>
                    <Button unstyled>
                        <Settings size={24} />
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <Link href="/settings">Conta</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="#">opção</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="#">opção</Link>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <button
                onClick={() => {
                    setIsActive(!isActive);
                }}
                className=""
            >
                {user === null ? (
                    <MenuIcon />
                ) : (
                    <AvatarB size={26} url={avatar_url} />
                )}
            </button>
            {/* <Button isActive={isActive} toggleMenu={() => {setIsActive(!isActive)}}/> */}
        </div>
    );
}
