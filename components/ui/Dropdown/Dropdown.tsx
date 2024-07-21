import { cn } from "../../../lib/utils";

export const DropdownCategoryTitle = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="text-[.65rem] font-semibold mb-1 uppercase text-neutral-500 dark:text-neutral-400 px-1.5">
            {children}
        </div>
    );
};

export const DropdownButton = ({
    children,
    isActive,
    onClick,
    disabled,
    className,
}: {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}) => {
    const buttonClass = cn(
        "flex items-center gap-2 p-1.5 text-sm font-medium transition-all duration-300 text-neutral-500 dark:text-neutral-400 text-left bg-transparent w-full rounded",
        !isActive && !disabled,
        "hover:bg-woodsmoke-100/70 dark:hover:bg-neutral-900 dark:hover:text-neutral-200",
        isActive &&
            !disabled &&
            "bg-woodsmoke-100 text-woodsmoke-700 dark:bg-neutral-900 dark:text-neutral-200",
        disabled && "text-neutral-400 cursor-not-allowed dark:text-neutral-600",
        className,
    );

    return (
        <button className={buttonClass} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};
