const SIZES = {
    sm: "text-sm p-2 xs:px-4",
    md: "text-base p-3 xs:px-8",
    lg: "text-lg p-3 xs:px-8",
    full: "px-6 py-2.5 w-full"
  }

export default function Button({
    children,
    className,
    size = "md",
    variant = "purple",
    ...rest
}) {
    const sizeClass = SIZES[size]
    const variants = {
        white: `text-black bg-white`,
        blue: "text-white bg-blue-600 hover:bg-blue-700",
        purple: "text-white bg-indigo-600 hover:bg-indigo-700",
        red: "text-white bg-red-600 hover:bg-red-700",
        green: "text-white bg-green-600 hover:bg-green-700",
        lightPurple: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
        lightGreen: "text-green-700 bg-green-100 hover:bg-green-200",
    }
    return (
        <button
            {...rest}
            className={`disabled:opacity-50 disabled:pointer-events-none border rounded-md font-medium shadow-md ${className} ${variants[variant]} ${sizeClass}`}>
            {children}
        </button>
    )
}