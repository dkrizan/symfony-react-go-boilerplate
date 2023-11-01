import { Menu, Transition } from '@headlessui/react'
import {Link} from "react-router-dom";

export function AvatarMenu({character: char, menu: links, name, email}) {

    return (
        <Menu as="div" className="relative z-10 inline-block text-left flex items-center text-gray-700">
            <Menu.Button>
                <div className="cursor-pointer flex align-center justify-center items-center w-9 h-9 overflow-hidden bg-blue-300/40
                                        rounded-lg hover:bg-blue-300/60 dark:bg-blue-700 dark:hover:bg-blue-800">
                    <div className="text-md leading-8 font-bold text-sky-700 dark:text-slate-100">{char}</div>
                </div>
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
            <Menu.Items>
                <div
                    className="absolute top-12 right-0 text-md origin-top-right rounded-lg bg-white shadow-2xl
                                ring-1 ring-black ring-opacity-5 outline-none px-4 py-2
                                lg:w-auto w-[calc(100vw_-_30px)]"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="border-b px-3 py-4 pb-5 mb-2">
                        <div className="font-medium text-xl">{name}</div>
                        <div className="text-sm text-gray-600">{email}</div>
                    </div>
                    <div role="none">
                        {links.map((item, index) => (
                            <div key={index}>
                                <div>
                                    {(index > 0 && item.level > links[index-1].level) && <div className="dropdown-divider border-t my-1.5"></div>}
                                    <Menu.Item as={Link} to={item.href} onClick={item.onClick}
                                          className="flex block py-2 lg:text-base text-lg my-0.5 hover:bg-blue-100/80 hover:rounded-md transition-background-color duration-250 min-w-[140px] lg:min-w-[200px] hover:text-gray-900">
                                        <div className="pl-3 pr-4 whitespace-nowrap font-normal">{item.label}</div>
                                    </Menu.Item>
                                </div>
                            </div >
                        ))}
                    </div>
                </div>

            </Menu.Items>
            </Transition>
        </Menu>
    )
}