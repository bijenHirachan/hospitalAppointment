import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const TeachersIndex = ({ auth, teachers }) => {
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-end py-4">
                            <Link
                                href={`/teachers/create`}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
