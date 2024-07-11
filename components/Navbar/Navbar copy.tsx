'use client';

// obrigado especial a https://blog.olivierlarose.com/ que me ajudou a montar essa ideia
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button/Button';
import Nav from './Nav/Nav';

const menu = {
    open: {
        width: "calc(100vw - 64px)",
        maxWidth: "480px",
        height: "650px",
        maxHeight: "calc(100vh - 56px)",
        top: "-25px",
        right: "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
    },
    closed: {
        width: "100px",
        maxWidth: "480px",
        height: "40px",
        maxHeight: "calc(100vh - 56px)",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
    }
}

export default function Index() {
    const [isActive, setIsActive] = useState(false);
    const [scroll, setScroll] = useState(false);

    
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
        <div className={`
            fixed z-50 top-12 right-12
        `}>
            <motion.div 
                className={`
                         bg-outrageous-orange-300 rounded-3xl relative
                        sm:w-[480px] sm:h-[650px] w-full h-[400px]
                    `}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Nav setIsActive={setIsActive} />}
                </AnimatePresence>
            </motion.div>
            <Button isActive={isActive} toggleMenu={() => {setIsActive(!isActive)}}/>
        </div>
    )
}