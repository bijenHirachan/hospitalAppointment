import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";

const TicketCard = ({ user, ticket }) => {
    return (
        <Link
            href={`/tickets/${ticket.id}`}
            className="col-span-12 sm:col-span-6  border border-sky-500 rounded shadow-md p-2"
        >
            <div className="flex items-center justify-between text-gray-600  text-[10px] leading-4">
                {user.role === "admin" ? (
                    <Link
                        className="hover:underline transition-all delay-75"
                        href={`/users/${ticket.user.id}/edit`}
                    >
                        {ticket.user.name}
                    </Link>
                ) : (
                    <span>{ticket.user.name}</span>
                )}
                <span className="">
                    {dayjs(ticket.created_at).format("DD/MM/YYYY")}
                </span>
            </div>
            <h3 className="text-sky-500 font-semibold leading-5">
                {ticket.title}
            </h3>
            <div className="flex gap-2 my-3">
                <h3
                    className={`text-xs border w-fit px-1 rounded ${
                        ticket.priority === "high"
                            ? "text-red-500 border-red-500"
                            : "text-green-500 border-green-500"
                    }`}
                >
                    {ticket.priority}
                </h3>
                <h3
                    className={`text-xs border w-fit px-1 rounded ${
                        ticket.status === "closed"
                            ? "text-red-500 border-red-500"
                            : "text-yellow-500 border-yellow-500"
                    }`}
                >
                    {ticket.status}
                </h3>
            </div>

            <div className="text-xs text-sky-500 my-1">
                {ticket.categories.length > 0 &&
                    ticket.categories.map((category, index) => (
                        <span className="" key={`category-${category.id}`}>
                            {category.name}
                            {ticket.categories.length > 1 &&
                            index !== ticket.categories.length - 1
                                ? ", "
                                : " "}
                        </span>
                    ))}
            </div>
            <div className="flex justify-end text-sm text-indigo-500">
                {ticket.assigned_to ? (
                    <div className="">
                        Assigned to{" "}
                        {user.role === "admin" ? (
                            <Link
                                className="hover:underline text-indigo-600 transition-all delay-75"
                                href={`/users/${ticket.assigned_to.id}/edit`}
                            >
                                {ticket.assigned_to.name}
                            </Link>
                        ) : (
                            <span>{ticket.assigned_to.name}</span>
                        )}
                    </div>
                ) : (
                    <span className="text-sm">Not Assigned</span>
                )}
            </div>
        </Link>
    );
};

export default TicketCard;
