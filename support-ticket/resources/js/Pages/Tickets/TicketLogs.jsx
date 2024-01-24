import Paginator from "@/Components/Paginator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const TicketLogs = ({
    auth,
    logs,
    searchQuery,
    searchUserQuery,
    searchTicketQuery,
}) => {
    const [page, setPage] = useState(logs.current_page || 1);
    const [search, setSearch] = useState(searchQuery || "");
    const [searchUser, setSearchUser] = useState(searchUserQuery || "");
    const [searchTicket, setSearchTicket] = useState(searchTicketQuery || "");

    const searchNow = () => {
        router.get(
            `/ticket-logs`,
            {
                search,
                user: searchUser,
                ticket: searchTicket,
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
        const searchHandler = setTimeout(() => searchNow(), 500);

        return () => clearTimeout(searchHandler);
    }, [search, searchUser, searchTicket]);

    useEffect(() => {
        const searchHandler = setTimeout(() => searchNow(), 500);

        return () => clearTimeout(searchHandler);
    }, [page]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ticket Logs" />

            <div className="w-full max-h-[90svh]  overflow-y-auto flex justify-center">
                <div className="py-16 w-full md:w-4/5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sky-500 font-semibold text-xl">
                            Ticket Logs
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row justify-between mb-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        />
                        <input
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                            placeholder="Search User..."
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        />
                        <input
                            value={searchTicket}
                            onChange={(e) => setSearchTicket(e.target.value)}
                            placeholder="Search Ticket..."
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        />
                    </div>
                    {logs.data.length > 0 ? (
                        <div className="overflow-x-auto bg-white p-4 rounded">
                            <div className="text-sm mb-2">
                                {logs.total} logs
                            </div>

                            <table className="table table-sm text-gray-600">
                                <thead className="text-gray-700">
                                    <tr>
                                        <th>Description</th>
                                        <th>Causer</th>
                                        <th>Ticket</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.data.map((log) => (
                                        <tr key={`log-${log.id}`}>
                                            <td>{log.description}</td>
                                            <td>
                                                <Link
                                                    href={`/users/${log.causer.id}/edit`}
                                                >
                                                    {log.causer.name}
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/tickets/${log.subject.id}`}
                                                >
                                                    {log.subject.title}
                                                </Link>
                                            </td>
                                            <td>
                                                <div className="text-xs">
                                                    {dayjs(
                                                        log.created_at
                                                    ).format("DD/MM/YYYY")}{" "}
                                                    on{" "}
                                                    {dayjs(
                                                        log.created_at
                                                    ).format("HH:mm")}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Paginator
                                page={page}
                                setPage={setPage}
                                currentPage={logs.current_page}
                                lastPage={logs.last_page}
                            />
                        </div>
                    ) : (
                        <div className="text-sky-500 my-16 text-center">
                            No Ticket Logs
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TicketLogs;
