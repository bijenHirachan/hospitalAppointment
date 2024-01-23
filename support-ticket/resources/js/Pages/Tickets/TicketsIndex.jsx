import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Paginator from "@/Components/Paginator";
import TicketCard from "@/Components/Tickets/TicketCard";

const TicketsIndex = ({
    auth,
    tickets,
    statuses,
    priorities,
    categories,
    statusQuery,
    priorityQuery,
    categoryQuery,
}) => {
    const [selectedStatus, setSelectedStatus] = useState(statusQuery || "");
    const [selectedPriority, setSelectedPriority] = useState(
        priorityQuery || ""
    );
    const [selectedCategory, setSelectedCategory] = useState(
        categoryQuery || ""
    );

    const [page, setPage] = useState(tickets.current_page);

    const handleChange = () => {
        router.get(
            `/tickets`,
            {
                status: selectedStatus,
                priority: selectedPriority,
                category: selectedCategory,
                page,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    useEffect(() => {
        setPage(1);
        const queryHandler = setTimeout(() => handleChange(), 500);

        return () => {
            clearTimeout(queryHandler);
        };
    }, [selectedStatus, selectedPriority, selectedCategory]);

    useEffect(() => {
        const queryHandler = setTimeout(() => handleChange(), 500);

        return () => {
            clearTimeout(queryHandler);
        };
    }, [page]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tickets" />

            <div className="w-full max-h-[90svh] overflow-y-auto flex justify-center">
                <div className="py-16 w-full md:w-4/5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sky-500 font-semibold text-xl">
                            Tickets
                        </h2>
                        <Link
                            href="/tickets/create"
                            className="p-2 bg-sky-500  text-sky-50 uppercase text-sm font-semibold rounded-md hover:bg-sky-600 transition-all delay-75"
                        >
                            Create Ticket
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row justify-between mb-4">
                        <select
                            name="status"
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            value={selectedStatus}
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        >
                            <option value="">All Statuses</option>
                            {statuses.length > 0 &&
                                statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                        </select>

                        <select
                            name="priority"
                            onChange={(e) =>
                                setSelectedPriority(e.target.value)
                            }
                            value={selectedPriority}
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        >
                            <option value={""}>All Priorities</option>
                            {priorities.length > 0 &&
                                priorities.map((priority) => (
                                    <option key={priority} value={priority}>
                                        {priority}
                                    </option>
                                ))}
                        </select>

                        <select
                            name="category"
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            value={selectedCategory}
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        >
                            <option value={""}>All Categories</option>
                            {categories.length > 0 &&
                                categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {tickets.data.length > 0 ? (
                        <div className="overflow-x-auto bg-white p-4 rounded">
                            <div className="text-sm mb-2">
                                {tickets.total} tickets
                            </div>
                            <div className="w-full grid grid-cols-12 gap-3">
                                {tickets.data.map((ticket) => (
                                    <TicketCard
                                        key={ticket.id}
                                        ticket={ticket}
                                        user={auth.user}
                                    />
                                ))}
                            </div>
                            <Paginator
                                page={page}
                                setPage={setPage}
                                currentPage={tickets.current_page}
                                lastPage={tickets.last_page}
                            />
                        </div>
                    ) : (
                        <div className="text-sky-500 my-16 text-center">
                            No Tickets Found
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TicketsIndex;
