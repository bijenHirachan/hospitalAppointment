import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const CreateTeacher = ({ auth, standards, errors }) => {
    const { data, setData, post, progress } = useForm({
        name: "",
        email: "",
        standard: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        post("/teachers");
    };
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Teacher
                </h2>
            }
        >
            <Head title="Create Teacher" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <form
                            onSubmit={submitHandler}
                            className="max-w-sm mx-auto"
                        >
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="John Doe"
                                    required
                                />
                                <span className="text-xs text-red-500">
                                    {errors.name}
                                </span>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="email@example.com"
                                    required
                                />
                                <span className="text-xs text-red-500">
                                    {errors.email}
                                </span>
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="dob"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Standard
                                </label>
                                <select
                                    id="standard"
                                    value={data.standard}
                                    onChange={(e) =>
                                        setData("standard", e.target.value)
                                    }
                                    className="bg-gray-50 uppercase border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="">Select Standard</option>
                                    {standards.length > 0 &&
                                        standards.map((stand) => (
                                            <option
                                                key={stand.id}
                                                value={stand.id}
                                                className="uppercase"
                                            >
                                                {stand.title} {stand.section}
                                            </option>
                                        ))}
                                </select>
                                <span className="text-xs text-red-500">
                                    {errors.standard}
                                </span>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    disabled={progress}
                                    type="submit"
                                    className="px-4 py-2 text-white leading-6 text-sm bg-gray-600 rounded-lg hover:bg-gray-800 transition-all delay-75"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default CreateTeacher;
