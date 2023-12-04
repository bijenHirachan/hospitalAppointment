import React from "react";

const Button = ({ children }) => {
    return (
        <div className="border border-gray-500 px-2 py-1 text-gray-500 rounded-md text-sm hover:text-gray-600 hover:border-gray-600 transition-all delay-75 w-fit">
            {children}
        </div>
    );
};

export default Button;
