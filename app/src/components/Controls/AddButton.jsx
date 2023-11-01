import PropTypes from "prop-types";
import {PlusIcon} from "@heroicons/react/24/solid";

export function AddButton({action: onClick, className, disabled, children}) {
    return (
      <button className={`${className} flex items-center gap-x-2 py-3 px-4 cursor-pointer inline-block rounded-xl outline-none shadow-lg transition-colors
                      text-sm font-bold text-white
                      bg-blue-700/80 hover:bg-blue-900/80 dark:bg-sky-600/70 dark:hover:bg-sky-600 disabled:opacity-50`}
            onClick={onClick} disabled={disabled}>
            <PlusIcon height={20} width={20} />
          { children }
      </button>
    );
}

AddButton.propTypes = {
    action: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.any
}
