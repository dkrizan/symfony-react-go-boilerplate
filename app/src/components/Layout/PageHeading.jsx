import PropTypes from "prop-types";

export function PageHeading({children}) {
    return (
        <div className="lg:px-6 py-3 mb-3">
            <h1 className="font-display min-w-0 font-bold tracking-tight text-slate-800 dark:text-slate-50 text-4xl leading-tight">
                { children }
            </h1>
        </div>
    )
}

PageHeading.prototype = {
    children: PropTypes.element
}