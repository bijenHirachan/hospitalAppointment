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
                                        className="bg-sky-200 p-4 col-span-6 sm:col-span-3 rounded shadow"
                                    >
                                        <div className="text-sm text-gray-600">
                                            Standard{" "}
                                            <span className="font-bold">
                                                {standard.title}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Section{" "}
                                            <span className="uppercase font-bold">
                                                {standard.section}
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
