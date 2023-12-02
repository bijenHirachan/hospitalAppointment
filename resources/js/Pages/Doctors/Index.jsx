import { Head } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Doctors = ({ auth, doctors }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Doctors
                </h2>
            }
        >
            <Head title="Doctors" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Department
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors?.length > 0 && (
                                            <>
                                                {doctors.map((doctor) => (
                                                    <tr
                                                        key={doctor.id}
                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    >
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {doctor.name}
                                                        </th>
                                                        <td className="px-6 py-4 flex items-center gap-2">
                                                            {doctor.email}
                                                        </td>
                                                        <td className="px-6 py-4 flex items-center gap-2">
                                                            {"adf"}
                                                        </td>
                                                        <td className="px-6 py-4 flex items-center gap-2">
                                                            <AiOutlineEdit
                                                                size={18}
                                                                className="text-green-700 cursor-pointer hover:text-green-500 transition-all delay-75"
                                                            />
                                                            <AiOutlineDelete
                                                                size={18}
                                                                className="text-red-700 cursor-pointer hover:text-red-500 transition-all delay-75"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Doctors;
