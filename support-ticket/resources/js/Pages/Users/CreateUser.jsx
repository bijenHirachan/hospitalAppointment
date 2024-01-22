import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";

const CreateUser = ({ auth, roles, errors }) => {
    const { data, setData, post, progress } = useForm({
        name: "",
        email: "",
        role: "user",
    });
    const submitHandler = (e) => {
        e.preventDefault();

        post(`/users`);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create User" />
            <div className="w-full h-[90svh] flex flex-col items-center justify-center pt-24">
                <div className="flex w-full md:w-4/5 xl:w-2/5 mb-4">
                    <h2 className="text-sky-500 font-semibold text-xl">
                        Create User
                    </h2>
                </div>
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-4 w-full  md:w-4/5 xl:w-2/5"
                    encType="multipart/form-data"
                >
                    <div className="">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Name
                        </label>
                        <div className="">
                            <input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                type="text"
                                name="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                            <span className="text-xs text-red-500">
                                {errors.name}
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <div className="">
                            <input
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                type="email"
                                name="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                            <span className="text-xs text-red-500">
                                {errors.email}
                            </span>
                        </div>
                    </div>

                    {roles.length > 0 && (
                        <div>
                            <p className="block text-sm font-medium leading-6 text-gray-900">
                                Roles
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-4">
                                <select
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                >
                                    {roles?.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-xs text-red-500">
                                    {errors.role}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="mt-2">
                        <button
                            disabled={progress}
                            type="submit"
                            className="px-2 py-1 bg-sky-500 text-sm rounded uppercase font-semibold text-sky-50 hover:bg-sky-600 transition-all delay-75"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateUser;
