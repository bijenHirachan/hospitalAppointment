import Paginator from "@/Components/Paginator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const LabelsIndex = ({ auth, labels, searchQuery }) => {
    const [label, setLabel] = useState("");

    const [search, setSearch] = useState(searchQuery || "");

    const [page, setPage] = useState(labels.current_page || 1);

    const submitHandler = (e) => {
        e.preventDefault();

        router.post(
            `/labels`,
            {
                label,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );

        setLabel("");
    };

    const searchNow = () => {
        router.get(
            `/labels`,
            {
                search,
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
        const handleSearch = setTimeout(() => searchNow(), 500);

        return () => {
            clearTimeout(handleSearch);
        };
    }, [search]);

    useEffect(() => {
        const handleSearch = setTimeout(() => searchNow(), 500);

        return () => {
            clearTimeout(handleSearch);
        };
    }, [page]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Labels" />

            <div className="w-full max-h-[90svh]  overflow-y-auto flex justify-center">
                <div className="py-16 w-full md:w-4/5 xl:w-2/5">
                    <h2 className="text-sky-500 font-semibold text-xl mb-4">
                        Labels
                    </h2>
                    <div className="flex flex-col gap-2 sm:flex-row justify-between mb-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            placeholder="Search..."
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        />
                        <form onSubmit={submitHandler} className="flex">
                            <input
                                required
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                placeholder="Label name..."
                                className="border-none w-full text-sky-500 focus:ring-0 rounded-l bg-white text-xs"
                            />
                            <button
                                type="submit"
                                className="p-1 bg-sky-500  text-sky-50 uppercase text-sm font-semibold rounded-r hover:bg-sky-600 transition-all delay-75"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                    <div className="overflow-x-auto bg-white p-4 rounded">
                        {labels.data.length > 0 ? (
                            <>
                                <div className="text-sm mb-2">
                                    {labels.total} labels
                                </div>
                                <table className="table table-sm text-gray-600">
                                    <thead className="text-gray-700">
                                        <tr>
                                            <th>Label</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {labels.data.map((label) => (
                                            <tr key={`label-${label.id}`}>
                                                <td>{label.name}</td>
                                                <td>
                                                    <Link
                                                        href={`/labels/${label.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="text-xs text-red-500 font-semibold hover:text-red-600 transition-all delay-75"
                                                    >
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Paginator
                                    page={page}
                                    setPage={setPage}
                                    currentPage={labels.current_page}
                                    lastPage={labels.last_page}
                                />
                            </>
                        ) : (
                            <div className="text-sky-500 my-16 text-center">
                                No Labels Found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default LabelsIndex;
