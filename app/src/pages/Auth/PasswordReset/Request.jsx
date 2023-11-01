import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";

import {ActionButton} from "../../../components/Controls/ActionButton";
import {InputText} from "../../../components/Form/InputText";
import {useMutation} from "@apollo/client";
import {REQUEST_PASSWORD_RESET} from "../../../graphql/public/resetPassword";
import {useState} from "react";

export { Request };

function Request() {
    const [success, setSuccess] = useState(false);
    const {register, handleSubmit, getValues, setError, formState: { isSubmitting, errors }} = useForm();
    const [requestResetPassword ] = useMutation(REQUEST_PASSWORD_RESET);

    function onSubmit({ email }) {
        return requestResetPassword({variables: { email }}).then(({data, errors}) => {
            if (data.requestPasswordReset.success) {
                setSuccess(true);
            } else {
                setError('email',  { type: "custom", "message": data.requestPasswordReset.message })
            }
        });
    }

    return (
        success
            ?   <div className="mb-0 p-6">
                    <h4 className="font-bold text-2xl my-2">Check your inbox</h4>
                    <p className="mb-0 text-gray-600">An email with link to reset password has been sent to the <span className="font-semibold">{getValues("email")}</span>.</p>
                </div>
            :
                <>
                    <div className="mb-0 p-6 pb-0">
                        <h4 className="font-bold text-2xl my-2">Reset password</h4>
                        <p className="mb-0 text-gray-600">Enter the email associated with your account to receive a password reset link.</p>
                    </div>
                    <div className="flex-auto p-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <InputText name="email" label="Email" type="email" placeholder="name@example.com" register={register} error={errors} />
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
                                    <span>Send password reset link</span>
                                </ActionButton>
                            </div>
                        </form>
                    </div>
                    <div
                        className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 px-1 pt-0 text-center sm:px-6">
                        <Link to="/login" className="cursor-pointer hover:text-sky-800">Back to login</Link>
                    </div>
                </>
    )

}
