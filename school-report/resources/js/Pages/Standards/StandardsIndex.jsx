import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const StandardsIndex = ({ auth, standards, searchString }) => {
    const [search, setSearch] = useState(searchString ?? "");

    const getStandards = () => {
        router.get(
            `/standards`,
            {
                search,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };

    useEffect(() => {
        const searchHandler = setTimeout(() => getStandards(), 500);

        return () => clearTimeout(searchHandler);
    }, [search]);

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Standards
                </h2>
            }
        >
            <Head title="Standards" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-end pt-6 px-6">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="border-none outline-none focus:ring-0 rounded"
                                placeholder="Search..."
                            />
                        </div>
                        <div className="p-6 text-gray-900 grid grid-cols-12 gap-4">
                            {standards.length > 0 &&
                                standards.map((standard) => (
                                    <Link
                                        key={standard.id}
                                        href={`/standards/${standard.id}`}
                                        className="bg-white p-4 col-span-12 sm:col-span-6 md:col-span-4 rounded shadow  leading-6 tracking-wide"
                                    >
                                        <div className="text-sm text-gray-600 grid grid-cols-12">
                                            <span className="p-1 col-span-7 border-t border-l border-gray-500">
                                                Standard
                                            </span>
                                            <span className="p-1 uppercase font-bold col-span-5 border-t border-l border-r  border-gray-500">
                                                {standard.title}{" "}
                                                {standard.section}
                                            </span>
                                        </div>

                                        <div className="text-sm text-gray-600 grid grid-cols-12">
                                            <span className="p-1 col-span-7 border-t border-l border-gray-500">
                                                No of students
                                            </span>
                                            <span className="p-1 uppercase font-bold col-span-5 border-t border-l border-r  border-gray-500">
                                                {standard.students.length}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 grid grid-cols-12">
                                            <span className="p-1 col-span-7 border-t border-l border-gray-500">
                                                No of subjects
                                            </span>
                                            <span className="p-1 uppercase font-bold col-span-5 border-t border-l border-r  border-gray-500">
                                                {standard.subjects.length}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 grid grid-cols-12">
                                            <span className="p-1 col-span-7 border-t border-l border-b border-gray-500">
                                                Teacher
                                            </span>
                                            <span className="p-1 uppercase font-bold col-span-5 border border-gray-500">
                                                {standard.user
                                                    ? standard.user?.name
                                                    : "N/A"}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default StandardsIndex;
