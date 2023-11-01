import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {Link, useLocation} from "react-router-dom";
import { authActions } from 'store';
import {ActionButton} from "../../components/Controls/ActionButton";
import {InputText} from "../../components/Form/InputText";
import {history} from "../../helpers";

export { Login };

function Login() {
    const dispatch = useDispatch();
    const authError = useSelector(x => x.auth.error);
    const {state: locationState} = useLocation();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return dispatch(authActions.login({ username, password })).then(({meta: { requestStatus }}) => {
            if (requestStatus === "fulfilled") {
                const { from } = (!locationState?.passwordChanged && history.location.state) || { from: { pathname: '/' } };
                history.navigate(from);
            }
        });
    }

    return (
        <>
            <div className="mb-0 p-6 pb-0 text-center">
                <h4 className="font-bold text-2xl my-2 dark:text-white">Sign In</h4>
                <p className="mb-0 text-gray-600 dark:text-slate-100">Enter your email and password to sign in</p>
                {locationState?.passwordChanged &&
                    <div className="text-left mt-4 bg-green-500/10 border border-green-300 text-sm text-green-700 rounded-md p-4"
                         role="alert">
                        <div className="font-bold">Password changed!</div>
                        <div>You can now login with your new password.</div>
                    </div>
                }
            </div>
            <div className="flex-auto p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            <span>Login</span>
                        </ActionButton>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0 dark:text-white">{authError.message}</div>
                        }
                    </div>
                </form>
            </div>
            <div
                className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 px-1 pt-0 text-center sm:px-6">
                <p className="mx-auto mb-4 dark:text-slate-100">Don't have an account ? <Link to="/signup"
                                                                          className="bg-gradient-to-tl from-blue-700 to-sky-500 dark:from-blue-400 dark:to-sky-100 bg-clip-text font-bold text-transparent">Sign up</Link>
                </p>
                <Link to="/reset-password" className="hover:text-sky-800 dark:text-slate-100 dark:hover:text-slate-300">Forgot your password ?</Link>
            </div>
        </>
    )
}
