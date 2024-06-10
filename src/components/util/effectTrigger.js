import React, { useEffect, useRef } from 'react';

const EffectTrigger = () => {
    const inputsRef = useRef([]);

    useEffect(() => {
        // Clear the input values when the component is loaded
        inputsRef.current.forEach(input => input.value = "");

        // Add the focusout event listener
        const handleFocusOut = (event) => {
            if (event.target.value !== "") {
                event.target.classList.add("has-content");
            } else {
                event.target.classList.remove("has-content");
            }
        };

        inputsRef.current.forEach(input => {
            input.addEventListener('focusout', handleFocusOut);
        });

        // Cleanup function to remove event listeners
        return () => {
            inputsRef.current.forEach(input => {
                input.removeEventListener('focusout', handleFocusOut);
            });
        };
    }, []);

    return (
        <div >
        </div>
    );
};

export default EffectTrigger;