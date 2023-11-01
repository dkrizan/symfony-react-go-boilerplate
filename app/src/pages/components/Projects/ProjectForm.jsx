import PropTypes from "prop-types";
import {InputText} from "../../../components/Form/InputText";
import {useForm} from "react-hook-form";
import {ActionButton} from "../../../components/Controls/ActionButton";
import {TextArea} from "../../../components/Form/TextArea";

export function ProjectForm({submit}) {
    const { register, handleSubmit, formState } = useForm();
    const { isSubmitting } = formState;

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="my-5 grid gap-y-4">
                <InputText name="name" label="Name" register={register} />
                <TextArea name="description" label="Description" optional register={register} />
            </div>
            <ActionButton disabled={isSubmitting}>Create project</ActionButton>
        </form>
    );
}

ProjectForm.propTypes = {
    submit: PropTypes.func
}