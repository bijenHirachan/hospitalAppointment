import React, { useState } from "react";
import Modal from "./Modal";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

const SubjectsTable = ({ subjects }) => {
    const [showModal, setShowModal] = useState(false);

    const [selectedSubject, setSelectedSubject] = useState(null);

    const subjectHandler = (subject) => {
        setSelectedSubject(subject);

        setShowModal(true);
    };

    const deleteSubject = () => {
        setShowModal(false);

        router.delete(`/subjects/${selectedSubject?.id}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess: () => {
                toast.success("Subject deleted successfully!");
            },
        });

        setSelectedSubject(null);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Modal
                maxWidth="md"
                show={showModal}
                closeable
                onClose={() => {
                    setShowModal(false);
                    setSelectedSubject(null);
                }}
            >
                <div className="p-3">
                    {selectedSubject && (
                        <p className="text-gray-600 text-sm tracking-wide leading-6">
                            Are you sure you want to delete{" "}
                            {selectedSubject?.title} ?
                        </p>
                    )}

                    <div className="flex justify-end pt-2 gap-2">
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setSelectedSubject(null);
                            }}
                            className="border px-1 border-green-500 text-sm text-green-500 tracking-wide rounded leading-6 hover:border-green-700 hover:text-green-700 transition-all delay-75"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteSubject}
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
                                    <span
                                        onClick={() => subjectHandler(subject)}
                                        className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubjectsTable;
