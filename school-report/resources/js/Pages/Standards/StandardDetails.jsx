import StudentsTable from "@/Components/StudentsTable";
import SubjectsTable from "@/Components/SubjectsTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

const StandardDetails = ({ auth, standard }) => {
    const {
        data: subjectData,
        setData: setSubjectData,
        post: postSubject,
        progress: subjectProgress,
    } = useForm({
        title: "",
        standard_id: standard.id,
    });

    const { data, setData, progress, post, reset } = useForm({
        name: "",
        dob: "",
        standard_id: standard.id,
    });

    const createSubjectHandler = (e) => {
        e.preventDefault();

        postSubject("/subjects", {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess: () => setSubjectData("title", ""),
        });
    };

    const createStudentHandler = (e) => {
        e.preventDefault();

        post("/students", {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess: () => reset("name", "dob"),
        });
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="font-semibold text-xl text-gray-800 leading-tight">
                    {standard.title}{" "}
                    <span className="uppercase">{standard.section}</span>
                </div>
            }
        >
            <Head title={`${standard.title} ${standard.section}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex pb-4 justify-between">
                                <h2 className=" text-lg text-gray-700 font-semibold">
                                    Subjects
                                </h2>
                                <form
                                    onSubmit={createSubjectHandler}
                                    className="flex"
                                >
                                    <input
                                        value={subjectData.title}
                                        onChange={(e) =>
                                            setSubjectData(
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Subject name"
                                        type="text"
                                        className="px-2 py-1 text-sm border-none outline-none bg-gray-400 focus:ring-0 rounded-l-md"
                                    />
                                    <button
                                        disabled={subjectProgress}
                                        className="px-2 py-1 text-white leading-6 text-sm bg-gray-600 rounded-r-md"
                                    >
                                        Create
                                    </button>
                                </form>
                            </div>
                            {standard.subjects.length > 0 && (
                                <SubjectsTable subjects={standard.subjects} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex pb-4 justify-between">
                                <h2 className=" text-lg text-gray-700 font-semibold">
                                    Students
                                </h2>
                                <form
                                    onSubmit={createStudentHandler}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="flex flex-col">
                                        <label className="text-xs text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="Student name"
                                            type="text"
                                            className="px-2 py-1 text-sm border-none outline-none bg-gray-400 focus:ring-0 rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs text-gray-700">
                                            DOB
                                        </label>

                                        <input
                                            value={data.dob}
                                            onChange={(e) =>
                                                setData("dob", e.target.value)
                                            }
                                            placeholder="Subject name"
                                            type="date"
                                            className="px-2 py-1 text-sm border-none outline-none bg-gray-400 focus:ring-0 rounded"
                                        />
                                    </div>
                                    <button
                                        disabled={progress}
                                        className="px-2 py-1 text-white leading-6 text-sm bg-gray-600 rounded"
                                    >
                                        Create
                                    </button>
                                </form>
                            </div>

                            {standard.students.length > 0 && (
                                <StudentsTable students={standard.students} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default StandardDetails;
