import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const TeachersIndex = ({ auth, teachers, searchString }) => {
    const [search, setSearch] = useState(searchString ?? "");

    const getTeachers = () => {
        router.get(
            "/teachers",
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
        const searchHandler = setTimeout(() => getTeachers(), 500);

        return () => clearTimeout(searchHandler);
    }, [search]);

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Teachers
                </h2>
            }
        >
            <Head title="Teachers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-200 overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between py-4">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search..."
                                className="border-none outline-none focus:ring-0 rounded search"
                            />
                            <Link
                                href={`/teachers/create`}
                                className="px-4 py-2 text-white leading-6 text-sm bg-gray-600 rounded-lg hover:bg-gray-800 transition-all delay-75"
                            >
                                Create Teacher
                            </Link>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Standard
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.length > 0 &&
                                        teachers.map((teacher) => (
                                            <tr
                                                key={teacher.id}
                                                className="bg-white border-b  "
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap"
                                                >
                                                    {teacher.name}
                                                </th>
                                                <td className="px-6 py-4 text-gray-700 ">
                                                    {teacher.email}
                                                </td>
                                                <td className="px-6 py-4 uppercase text-gray-700">
                                                    {teacher.standard ? (
                                                        <>
                                                            {" "}
                                                            {
                                                                teacher
                                                                    ?.standard
                                                                    ?.title
                                                            }{" "}
                                                            {
                                                                teacher
                                                                    ?.standard
                                                                    ?.section
                                                            }
                                                        </>
                                                    ) : (
                                                        "N/A"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 uppercase">
                                                    {!teacher.is_admin && (
                                                        <Link
                                                            href={`/teachers/${teacher.id}/edit`}
                                                            className="text-green-500 text-xs hover:underline transition-all delay-75"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default TeachersIndex;
