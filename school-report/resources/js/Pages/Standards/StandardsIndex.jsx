import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const StandardsIndex = ({ auth, standards }) => {
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 grid grid-cols-12 gap-4">
                            {standards.length > 0 &&
                                standards.map((standard) => (
                                    <Link
                                        key={standard.id}
                                        href={`/standards/${standard.id}`}
                                        className="bg-sky-200 p-4 col-span-12 sm:col-span-6 md:col-span-4 rounded shadow  leading-6 tracking-wide"
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
