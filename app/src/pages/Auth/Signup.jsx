import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";

import { history } from 'helpers';
import { authActions } from 'store';
import {ActionButton} from "../../components/Controls/ActionButton";
import {InputText} from "../../components/Form/InputText";

export { Signup };

function Signup() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password, fullName }) {
        return dispatch(authActions.signup({ username, password, fullName })).then(({meta: {requestStatus}}) => {
            if (requestStatus === "fulfilled") {
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
            }
        });
    }

    return (
        <div className="min-h-full bg-gray-100/70 dark:bg-gray-900 flex items-center justify-center">
            <svg id="svg" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg"
                 className="absolute lg:w-[100%] sm:w-[200%] w-[300%] bottom-0 left-0 z-10 transition duration-300 ease-in-out delay-150">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="5%" stopColor="#0693e3"></stop>
                        <stop offset="95%" stopColor="#f78da7"></stop>
                    </linearGradient>
                </defs>
                <path
                    d="M 0,600 C 0,600 0,150 0,150 C 103.42857142857142,129.57142857142856 206.85714285714283,109.14285714285714 339,115 C 471.14285714285717,120.85714285714286 632.0000000000001,153.00000000000003 742,158 C 851.9999999999999,162.99999999999997 911.1428571428571,140.85714285714283 1019,135 C 1126.857142857143,129.14285714285717 1283.4285714285716,139.57142857142858 1440,150 C 1440,150 1440,600 1440,600 Z"
                    stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.4"
                    className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="5%" stopColor="#0693e3"></stop>
                        <stop offset="95%" stopColor="#f78da7"></stop>
                    </linearGradient>
                </defs>
                <path
                    d="M 0,600 C 0,600 0,300 0,300 C 152.07142857142858,282.3571428571429 304.14285714285717,264.7142857142857 407,262 C 509.85714285714283,259.2857142857143 563.4999999999999,271.5 677,286 C 790.5000000000001,300.5 963.8571428571429,317.2857142857143 1101,320 C 1238.142857142857,322.7142857142857 1339.0714285714284,311.3571428571429 1440,300 C 1440,300 1440,600 1440,600 Z"
                    stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53"
                    className="transition-all duration-300 ease-in-out delay-150 path-1"></path>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="5%" stopColor="#0693e3"></stop>
                        <stop offset="95%" stopColor="#f78da7"></stop>
                    </linearGradient>
                </defs>
                <path
                    d="M 0,600 C 0,600 0,450 0,450 C 151.96428571428572,419.32142857142856 303.92857142857144,388.64285714285717 420,406 C 536.0714285714286,423.35714285714283 616.25,488.75 724,501 C 831.75,513.25 967.0714285714287,472.3571428571429 1091,455 C 1214.9285714285713,437.6428571428571 1327.4642857142858,443.82142857142856 1440,450 C 1440,450 1440,600 1440,600 Z"
                    stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1"
                    className="transition-all duration-300 ease-in-out delay-150 path-2"></path>
            </svg>
            <div className="max-w-lg sm:px-6 py-4 px-0 md:h-auto md:block w-full flex items-center justify-center bg-white dark:bg-sky-900 z-20 shadow-2xl">
                <div className="w-full">
                    <div className="mb-0 p-6 pb-0 text-center">
                        <h4 className="font-bold text-2xl my-2 dark:text-white">Get started for free</h4>
                    </div>
                    <div className="flex-auto p-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <InputText name="fullName" label="Full name" placeholder="John Doe" register={register} error={errors} />
                            </div>
                            <div className="mb-4">
                                <InputText name="username" type="email" label="Email" placeholder="name@example.com" register={register} error={errors} />
                            </div>
                            <div className="mb-4">
                                <InputText name="password" type="password" label="Password" register={register} error={errors} />
                            </div>
                            <div className="text-center">
                                <ActionButton
                                    disabled={isSubmitting}
                                    className="relative mx-auto flex justify-center flex w-full transition-width duration-1000 whitespace-nowrap px-10"
                                >
                                    <svg className={`${isSubmitting ? "opacity-100" : "opacity-0"} transition-opacity absolute left-5 animate-spin h-4 w-4 mr-3 mt-1 text-white`} viewBox="0 0 24 24">
                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Sign up</span>
                                </ActionButton>
                                {authError &&
                                    <div className="alert alert-danger mt-3 mb-0 dark:text-white">{authError.message}</div>
                                }
                            </div>
                        </form>
                    </div>
                    <div
                        className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 px-1 pt-0 text-center sm:px-6">
                        <p className="mx-auto mb-4 dark:text-slate-100">Already have and account ? <Link to="/login"
                                                                                     className="bg-gradient-to-tl from-blue-700 to-sky-500 dark:from-blue-400 dark:to-sky-100 bg-clip-text font-bold text-transparent">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
