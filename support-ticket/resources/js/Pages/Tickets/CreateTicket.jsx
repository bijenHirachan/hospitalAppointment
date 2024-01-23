import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

const CreateTicket = ({ auth, labels, categories, priorities }) => {
    const { data, setData, post, progress } = useForm({
        title: "",
        description: "",
        labels: new Array(labels.length).fill(false),
        categories: new Array(categories.length).fill(false),
        priority: priorities?.[0],
        userFiles: null,
    });

    const handleLabelsOnChange = (index) => {
        const updatedCheckedState = data.labels.map((status, position) =>
            index === position ? !status : status
        );

        setData("labels", updatedCheckedState);
    };

    const handleCategoriesOnChange = (index) => {
        const updatedCheckedState = data.categories.map((status, position) =>
            index === position ? !status : status
        );

        setData("categories", updatedCheckedState);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        post("/tickets");
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Ticket" />

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
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Title
                        </label>
                        <div className="">
                            <input
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                type="text"
                                name="title"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="">
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Description
                        </label>
                        <div className="">
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                type="text"
                                name="description"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            ></textarea>
                        </div>
                    </div>

                    {labels.length > 0 && (
                        <div>
                            <p className="block text-sm font-medium leading-6 text-gray-900">
                                Labels
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-4">
                                {labels?.map((label, index) => (
                                    <div key={label.id} className="flex gap-2">
                                        <div className="flex h-6 items-center">
                                            <input
                                                type="checkbox"
                                                value={label}
                                                checked={data.labels[index]}
                                                onChange={() =>
                                                    handleLabelsOnChange(index)
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label
                                                htmlFor="comments"
                                                className="font-medium text-gray-900"
                                            >
                                                {label.name}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {categories.length > 0 && (
                        <div>
                            <p className="block text-sm font-medium leading-6 text-gray-900">
                                Categories
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-4">
                                {categories?.map((category, index) => (
                                    <div
                                        key={category.id}
                                        className="flex gap-2"
                                    >
                                        <div className="flex h-6 items-center">
                                            <input
                                                type="checkbox"
                                                value={category}
                                                checked={data.categories[index]}
                                                onChange={() =>
                                                    handleCategoriesOnChange(
                                                        index
                                                    )
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label
                                                htmlFor="comments"
                                                className="font-medium text-gray-900"
                                            >
                                                {category.name}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <p className="block text-sm font-medium leading-6 text-gray-900">
                            Priority
                        </p>
                        <select
                            name=""
                            id=""
                            value={data.priority}
                            onChange={(e) =>
                                setData("priority", e.target.value)
                            }
                            className="uppercase block w-full text-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        >
                            {priorities.length > 0 && (
                                <>
                                    {priorities.map((prty, index) => (
                                        <option
                                            className="uppercase text-xs sm:text-sm"
                                            key={index}
                                            value={prty}
                                        >
                                            {prty}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                    <div>
                        <p className="block text-sm font-medium leading-6 text-gray-900">
                            Files
                        </p>
                        <input
                            multiple
                            onChange={(e) =>
                                setData("userFiles", e.target.files)
                            }
                            type="file"
                            className="px-2 file:bg-sky-300 file:border-none file:text-sky-600 file:text-sm file:rounded-md uppercase block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                    </div>
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

export default CreateTicket;
