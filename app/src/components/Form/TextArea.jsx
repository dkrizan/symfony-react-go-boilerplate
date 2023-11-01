import PropTypes from "prop-types";
import {Label} from "./Label";

export function TextArea({name, optional, register, placeholder, label}) {
    return (
        <div className="grid gap-y-1">
            <Label optional={optional}>
                {label ?? name}
            </Label>
            <textarea
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                            rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-sky-600 focus:border-transparent"
                rows="3"
                cols="40"
                name={name}
                placeholder={placeholder}
                {...register(name)}
            >
            </textarea>
        </div>
    )
}

TextArea.prototype = {
    name: PropTypes.string,
    innerRef: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string
}