import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import DaysTable from "@/Components/DaysTable";
import Paginator from "@/Components/Paginator";
const DayIndex = ({ auth, days, searchString }) => {
    const [page, setPage] = useState(days?.current_page || 1);

    const [search, setSearch] = useState(searchString || "");

    const searchNow = () => {
        router.get(
            "/days",
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
        const handlePage = setTimeout(() => searchNow(), 500);

        return () => {
            clearTimeout(handlePage);
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
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Datums
                </h2>
            }
        >
            <Head title="Datums" />

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

                            {days?.data.length > 0 ? (
                                <>
                                    <DaysTable days={days?.data} />

                                    <Paginator
                                        page={page}
                                        setPage={setPage}
                                        currentPage={days?.current_page}
                                        itemName={"days"}
                                        total={days?.total}
                                        lastPage={days?.last_page}
                                    />
                                </>
                            ) : (
                                <p className="text-center my-8 text-lg tracking-wide text-gray-600">
                                    No days found!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default DayIndex;
