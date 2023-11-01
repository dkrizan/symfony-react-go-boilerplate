import PropTypes from "prop-types";

export function ActionButton({action: onClick, className, disabled, children}) {
    return (
      <button className={`${className} py-3 px-4 cursor-pointer inline-block rounded-xl outline-none shadow-lg transition-colors
                      text-sm font-bold text-white
                      bg-blue-700/80 hover:bg-blue-900/80 dark:bg-sky-600/70 dark:hover:bg-sky-600 disabled:opacity-50`}
            onClick={onClick} disabled={disabled}>
          { children }
      </button>
    );
}

ActionButton.propTypes = {
    action: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.any
}
