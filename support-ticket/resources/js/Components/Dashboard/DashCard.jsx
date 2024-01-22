import React from "react";

const DashCard = ({ title, icon, number }) => {
    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-4 items-center border-2 rounded p-6 shadow border-sky-500">
            <h4 className="text-sky-500 font-semibold">{title}</h4>
            <div className="text-sky-500 font-semibold text-3xl">{icon}</div>
            <p className="text-3xl text-sky-500">{number}</p>
        </div>
    );
};

export default DashCard;
