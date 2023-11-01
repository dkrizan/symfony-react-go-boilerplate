export function BasicSpinner({size}) {
    const sizes = {
        "small": "w-6 h-6",
        "medium": "w-8 h-8",
        "large": "w-10 h-10"
    }
    return (
        <div
            className={sizes[size] + " animate-spin inline-block border-[3px] border-current border-t-transparent " +
                "text-blue-600 rounded-full"}
            role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    )
}