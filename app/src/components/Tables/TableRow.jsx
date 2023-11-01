export function TableRow({className, children}) {
    return (
        <tr className={className + " cursor-pointer " +
            "[&>td]:hover:bg-gray-100/80 [&>td]:dark:hover:bg-gray-700/60 [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl [&>td]:transition-background-color [&>td]:duration-300" }>
            {children}
        </tr>
    )
}