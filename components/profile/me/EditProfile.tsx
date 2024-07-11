"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import NextImage from "next/image";
import Link from "next/link";
import MyBio from "./MyBio";
import Posts from "../general/Posts";
import { ProfilePic } from "../general/ProfilePic";
import { useSearchParams, useRouter } from "next/navigation";
import { X,  } from "lucide-react";
import Loading, { LoadingSm } from "@/components/Loading";
import containsSpecialChars from "@/lib/utils/containsSpecialChars"
import ColorSelect from "./ColorSelect";
import Gaveta from "./Gaveta";

type userProps = {
    id: string;
    username: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    Profile: {
        id: string;
        bio: string | null;
        name: string | null;
        image: string | null;
        userId: string;
        pronouns: string | null;
    } | null;
    posts: {
        id: string;
        slug: string;
        title: string | null;
        color: string | null;
        subtitle: string | null;
        tags: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

type usernameProps = {
    username: string[];
};

export default function EditProfile({
    ME,
    allUsernames,
}: {
    ME: userProps | any;
    allUsernames: any[];
}) {
    // console.log(ME);
    const myData = ME;
    const ProfilePicProps = {
        src: myData.Profile?.image!,
        size: 220,
        alt: `Foto de perfil de ${myData.name}`,
    };
    const [imgURL, setImgURL] = useState(myData.Profile?.image!);

    const [bgColor, setBgColor] = useState("#225A96");

    // FORM

    // const { data: session, status, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: myData.name,
        username: myData.username,
        pronouns: myData.Profile?.pronouns,
        bio: myData.Profile?.bio,
    });
    const defaultValues = {
        name: myData.name,
        username: myData.username,
        pronouns: myData.Profile?.pronouns,
        bio: myData.Profile?.bio,
    };
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const searchParams = useSearchParams();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // setLoading(true);
            console.log("mandando", formValues);
            if (containsSpecialChars(formValues.username)) {
                setError(
                    "O nome de usuário não pode conter caracteres especiais"
                );
                setDisabled(true);
                return;
            } else if (formValues.username.length < 3) {
                setError("O nome de usuário deve ter pelo menos 3 caracteres");
                setDisabled(true);
                return;
            } else if (formValues.username.length > 20) {
                setError("O nome de usuário deve ter no máximo 20 caracteres");
                setDisabled(true);
                return;
            } else if (userAlreadyExists(formValues.username)) {
                setError("Esse nome de usuário já está sendo usado");
                setDisabled(true);
                return;
            } else if (formValues.name == "" || !formValues.name.trim()) {
                setError("O nome não pode ficar em branco");
                setDisabled(true);
                return;
            } else if (
                formValues.username[0] == " " ||
                formValues.username[formValues.username.length - 1] == " "
            ) {
                formValues.username = formValues.username.trim();
            }
            const myId = myData.id;
            const res = await fetch(`/api/user/me?id=${myData.id}`, {
                method: "PUT",
                body: JSON.stringify({ formValues, imgURL, myId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    update({
                        name: formValues.name,
                        username: formValues.username,
                    });
                    router.refresh();
                });
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const resetForm = () => {
        setFormValues(defaultValues);
    };
    const allUsernames2 = allUsernames.filter(
        (user: any) => user !== myData.username
    );

    const testUsername = (username: string) => {
        if (username.length < 3) {
            return "O nome de usuário deve ter pelo menos 3 caracteres";
        } else if (username.length > 20) {
            return "O nome de usuário deve ter no máximo 20 caracteres";
        } else if (containsSpecialChars(username)) {
            return "O nome de usuário não pode conter caracteres especiais";
        } else if (userAlreadyExists(username)) {
            return "Esse nome de usuário já está sendo usado";
        } else {
            return null;
        }
    };

    const userAlreadyExists = (username: string) => {
        return allUsernames2.includes(username);
    };

    const downloadImage = async () => {
        try {
            const response = await fetch(imgURL + "&not-from-cache-please");
            const blob = await response.blob();
            const localURL = URL.createObjectURL(blob);
            // Use the localURL as needed
            console.log(localURL);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className={`
                flex flex-col justify-center
            `}
        >
            <div
                className={`
                    fixed top-3 left-3 right-3 z-40 shadow-md px-3
                    backdrop-blur-lg
                    rounded-xl 
                    transition-transform duration-300 md:translate-y-full translate-y-0
                    bg-neutral-800/80
                `}
            >
                <div
                    className={`
                    flex flex-row justify-between py-3
                `}
                >
                    <div className="flex flex-row items-center w-1/5">
                        <button onClick={() => router.back()}>
                            <X className="size-6" />
                        </button>
                    </div>

                    <button
                        disabled={loading}
                        className={`
                                bg-neutral-300 hover:bg-neutral-600 hover:text-gray-100
                                px-6 py-2
                                transition duration-200 rounded-full displayBold text-base
                                text-neutral-900 font-bold
                            `}
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>
            </div>
            {/* parte da cor e da foto */}
            <div
                className={`
                    flex flex-col justify-start
                    
                `}
            >
                <div
                    className={`
                        bgPfp flex flex-col justify-end items-start relative
                        h-56 w-full
                    `}
                >
                    <div
                        className={`
                    
                        flex flex-row gap-3 pt-8 px-4 w-full h-64 
                        bg-gradient-to- from-transparent to-black/45 from-40% 
                        items-end z-30
                    `}
                    >
                        <ProfilePic
                            props={ProfilePicProps}
                            imgURL={imgURL}
                            setImgURL={setImgURL}
                        />
                    </div>
                        <Gaveta>
                            <ColorSelect
                                bgColor={bgColor}
                                setBgColor={setBgColor}
                            />
                        </Gaveta>
                    <div className="flex absolute left-0 top-0 -z-10 w-full h-80">
                        <div
                            className=" w-full h-80 bg-[] overflow-hidden"
                            style={{ backgroundColor: bgColor }}
                        ></div>
                    </div>
                </div>
            </div>
            <div
                className={`
                    profile  flex-col-reverse
                    flex items-center justify-center
                    col-span-6 lg:col-span-4 
                    relative
                    order-1 lg:order-none w-full 
                    -top-[46.4px]
                    
                `}
            >
                <div
                    className={`
                            

                            flex flex-col justify-center lg:items-center
                            
                            bg-default-fill
                            rounded-3xl lg:fixed w-full md:w-[352px] top-9
                            py-6 pt-14 px-4 gap-3
                        `}
                >
                    <div
                        className={`
                        flex flex-col p-4 
                        bg-neutral-800 rounded-2xl
                    `}
                    >
                        <h2 className="text-lg font-bold">{formValues.name}</h2>
                        <p className="text-sm text-neutral-400">
                            @{formValues.username}
                        </p>
                        {formValues.pronouns ? (
                            <span className="text-sm text-neutral-500">
                                {formValues.pronouns!}
                            </span>
                        ) : null}
                    </div>

                    <div
                        className={`
                        
                            text-neutral-200 text-sm
                            w-full
                            flex flex-col p-4 
                            bg-neutral-800 rounded-2xl
                        `}
                    >
                        <span className="font-semibold text-neutral-400 mb-1">
                            Bio:
                        </span>
                        <p>{formValues.bio!}</p>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        autoComplete="off"
                        spellCheck="false"
                        className="flex flex-col justify-start items-start w-full"
                    >
                        <label
                            htmlFor="name"
                            className="text-base md:text-xs text-gray-500 font-medium mb-2"
                        >
                            Seu nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            className={`
                                    py-2 px-4 rounded-lg
                                    outline-none
                                    bg-neutral-700 w-full
                                    focus:bg-neutral-800
                                    transition duration-200 ease-in-out
                                    text-lg md:text-base font-medium text-neutral-100
                                `}
                        ></input>
                        <label
                            htmlFor="username"
                            className="text-base md:text-xs text-gray-500 font-medium mb-2 mt-6"
                        >
                            Nome de usuário
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                            onKeyUp={(e) => {
                                if (userAlreadyExists(e.currentTarget.value)) {
                                    console.log("user already exists");
                                }
                            }}
                            className={`
                                    py-2 px-4 rounded-lg
                                    outline-none
                                    bg-neutral-700 w-full
                                    focus:bg-neutral-800
                                    transition duration-200 ease-in-out
                                    text-lg md:text-base font-medium text-neutral-100
                                `}
                        ></input>
                        <span>
                            {testUsername(formValues.username) ? (
                                <p className="text-base md:text-xs text-red-500">
                                    {testUsername(formValues.username)}
                                </p>
                            ) : null}
                        </span>

                        <label
                            htmlFor="pronouns"
                            className="text-base md:text-xs text-gray-500 font-medium mb-2 mt-6"
                        >
                            Seus pronomes
                        </label>
                        <input
                            type="text"
                            name="pronouns"
                            value={
                                formValues.pronouns ? formValues.pronouns : ""
                            }
                            onChange={handleChange}
                            className={`
                                    mb-6 py-2 px-4 rounded-lg
                                    outline-none
                                    bg-neutral-700 w-full
                                    focus:bg-neutral-800
                                    transition duration-200 ease-in-out
                                    text-lg md:text-base font-medium text-neutral-100
                                `}
                        ></input>
                        <div
                            className={`
                    
                                text-neutral-100 text-sm
                                w-full
                            `}
                        >
                            <label
                                htmlFor="bio"
                                className="text-base md:text-xs text-gray-500 font-medium mb-2"
                            >
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formValues.bio}
                                onChange={handleChange}
                                className={`
                                    mb-6 py-2 px-4 rounded-lg
                                    outline-none
                                    bg-neutral-700 w-full
                                    focus:bg-neutral-800
                                    transition duration-200 ease-in-out
                                    text-lg md:text-base font-medium text-neutral-100
                                `}
                            ></textarea>
                        </div>
                    </form>
                    {/* </div> */}
                </div>
            </div>

            {disabled && (
                <div
                    className={`
                fixed top-0 left-0
                w-full h-full
                bg-gray-900 bg-opacity-50
                flex justify-center items-center
                z-50
            `}
                >
                    <div
                        className={`
                            bg-white
                            rounded-lg
                            py-4 px-9
                        `}
                    >
                        <div className="w-full mb-4 flex justify-center items-center">
                            {/* <MdErrorOutline
                                className="text-6xl text-red-500"
                                aria-label="Erro"
                            /> */}
                        </div>
                        <h1
                            className={`
                            text-xl font-medium text-gray-800
                            mb-6
                        `}
                        >
                            {error}!
                        </h1>
                        <button
                            className={`
                            bg-red-500 hover:bg-red-700 text-gray-100
                            px-6 py-2
                            transition duration-200 rounded-xl displayBold text-base
                            w-full
                        `}
                            onClick={() => setDisabled(false)}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
