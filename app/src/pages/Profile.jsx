import {InputText} from "../components/Form/InputText";
import {useForm} from "react-hook-form";
import {ActionButton} from "../components/Controls/ActionButton";
import {useMutation, useQuery} from "@apollo/client";
import {ME} from "../graphql/queries/meQueries";
import {PageHeading} from "../components/Layout/PageHeading";
import {UPDATE_USER, CHANGE_PASSWORD} from "../graphql/mutations/userMutations";
import {useContext} from "react";
import AlertsContext from "../context/Alerts";

export function Profile() {

    const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: {isSubmitting: isSubmittingProfile} } = useForm();
    const {
        register: registerChangePassword,
        handleSubmit: handleSubmitChangePassword,
        formState: {
            isSubmitting: isSubmittingChangePassword,
            errors: errorsChangePassword
        },
        setError: setChangePasswordError,
        clearErrors: clearChangePasswordErrors,
        reset: resetChangePasswordForm,
        getValues
    } = useForm();

    const alerts = useContext(AlertsContext)
    const { data } = useQuery(ME);
    const [ updateUser ] = useMutation(UPDATE_USER, {
        update(cache, { data: { updateUser } }) {
            const { me } = cache.readQuery({query: ME});
            cache.writeQuery({
                query: ME,
                data: { me: {...me , name: updateUser.name} }
            });
        }
    });
    const [ changePassword, {error: errorChangePasswordMutation} ] = useMutation(CHANGE_PASSWORD);

    function submitEditProfile({name}) {
        return updateUser({ variables: { input: { name: name }}}).then(() => {
            alerts.success("Your name was changed.");
        });
    }

    function submitChangePassword({currentPassword, newPassword}) {
        return changePassword({ variables: { input: { currentPassword: currentPassword, newPassword: newPassword }}}).then((result) => {
            let data = result.data.changePassword;
            if (!data.success) {
                switch (data.code) {
                    case "INVALID_PASSWORD":
                        setChangePasswordError('currentPassword', { type: "custom", "message": "You entered wrong password." });
                        break;
                    default:
                        break;
                }
            } else {
                clearChangePasswordErrors();
                resetChangePasswordForm();
                alerts.success("Password changed successfully.");
            }
        });
    }

    return (
        <div className="container mx-auto max-w-7xl px-3">
            <PageHeading>Profile</PageHeading>
            <div className="sm:mx-6 grid grid-cols-4">
                <form onSubmit={handleSubmitProfile(submitEditProfile)} className="lg:col-span-1 sm:col-span-2 col-span-4">
                    <div className="py-4">
                        <InputText name="name" label="Full name" register={registerProfile} value={data?.me.name} />
                    </div>
                    <ActionButton className="px-6" disabled={isSubmittingProfile}>Save</ActionButton>
                </form>
            </div>
            <div className="sm:mx-6 mt-6 grid grid-cols-4">
                <form onSubmit={handleSubmitChangePassword(submitChangePassword)} className="grid gap-y-4 lg:col-span-1 sm:col-span-2 col-span-4">
                    <InputText
                        type="password"
                        name="currentPassword"
                        label="Current password"
                        register={registerChangePassword}
                        registerOptions={{required: {value: true, message: "Enter current password."}}}
                        error={errorsChangePassword}
                        autoComplete="new-password"
                    />
                    <InputText
                        type="password"
                        name="newPassword"
                        label="New password"
                        register={registerChangePassword}
                        registerOptions={{required: true, minLength: { value: 8, message: "Password must be at least 8 characters long."} }}
                        error={errorsChangePassword}
                    />
                    <InputText
                        type="password"
                        name="newPasswordAgain"
                        label="New password (again)"
                        register={registerChangePassword}
                        registerOptions={{ required: true, validate: value => value === getValues("newPassword") || "Passwords does not match." }}
                        error={errorsChangePassword}
                    />
                    {errorChangePasswordMutation && <div className="text-red-500">Something wrong happened.</div> }
                    <div>
                        <ActionButton className="px-6" disabled={isSubmittingChangePassword}>Change password</ActionButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
