import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const StudentDetail = ({ auth, student }) => {
    const [marks, setMarks] = useState([]);

    const findScore = (subject) => {
        let score = "";

        student.scores.forEach((sc) => {
            if (sc?.subject_id === subject.id) {
                score = sc.marks;
            }
        });

        return score;
    };

    useEffect(() => {
        setMarks(() =>
            student.standard.subjects.map((subject) => {
                return {
                    subjectId: subject.id,
                    title: subject.title,
                    score: findScore(subject),
                };
            })
        );
    }, []);

    const updateScore = () => {
        router.post("/scores", {
            marks,
            student: student.id,
        });
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="font-semibold text-xl text-gray-800 leading-tight">
                    {student.name}
                </div>
            }
        >
            <Head title={student.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col pb-4 justify-between">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Subject
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Marks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {marks.length > 0 &&
                                                marks.map((subject, index) => (
                                                    <tr
                                                        key={index}
                                                        className="bg-white border-b"
                                                    >
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900"
                                                        >
                                                            {subject.title}
                                                        </th>

                                                        <td className="px-6 py-4">
                                                            <input
                                                                value={
                                                                    marks[index]
                                                                        .score
                                                                }
                                                                onChange={(e) =>
                                                                    setMarks(
                                                                        (
                                                                            state
                                                                        ) =>
                                                                            state.map(
                                                                                (
                                                                                    m,
                                                                                    i
                                                                                ) =>
                                                                                    i ===
                                                                                    index
                                                                                        ? {
                                                                                              subjectId:
                                                                                                  marks[
                                                                                                      index
                                                                                                  ]
                                                                                                      .subjectId,
                                                                                              title: marks[
                                                                                                  index
                                                                                              ]
                                                                                                  .title,
                                                                                              score: e
                                                                                                  .target
                                                                                                  .value,
                                                                                          }
                                                                                        : m
                                                                            )
                                                                    )
                                                                }
                                                                type="number"
                                                                min="1"
                                                                max="100"
                                                                className="rounded h-8 text-sm text-gray-700"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="py-2 flex justify-end">
                                    <button
                                        onClick={updateScore}
                                        className="px-2 py-1 text-white leading-6 text-sm bg-gray-600 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default StudentDetail;
