import Paginator from "@/Components/Paginator";
import ReservationsTable from "@/Components/ReservationsTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const Reservations = ({ auth, schedule, reservations, searchString }) => {
    const [page, setPage] = useState(reservations?.current_page || 1);

    const [search, setSearch] = useState(searchString || "");

    const searchNow = () => {
        router.get(
            `/schedules/${schedule.id}`,
            {
                page,
                search,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    useEffect(() => {
        const handlePaginate = setTimeout(() => searchNow(), 500);

        return () => {
            clearTimeout(handlePaginate);
        };
    }, [page]);

    useEffect(() => {
        setPage(1);
        const handleSearch = setTimeout(() => searchNow(), 500);

        return () => {
            clearTimeout(handleSearch);
        };
    }, [search]);

    return (
        <Authenticated
            user={auth?.user}
            header={
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-600">
                        Datum {dayjs(schedule?.day?.day).format("DD/MM/YYYY")}
                    </h3>
                    <p className="text-sm text-gray-600">
                        Tijdslot {schedule?.start_time} - {schedule?.end_time}
                    </p>
                </div>
            }
        >
            <Head title={`${schedule?.start_time} - ${schedule?.end_time}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-end mb-4">
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="rounded border border-gray-400 outline-none focus:ring-0"
                                />
                            </div>
                            {reservations?.data?.length > 0 ? (
                                <>
                                    <ReservationsTable
                                        reservations={reservations?.data}
                                    />
                                    <Paginator
                                        page={page}
                                        currentPage={reservations?.current_page}
                                        lastPage={reservations?.last_page}
                                        setPage={setPage}
                                        total={reservations?.total}
                                    />
                                </>
                            ) : (
                                <p className="text-center my-8 text-lg tracking-wide text-gray-600">
                                    No reservations found!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Reservations;
