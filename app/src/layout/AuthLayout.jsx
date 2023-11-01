import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { history } from 'helpers';
import {Outlet} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import {apollo} from "../config/apolloPublic";
import {Alerts} from "../components/Alerts/Alerts";

export function AuthLayout() {
    const authUser = useSelector(x => x.auth.user);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ApolloProvider client={apollo}>
            <div className="min-h-full bg-gray-100/70 dark:bg-gray-900 flex items-center justify-center px-3">
                <svg id="svg" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg"
                     className="fixed lg:w-[100%] sm:w-[200%] w-[300%] bottom-0 left-0 z-10 transition duration-300 ease-in-out delay-150">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="5%" stopColor="#002bdc"></stop>
                            <stop offset="95%" stopColor="#32ded4"></stop>
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0,600 C 0,600 0,150 0,150 C 88.60287081339715,131.92344497607655 177.2057416267943,113.8468899521531 279,118 C 380.7942583732057,122.1531100478469 495.77990430622015,148.53588516746413 600,158 C 704.2200956937799,167.46411483253587 797.6746411483252,160.00956937799043 889,151 C 980.3253588516748,141.99043062200957 1069.5215311004786,131.42583732057417 1161,131 C 1252.4784688995214,130.57416267942583 1346.2392344497607,140.28708133971293 1440,150 C 1440,150 1440,600 1440,600 Z"
                        stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.4"
                        className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="5%" stopColor="#002bdc"></stop>
                            <stop offset="95%" stopColor="#32ded4"></stop>
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0,600 C 0,600 0,300 0,300 C 70.02870813397126,305.0143540669857 140.05741626794253,310.0287081339713 246,299 C 351.94258373205747,287.9712918660287 493.7990430622011,260.8995215311005 593,264 C 692.2009569377989,267.1004784688995 748.7464114832535,300.37320574162675 828,313 C 907.2535885167465,325.62679425837325 1009.2153110047848,317.60765550239233 1115,312 C 1220.7846889952152,306.39234449760767 1330.3923444976076,303.1961722488038 1440,300 C 1440,300 1440,600 1440,600 Z"
                        stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53"
                        className="transition-all duration-300 ease-in-out delay-150 path-1"></path>
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="5%" stopColor="#002bdc"></stop>
                            <stop offset="95%" stopColor="#32ded4"></stop>
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0,600 C 0,600 0,450 0,450 C 89.02392344497608,465.7799043062201 178.04784688995215,481.5598086124402 259,478 C 339.95215311004785,474.4401913875598 412.83253588516754,451.5406698564594 525,449 C 637.1674641148325,446.4593301435406 788.622009569378,464.27751196172244 903,475 C 1017.377990430622,485.72248803827756 1094.6794258373207,489.34928229665076 1178,484 C 1261.3205741626793,478.65071770334924 1350.6602870813397,464.32535885167465 1440,450 C 1440,450 1440,600 1440,600 Z"
                        stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1"
                        className="transition-all duration-300 ease-in-out delay-150 path-2"></path>
                </svg>
                <div className="max-w-lg sm:px-6 py-4 px-0 md:h-auto md:block w-full flex items-center justify-center bg-white dark:bg-sky-900 z-20 shadow-2xl">
                    <div className="w-full">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Alerts/>
        </ApolloProvider>
    )
}
