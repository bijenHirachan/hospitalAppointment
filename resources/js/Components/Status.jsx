import React from "react";

const Status = ({ value }) => {
    return (
        <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
                value === "available"
                    ? "bg-green-400 text-green-50"
                    : value === "booked"
                    ? "bg-indigo-400 text-indigo-50"
                    : "bg-red-400 text-red-50"
            }`}
        >
            {value === "available"
                ? "Available"
                : value === "booked"
                ? "Booked"
                : "Checked"}
        </span>
    );
};

export default Status;
