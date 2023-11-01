import { Link } from 'react-router-dom';

export function Nav({nav: navigation}) {
    return (
        <>
            {
                navigation.map((item, idx) => {
                    return (
                        <Link key={idx} to={item.path} className="text-base font-medium py-2 px-3 text-gray-600 dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-sky-900 hover:rounded-lg">
                            { item.title }
                        </Link>
                    )
                })
            }
        </>
    )
}