export function Table({className, children, header = [], headerClassnames = {}}) {
    return (
        <div className="py-2 w-full">
            <table className={className + " w-full text-sm text-left h-full"}>
                { header &&
                    <thead>
                        <tr>
                            {header.map((head, i) => (
                                <th key={i} className={[
                                    "font-bold text-gray-500/90 dark:text-slate-200 sm:px-2 first:sm:px-0 pl-2 first:sm:pl-4", headerClassnames[i] || ''
                                ].join(" ")}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                }
                <tbody>
                { children }
                </tbody>
            </table>
        </div>
    )
}