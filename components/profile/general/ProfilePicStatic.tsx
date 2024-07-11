"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { SendPost } from "@/components/post/tools/SendPost";
import { ImgUpload } from "@/components/post/toolbar/imgUpload";

const ProfilePicStatic = ({ props, imgURL }: { props: any, imgURL: string | any}) => {

    return (
        <div className={`
            bgPfp flex flex-col justify-center items-start relative
             border-[7px] border-default rounded-full
            h-min ml-5
        `}>
            <picture
                className={`
                        flex flex-row justify-center items-center
                        bg-neutral-800 rounded-full overflow-hidden
                        w-20 h-20
                        
                    `}
            >
                    <Image
                        src={imgURL}
                        width={props.size}
                        height={props.size}
                        alt={props.alt}
                        className={`
                            object-cover object-center
                            min-w-full 
                        `}
                    />
            </picture>
            
        </div>
    );
};

const ProfilePicGen = ({ props }: { props: any}) => {

    const [imgUpload, setImgUpload] = useState(false);
    const [imgURL, setImgURL] = useState(props.src);
    const [imgId, setImgId] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
    const [saving, setSaving] = useState(false);
    const [url, setUrl] = useState("");        
    const altRef = useRef<HTMLTextAreaElement>(null);
    const subtitleRef = useRef<HTMLTextAreaElement>(null);
    const [alt, setAlt] = useState<string>("")    
    const [title, setTitle] = useState<string>("")
    // console.log('é a profile pic')
    return (
        <div className="bgPfp flex flex-col justify-center items-start relative">
            <picture
                className={`
                        flex flex-row justify-center items-center
                        bg-gray-200 rounded-full overflow-hidden
                        w-32 h-32
                        
                    `}
            >
                <button
                    onClick={() => {
                        setImgUpload(true);
                    }}
                >
                    <Image
                        src={imgURL}
                        width={props.size}
                        height={props.size}
                        alt={props.alt}
                        className={`
                            object-cover object-center
                            min-w-full min-h-full
                        `}
                    />
                </button>
            </picture>
            
            {imgUpload &&
                ImgUpload(
                    setImgUpload,
                    setImgURL,
                    setImgId,
                    imgURL,
                    setPorgessPorcent,
                    progressPorcent,
                    alt,
                    setAlt,
                    title,
                    setTitle,
                    altRef,
                    subtitleRef,
                    saving,
                    setSaving            
                )}
        </div>
    );
};

export {ProfilePicStatic , ProfilePicGen};
