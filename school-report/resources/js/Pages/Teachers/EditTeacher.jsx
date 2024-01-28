import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const EditTeacher = ({ auth, teacher, standards, errors }) => {
    const { data, setData, put, progress } = useForm({
        name: teacher?.name,
        email: teacher?.email,
        dob: teacher?.dob,
        changeStandard: false,
        standard: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        put(`/teachers/${teacher.id}`);
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
                                    Date Of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    value={data.dob}
                                    onChange={(e) =>
                                        setData("dob", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                />
                                <span className="text-xs text-red-500">
                                    {errors.dob}
                                </span>
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="dob"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Current Standard
                                </label>
                                <input
                                    value={
                                        teacher.standard_teach
                                            ? `${teacher?.standard_teach?.title} ${teacher?.standard_teach?.section} `
                                            : "Not yet assigned"
                                    }
                                    readOnly
                                    className="bg-gray-50 border uppercase border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />

                                <button
                                    onClick={() =>
                                        setData(
                                            "changeStandard",
                                            !data.changeStandard
                                        )
                                    }
                                    type="button"
                                    className="mt-2 text-sm hover:underline text-blue-500 transition-all delay-75"
                                >
                                    {data.changeStandard
                                        ? "Don't Change Standard"
                                        : "Change Standard"}
                                </button>
                            </div>
                            {data.changeStandard && (
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
                                        required
                                    >
                                        <option value="">
                                            Select Standard
                                        </option>
                                        {standards.length > 0 &&
                                            standards.map((stand) => (
                                                <option
                                                    key={stand.id}
                                                    value={stand.id}
                                                    className="uppercase"
                                                >
                                                    {stand.title}{" "}
                                                    {stand.section}
                                                </option>
                                            ))}
                                    </select>
                                    <span className="text-xs text-red-500">
                                        {errors.standard}
                                    </span>
                                </div>
                            )}

                            <button
                                disabled={progress}
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default EditTeacher;
