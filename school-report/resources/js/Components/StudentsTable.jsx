import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const StudentsTable = ({ students }) => {
    const [showModal, setShowModal] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const studentHandler = (student) => {
        setSelectedStudent(student);

        setShowModal(true);
    };

    const deleteStudent = () => {
        setShowModal(false);

        router.delete(`/students/${selectedStudent?.id}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess: () => {
                toast.success("Student deleted successfully!");
            },
        });

        setSelectedStudent(null);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Modal
                maxWidth="md"
                show={showModal}
                closeable
                onClose={() => {
                    setShowModal(false);
                    setSelectedStudent(null);
                }}
            >
                <div className="p-3">
                    {selectedStudent && (
                        <p className="text-gray-600 text-sm tracking-wide leading-6">
                            Are you sure you want to delete{" "}
                            {selectedStudent?.name} ?
                        </p>
                    )}

                    <div className="flex justify-end pt-2 gap-2">
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setSelectedStudent(null);
                            }}
                            className="border px-1 border-green-500 text-sm text-green-500 tracking-wide rounded leading-6 hover:border-green-700 hover:text-green-700 transition-all delay-75"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteStudent}
                            className="border px-1 border-red-500 text-sm text-red-500 tracking-wide rounded leading-6 hover:border-red-700 hover:text-red-700 transition-all delay-75"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>

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
                                    {dayjs(student.dob).format("DD/MM/YYYY")}
                                </th>

                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => studentHandler(student)}
                                        className="font-medium text-red-500 hover:underline transition-all delay-75"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsTable;
