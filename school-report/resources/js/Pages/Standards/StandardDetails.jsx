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

            {auth.user.is_admin === 1 && (
                <div className="pt-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h2 className="text-lg mb-2 text-gray-700 font-semibold">
                                    Subjects
                                </h2>
                                <div className="grid grid-cols-12 gap-3">
                                    <form
                                        onSubmit={createSubjectHandler}
                                        className="col-span-12 sm:col-span-4 flex flex-col gap-4 bg-gray-300 h-fit rounded-md p-4"
                                    >
                                        <div className="flex flex-col">
                                            <label className="text-xs text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                value={subjectData.title}
                                                onChange={(e) =>
                                                    setSubjectData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Subject title"
                                                type="text"
                                                className="px-2 py-1 text-sm border-none outline-none bg-whitefocus:ring-0 rounded"
                                            />
                                        </div>

                                        <button
                                            disabled={subjectProgress}
                                            className="px-2 py-1 text-white leading-6 text-sm bg-gray-600 rounded hover:bg-gray-800 transition-all delay-75"
                                        >
                                            Create
                                        </button>
                                    </form>

                                    {standard.subjects.length > 0 && (
                                        <div className="col-span-12 sm:col-span-8">
                                            <SubjectsTable
                                                subjects={standard.subjects}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg mb-2 text-gray-700 font-semibold">
                                Students
                            </h2>
                            <div className="grid grid-cols-12 gap-3">
                                <form
                                    onSubmit={createStudentHandler}
                                    className="col-span-12 sm:col-span-4 flex flex-col gap-4 bg-gray-300 h-fit rounded-md p-4"
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
                                            className="px-2 py-1 text-sm border-none outline-none bg-whitefocus:ring-0 rounded"
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
                                            type="date"
                                            className="px-2 py-1 text-sm border-none outline-none bg-white focus:ring-0 rounded"
                                        />
                                    </div>
                                    <button
                                        disabled={progress}
                                        className="px-2 py-1 text-white leading-6 text-sm bg-gray-600 rounded hover:bg-gray-800 transition-all delay-75"
                                    >
                                        Create
                                    </button>
                                </form>

                                {standard.students.length > 0 && (
                                    <div className="col-span-12 sm:col-span-8">
                                        <StudentsTable
                                            students={standard.students}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default StandardDetails;
