import React, { useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";

const EditUser = ({ auth, roles, errors, user }) => {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, put, progress } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });
    const submitHandler = (e) => {
        e.preventDefault();

        put(`/users/${user.id}`);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Update User" />
            <Modal
                show={showModal}
                closeable
                onClose={() => setShowModal(false)}
                maxWidth="lg"
            >
                <div className="bg-white p-4">
                    <h4>Hello world </h4>
                </div>
            </Modal>

            <div className="w-full h-full flex justify-center items-center">
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

                    <div className="mt-2 flex justify-between">
                        <button
                            disabled={progress}
                            type="submit"
                            className="px-2 py-1 bg-sky-500 text-sm rounded uppercase font-semibold text-sky-50 hover:bg-sky-600 transition-all delay-75"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            type="button"
                            className="px-2 py-1 bg-red-500 text-sm rounded uppercase font-semibold text-red-50 hover:bg-red-600 transition-all delay-75"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditUser;
