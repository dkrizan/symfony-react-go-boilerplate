import {Switch} from "@headlessui/react";
import {useState} from "react";

export function Checkbox() {
    const [active, setActive] = useState(false);
    return (
        <Switch
            checked={active}
            onChange={setActive}
            className={`${active ? 'bg-sky-600' : 'bg-gray-200'}
                inline-flex h-[21px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 
                ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span aria-hidden="true"
                className={`${active ? 'translate-x-4' : 'translate-x-0'} pointer-events-none inline-block 
                h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )
}