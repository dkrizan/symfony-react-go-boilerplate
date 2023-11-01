import React, { useState } from 'react';

export const States = {
    SUCCESS: 'success',
    ERROR: 'error',
};

const AlertsContext = React.createContext({
    alert: null,
    text: null,
    active: false,
    success: () => {},
    error: () => {}
});
AlertsContext.displayName = 'AlertContext';

const AlertsProvider = (props) => {
    const [alert, setAlert] = useState(null);
    const [text, setText] = useState(null);
    const [active, setActive] = useState(false)
    const success = (text, duration) => {
        duration = duration * 1000 || 3000;
        setText(text);
        setAlert(States.SUCCESS);
        setActive(true);
        setTimeout(() => {
            setActive(false);
        }, duration);
        setTimeout(() => {
            clear();
        }, duration + 500)
    };
    const error = (text, duration) => {
        duration = duration * 1000 || 3000;
        setText(text);
        setAlert(States.ERROR);
        setActive(true);
        setTimeout(() => {
            setActive(false);
        }, duration);
        setTimeout(() => {
            clear();
        }, duration + 500)
    };
    const clear = () => {
        setText(null);
        setAlert(null);
    };
    return (
        <AlertsContext.Provider
            value={{
                success, error, clear, alert, text, active
            }}
        >
            {props.children}
        </AlertsContext.Provider>
    );
};

export { AlertsProvider }
export default AlertsContext;