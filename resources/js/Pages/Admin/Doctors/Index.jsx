import { Link } from "@inertiajs/react";
import React from "react";
import Button from "@/Components/Button";
import Background from "@/Components/Background";

const Doctors = ({ auth, doctors }) => {
    return (
        <Background user={auth.user} title={"Doctors"}>
            <div className="relative overflow-x-auto py-2">
                {auth.user.role === "admin" && (
                    <div className="flex justify-end pb-2">
                        <Link href={route("doctors.create")}>
                            <Button>Add Doctor</Button>
                        </Link>
                    </div>
                )}

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Avatar
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
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
                                            scope="col"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <Link
                                                href={`/doctors/${doctor.id}`}
                                            >
                                                {doctor.user.name}
                                            </Link>
                                        </th>
                                        <td className="px-6 py-4">
                                            {doctor.image_url ? (
                                                <img
                                                    className="h-8 w-8 object-cover object-top rounded-full"
                                                    src={`/storage/${doctor.image_url}`}
                                                />
                                            ) : (
                                                <img
                                                    className="h-8 w-8 object-cover object-top rounded-full"
                                                    src="/assets/avatar.jpeg"
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {doctor.user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {doctor.department.name}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </Background>
    );
};

export default Doctors;
