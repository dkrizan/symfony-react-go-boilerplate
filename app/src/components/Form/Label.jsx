export function Label({optional, children}) {
    return (
        <label className="text-gray-700 dark:text-slate-50 font-medium">
            {children}
            {optional && <span className="text-gray-500 font-light"> (optional)</span>}
        </label>
    )
}