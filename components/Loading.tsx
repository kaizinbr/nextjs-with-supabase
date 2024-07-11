export default function Loading() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="col-span-4 flex justify-center items-center h-24">
                <svg className="spinner box-border w-14 h-14 p-[3px] overflow-visible">
                    <circle className="stroke-violet-500">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="-90;810"
                            keyTimes="0;1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animateTransform>
                        <animate
                            attributeName="stroke-dashoffset"
                            values="0%;0%;-157.080%"
                            calcMode="spline"
                            keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
                            keyTimes="0;0.5;1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                        <animate
                            attributeName="stroke-dasharray"
                            values="0% 314.159%;157.080% 157.080%;0% 314.159%"
                            calcMode="spline"
                            keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
                            keyTimes="0;0.5;1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                    </circle>
                </svg>
            </div>
        </div>
    );
}

export function LoadingSm() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="col-span-4 flex justify-center items-center h-14">
                <svg className="spinner box-border w-8 h-8 p-[2px] overflow-visible">
                    <circle className="stroke-gray-200">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="-90;810"
                            keyTimes="0;1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animateTransform>
                        <animate
                            attributeName="stroke-dashoffset"
                            values="0%;0%;-157.080%"
                            calcMode="spline"
                            keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
                            keyTimes="0;0.5;1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                        <animate
                            attributeName="stroke-dasharray"
                            values="0% 314.159%;157.080% 157.080%;0% 314.159%"
                            calcMode="spline"
                            keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
                            keyTimes="0;0.5;1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                    </circle>
                </svg>
            </div>
        </div>
    );
}