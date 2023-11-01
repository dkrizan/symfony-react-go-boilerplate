import PropTypes from "prop-types";
import { ErrorMessage } from '@hookform/error-message';
import {Label} from "./Label";

export function InputText({type, name, register, placeholder, label, value, autoComplete, registerOptions, error, units}) {
    return (
        <div className="space-y-1">
            <Label>
                {label ?? name}
            </Label>
            <div className={`${error?.[name] ? "ring-red-600/80 ring-2" : "focus-within:border-1 focus-within:border-sky-600"} 
                       rounded-lg appearance-none border border-gray-300
                       shadow-sm flex`}>
                <input type={type}
                       name={name}
                       className={`
                       text-gray-700 placeholder-gray-400 text-base focus:outline-none rounded-lg flex-1 py-2 px-4
                    focus:border-transparent block min-w-0`}
                       placeholder={placeholder}
                       defaultValue={value || ''}
                       autoComplete={autoComplete}
                       {...register(name, registerOptions )}
                />
                {units && <span className="text-gray-500 text-right flex mr-2 items-center flex-shrink">{units}</span>}
            </div>
            {error && <ErrorMessage errors={error} name={name} render={({ message }) => <p className="text-red-700 text-sm">{message}</p>}/>}
        </div>
    )
}

InputText.prototype = {
    type: PropTypes.string,
    name: PropTypes.string,
    innerRef: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    autoComplete: PropTypes.string,
    error: PropTypes.object
}
InputText.defaultProps = {
    type: "text"
}