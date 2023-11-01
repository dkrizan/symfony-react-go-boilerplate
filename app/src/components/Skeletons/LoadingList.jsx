export function LoadingList({rows}) {
    return (
        <div role="status"
             className="w-full rounded divide-y divide-gray-200 animate-pulse">
            {[...Array(rows)].map((i, key) =>
                <div key={key} className="flex justify-between items-center py-4">
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
                </div>
            )}
            <span className="sr-only">Loading...</span>
        </div>
    );
}