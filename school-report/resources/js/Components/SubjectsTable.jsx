import React from "react";

const SubjectsTable = ({ subjects }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left  text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Subject
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.length > 0 &&
                        subjects.map((subject) => (
                            <tr key={subject.id} className="bg-white border-b">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900"
                                >
                                    {subject.title}
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

export default SubjectsTable;
