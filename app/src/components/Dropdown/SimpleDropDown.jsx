import {Transition, Menu} from "@headlessui/react";
import {Fragment, Children} from "react";
import PropTypes from "prop-types";

export function SimpleDropDown({button, children, right}) {
    return (
        <div className="top-16 text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="ui-open:bg-gray-100 ui-open:dark:bg-gray-700 inline-flex w-full justify-center rounded-md px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {button}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className={(right ? "right-0" : "left-0") + " absolute z-10 min-w-[180px] bg-white dark:bg-sky-700 min-w-44 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}>
                        <div className="px-1 py-1">
                            {Children.toArray(children).map((child, i) => {
                                return (
                                    <Menu.Item key={i} className="flex w-full block px-4 py-2 lg:text-base text-lg my-0.5 hover:bg-blue-100/80 dark:hover:bg-blue-500 hover:rounded-md transition-background-color duration-250">{child}</Menu.Item>
                                )
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

SimpleDropDown.prototype = {
    button: PropTypes.element,
    right: PropTypes.bool
}

SimpleDropDown.defaultProps = {
    right: false
}