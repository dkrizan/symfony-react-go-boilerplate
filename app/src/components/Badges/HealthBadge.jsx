export const HealthStatus = {
    HEALTHY: "HEALTHY",
    LATE: "LATE",
    DOWN: "DOWN",
    PENDING: "PENDING"
};

export const HealthStatusTexts = {
    [HealthStatus.HEALTHY]: 'Healthy',
    [HealthStatus.LATE]: "Late",
    [HealthStatus.DOWN]: 'Down',
    [HealthStatus.PENDING]: "Pending",
};

export function HealthBadge({status}) {
    const STATUSES = {
        [HealthStatus.HEALTHY]: "text-emerald-600 bg-emerald-200/60 dark:bg-cyan-600 dark:text-slate-200",
        [HealthStatus.LATE]: "text-violet-600 bg-violet-300/60 dark:bg-lime-900 dark:text-slate-200",
        [HealthStatus.DOWN]: "text-red-800 bg-red-300/70 dark:bg-rose-800 dark:text-slate-200",
        [HealthStatus.PENDING]: "text-gray-600 bg-gray-200/60 dark:bg-gray-700 dark:text-slate-200",
    }

    const colorClasses = STATUSES[status];
    const statusText = HealthStatusTexts[status];
    return (
        <div className={`
        inline px-3 py-2 text-sm font-semibold transform rounded-xl cursor-pointer text-center
        ${colorClasses}
        `}
             tabIndex="0" role="button">{statusText}</div>
    )
}


