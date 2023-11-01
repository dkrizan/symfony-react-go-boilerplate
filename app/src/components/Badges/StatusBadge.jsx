import PropTypes from "prop-types";

export function StatusBadge({status}) {
    return (
        <div className={"w-[80px] inline-block text-center px-3 py-2 text-sm rounded-xl bg-gray-200/90 hover:bg-gray-300 active:bg-gray-400/80 text-slate-700 font-semibold " + (status ? "-gray-200/90 text-slate-700" : "bg-gray-100/90 text-slate-400")}>{status ? 'Active' : 'Inactive'}</div>
    )
}

StatusBadge.protoTypes = {
    status: PropTypes.bool
}