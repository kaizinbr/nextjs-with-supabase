import React, { useState } from "react";
import Sketch from "@uiw/react-color-sketch";
import Colorful from '@uiw/react-color-colorful';
import { hsvaToHex } from '@uiw/color-convert';

function ColorSelect({ bgColor, setBgColor}: { bgColor: string, setBgColor: Function}) {
    

    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
    const [hex, setHex] = useState("#fff");
    // const [disableAlpha, setDisableAlpha] = useState(false);
    return (
        <div className="flex flex-col justify-around items-center min-h-[444px]">
            <div className="size-20 rounded-md "
                style={{backgroundColor: bgColor}}
            ></div>
            <Colorful
                color={hex}
                disableAlpha={true}
                onChange={(color) => {
                    setHex(color.hex);
                    setBgColor(color.hex);
                }}
                className=" colorSelector scale-150"
            />
        </div>
    );
}

export default ColorSelect;
