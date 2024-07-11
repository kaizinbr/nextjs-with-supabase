import { motion } from "framer-motion";
import styles from "./style.module.scss";


export default function Button({ isActive, toggleMenu }: { isActive: boolean; toggleMenu: () => void }) {
    return (
        <div className={`absolute top-0 right-0 w-24 h-10 cursor-pointer rounded-full overflow-hidden`}>
            <motion.div
                className={`
                        relative w-full h-full
                    `}
                animate={{ top: isActive ? "-100%" : "0%" }}
                transition={{
                    duration: 0.5,
                    type: "tween",
                    ease: [0.76, 0, 0.24, 1],
                }}
            >
                <div
                    className={`
                            w-full h-full bg-outrageous-orange-300
                        `}
                    onClick={() => {
                        toggleMenu();
                    }}
                >
                    <PerspectiveText label="Menu" />
                </div>
                <div
                    className={`
                        w-full h-full bg-stone-950 text-stone-100
                    `}
                    onClick={() => {
                        toggleMenu();
                    }}
                >
                    <PerspectiveText label="Fechar" />
                </div>
            </motion.div>
        </div>
    );
}

function PerspectiveText({ label } : { label: string }) {
    return (
        <div className={styles.perspectiveText}>
            <p>{label}</p>
            <p>{label}</p>
        </div>
    );
}
