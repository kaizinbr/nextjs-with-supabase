import React from "react";

// import component 👇
import Drawer from "react-modern-drawer";
import { FaPen } from "react-icons/fa6";

//import styles 👇
import "react-modern-drawer/dist/index.css";

const Gaveta = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <>
            <button
                className="z-40 absolute right-3 top-32 text-woodsmoke-700 p-2 rounded-full bg-default-fill"
                onClick={toggleDrawer}
            >
                <FaPen className="" />
            </button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className={`
                    bg-default 
                    h-auto min-h-96 pb-6 backdrop-blur-lg 
                    rounded-t-2xl border border-neutral-600/60
                    flex flex-col
                `}
                size={"auto"}
            >
                <button
                    className="mx-auto my-4 h-2 w-[100px] rounded-full bg-neutral-600"
                    onClick={toggleDrawer}
                ></button>
                {children}
            </Drawer>
        </>
    );
};

export default Gaveta;
