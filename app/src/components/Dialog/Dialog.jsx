import {Fragment} from "react";
import {Dialog as UiDialog, Transition} from "@headlessui/react";

export function Dialog({title, isOpen: opened, setIsOpen: setOpened, children}) {

    function close() {
        setOpened(false);
    }

    return (
        <Transition appear show={opened} as={Fragment}>
            <UiDialog as="div" className="relative z-20" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <UiDialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <UiDialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {title}
                                </UiDialog.Title>
                                {children}
                            </UiDialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </UiDialog>
        </Transition>
    )
}