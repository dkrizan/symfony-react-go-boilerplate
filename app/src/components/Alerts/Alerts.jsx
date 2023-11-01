import {useContext} from "react";
import AlertsContext, { States } from "../../context/Alerts";
import {CheckCircleIcon, ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { EventEmitter } from 'fbemitter';

const TYPES = {
    [States.SUCCESS]: { icon: CheckCircleIcon, border: "border-emerald-700/70", text: "text-slate-700", fill: "fill-emerald-700/70"},
    [States.ERROR]: { icon: ExclamationTriangleIcon, border: "border-rose-700", text: "text-rose-700", fill: "fill-rose-700"},
}

export function Alerts() {
    const context = useContext(AlertsContext);
    const type = TYPES[context.alert];

    Alerts.emmiter.addListener('success', (title) => {
        context.success(title);
    });
    Alerts.emmiter.addListener('error', (title) => {
        context.error(title);
    });

    return (
        <Transition
            as={Fragment}
            show={context.active}
            enter="transform transition duration-300"
            enterFrom="opacity-0 scale-[85%]"
            enterTo="opacity-100"
            leave="transform transition duration-300 ease-in-out"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-[85%]"
        >
        <div className="absolute top-[70px] right-[50%] max-w-[90%] translate-x-2/4 md:top-[75px] md:right-7 md:w-auto md:translate-x-0">
            {context.alert &&
                <div className={`relative ${type.border} border-l-4 flex w-full max-w-sm overflow-hidden rounded-lg border-r-2 border-t-2 border-b-2 drop-shadow-2xl`}>
                    <div className={`bg-white flex py-2 px-2 w-full`}>
                        <div className={"flex items-center justify-center"}>
                            <type.icon className={type.fill + " md:w-[32px] md:h-[32px] h-[20px] w-[20px]"} />
                        </div>

                        <div className="h-full flex items-center whitespace-nowrap text-lg font-medium">
                            <div className="sm:mx-3 mx-2">
                                <span className={type.text}>{context.text}</span>
                            </div>
                        </div>
                    </div>
                </div>
                }
        </div>
        </Transition>
    )
}
Alerts.emmiter = new EventEmitter();
Alerts.success = (title) => Alerts.emmiter.emit('success', title);
Alerts.error = (title) => Alerts.emmiter.emit('error', title);
