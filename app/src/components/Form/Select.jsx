import PropTypes from "prop-types";
import { ErrorMessage } from '@hookform/error-message';
import {Label} from "./Label";
import {default as TailwindSelect} from "react-tailwindcss-select";
import {useState} from "react";

export function Select({name, options, label, value, register, setValue, registerOptions, error}) {
    let selectOptions = [];
    options.forEach((item) => {
        selectOptions.push({label: item, value: item});
    });

    const [selected, setSelected] = useState({value: value});

    const handleChange = value => {
        setSelected(value);
        setValue(name, value.value);
    };

    return (
        <div className="space-y-1">
            <Label>
                {label ?? name}
            </Label>
            <div className={`${error?.[name] ? "ring-red-600/80 ring-2" : "focus-within:border-1 focus-within:border-sky-600"} 
                       rounded-lg appearance-none border border-gray-300 text-gray-700
                       w-full shadow-sm flex gap-x-2`}>
                <TailwindSelect
                    value={new Option(selected.value)}
                    classNames={{
                        menu: "absolute z-10 w-full bg-white shadow-lg border rounded-lg py-1 mt-1.5 text-sm text-gray-700",
                        menuButton: () => "flex pl-2 py-0.5 [&>div]:py-1.5 items-center focus:outline-none",
                        listItem: ({ isSelected }) => (
                            `block transition duration-200 px-2 py-2 cursor-pointer select-none text-base rounded ${
                                isSelected
                                    ? `text-white bg-blue-500`
                                    : `text-gray-500 hover:bg-blue-100/80 hover:text-blue-500`
                            }`
                        )
                    }}
                    options={selectOptions}
                    onChange={handleChange}
                    isSearchable={true}
                />
                <select className="hidden" {...register(name, registerOptions)}>
                    {selectOptions.map((item) => {
                        return <option key={item.label} value={item.value}>{item.label}</option>;
                    })}
                </select>
            </div>
            {error && <ErrorMessage errors={error} name={name} render={({ message }) => <p className="text-red-700 text-sm">{message}</p>}/>}
        </div>
    )
}

Select.prototype = {
    name: PropTypes.string,
    options: PropTypes.array,
    label: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.object
}