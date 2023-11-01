import { useForm } from "react-hook-form";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {ActionButton} from "../../../components/Controls/ActionButton";
import {InputText} from "../../../components/Form/InputText";
import {useMutation, useQuery} from "@apollo/client";
import {CHECK_RESET_TOKEN, RESET_PASSWORD} from "../../../graphql/public/resetPassword";
import {useEffect, useState} from "react";
import {BasicSpinner} from "../../../components/Spinners/BasicSpinner";

export { Reset };

function Reset() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [ success, setSuccess ]  = useState(false);
    const { data, loading: validatingToken, error: tokenError } = useQuery(CHECK_RESET_TOKEN, { variables: { token }});
    const {register, handleSubmit, getValues, formState: { isSubmitting, errors }} = useForm();
    const [resetPassword] = useMutation(RESET_PASSWORD);

    function onSubmit({ newPassword }) {
        return resetPassword({variables: { token, password: newPassword }}).then(({data}) => {
            if (data.resetPassword.success) {
                setSuccess(true);
            }
        })
    }

    useEffect(() => {
        if (success) {
            return navigate('/login', { state: { passwordChanged: true }});
        }
    });

    if (validatingToken) {
        return (
            <div className="p-6 text-center">
                <BasicSpinner size="large" />
            </div>
        );
    }

    if (!token) {
        return (
            <Navigate to="/reset-password"/>
        );
    }

    return (
        <>
            {!data?.checkPasswordResetToken || tokenError
                ? <>
                    <div className="mb-0 p-6 pb-0">
                        <h4 className="font-bold text-2xl my-2">Oh no !</h4>
                        <p className="mb-0 text-gray-600">This password reset link is either invalid or expired.</p>
                    </div>
                    <div
                        className="mt-8 border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 px-1 pt-0 sm:px-6">
                        <Link to="/login" className="cursor-pointer hover:text-sky-800">Back to login</Link>
                    </div>
                </>
                :
                <>
                    <div className="mb-0 p-6 pb-0">
                        <h4 className="font-bold text-2xl my-2">Choose new password</h4>
                        <p className="mb-0 text-gray-600">... and remember it 😜</p>
                    </div>
                    <div className="flex-auto p-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4 space-y-4">
                                <InputText
                                    name="newPassword"
                                    label="New password"
                                    type="password"
                                    register={register}
                                    registerOptions={{required: true, minLength: { value: 8, message: "Password must be at least 8 characters long."} }}
                                    error={errors}
                                    autoComplete="new-password"
                                />
                                <InputText
                                    name="newPasswordAgain"
                                    label="New password again"
                                    type="password"
                                    register={register}
                                    error={errors}
                                    registerOptions={{ required: true, validate: value => value === getValues("newPassword") || "Passwords does not match." }}
                                    autoComplete="new-password"
                                />
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
                                    <span>Set new password</span>
                                </ActionButton>
                            </div>
                        </form>
                    </div>
                    <div
                        className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 px-1 pt-0 text-center sm:px-6">
                        <Link to="/login" className="cursor-pointer hover:text-sky-800">Back to login</Link>
                    </div>
                </>
            }
        </>
    )


}
