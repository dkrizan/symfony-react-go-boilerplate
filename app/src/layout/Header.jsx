import {useApolloClient, useQuery} from "@apollo/client";
import {useDispatch} from "react-redux";
import {ME} from "../graphql/queries/meQueries";
import {authActions} from "../store";
import {Link} from "react-router-dom";
import {AvatarMenu} from "../components/Navbar";
import {Nav} from "../components";
import {DarkMode} from "../components/Toggle/DarkMode";
import {fetchService, history} from "../helpers";

export function Header() {
    const apollo = useApolloClient();
    const dispatch = useDispatch();
    const { loading, error, data } = useQuery(ME);

    if (error) {
        return;
    }

    const logout = async (state) => {
        await fetchService.post(`${process.env.REACT_APP_API_URL}/graphql/api/invalidate_token`).finally(() => {
            dispatch(authActions.logout(state));
            apollo.clearStore();
            history.navigate('/login');
        })
    };

    const links = [
        { level: 1, href: '/', label: 'Projects' },
        { level: 1, href: '/profile', label: 'Profile' },
        { level: 2, href: "#", onClick: logout, label: 'Logout'}
    ]

    const navigation = [
        { title: "Pricing", path: "/pricing"}
    ]

    return (
        <nav className="bg-white dark:bg-gray-800 w-full top-0 py-2 border-b-gray-200 dark:border-b-gray-700 border-b">
            <div className="items-center px-4 mx-auto flex lg:px-8">
                <div className="flex items-center justify-between">
                    <Link className="font-display text-2xl flex items-center" to="/">
                        <span className="w-[32px]"><img className="" alt="Logo" src="/logo-icon.svg" width="32px" /> </span>
                            <span className="px-1 text-cyan-900 dark:text-white">boilerplate</span></Link>
                </div>
                <div className={`flex align-center flex-1 justify-between`}>
                    <div className="flex-1">
                        <div className="mx-7 justify-end items-center space-x-2 flex">
                            <DarkMode />
                            <Nav nav={navigation} />
                        </div>
                    </div>
                    {!loading && <AvatarMenu
                        character={(data.me.name ?? data.me.login).slice(0, 2).toUpperCase()}
                        menu={links}
                        name={data.me.name}
                        email={data.me.login}
                    ></AvatarMenu>}
                </div>
            </div>
        </nav>
    )
}