import { Link } from "@inertiajs/react";
import React from "react";

const StudentsTable = ({ students }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left  text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            DOB
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 &&
                        students.map((student) => (
                            <tr key={student.id} className="bg-white border-b">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900"
                                >
                                    <Link href={`/students/${student.id}`}>
                                        {student.name}
                                    </Link>
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900"
                                >
                                    {student.dob}
                                </th>

                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsTable;
