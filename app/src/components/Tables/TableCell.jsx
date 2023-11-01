export function TableCell({className, children}) {
    return (
        <td className={`${className || ''} sm:py-3 py-4 sm:px-2 first:px-2 first:sm:px-0 first:sm:pl-4 text-slate-800 dark:text-slate-100 text-base`}>
            <div>{children}</div>
        </td>
    )
}