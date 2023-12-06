import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

const Edit = ({ auth, department, errors }) => {
    const [name, setName] = useState(department.name);
    const [description, setDescription] = useState(department.description);

    const [image, setImage] = useState("");

    const submit = (e) => {
        e.preventDefault();

        router.post(`/admin/departments/${department.id}`, {
            name,
            description,
            image,
            _method: "PUT",
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Update Department
                </h2>
            }
        >
            <Head title="Departments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="floating_name"
                                        id="floating_name"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="floating_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Name
                                    </label>
                                    {errors.name && (
                                        <span className="text-xs text-red-500">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <textarea
                                        name="floating_email"
                                        id="floating_email"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="floating_email"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Description
                                    </label>
                                    {errors.description && (
                                        <span className="text-xs text-red-500">
                                            {errors.description}
                                        </span>
                                    )}
                                </div>

                                {department.image_url ? (
                                    <div className="relative z-0 w-full mb-5 ">
                                        <img
                                            className="h-24 rounded w-auto object-cover object-center"
                                            src={`/storage/${department.image_url}`}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative z-0 w-full mb-5 ">
                                        <img
                                            className="h-24 rounded w-auto object-cover object-center"
                                            src={`/assets/noimage.jpg`}
                                        />
                                    </div>
                                )}

                                <div className="relative z-0 w-full mb-5 ">
                                    <label
                                        className="block mb-2 text-sm text-gray-500 dark:text-white"
                                        htmlFor="file_input"
                                    >
                                        Upload file
                                    </label>
                                    <input
                                        className="block file:border-none file:cursor-pointer file:px-2 file:py-1 file:text-gray-50 file:bg-gray-500 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                    />
                                    {errors.image && (
                                        <span className="text-xs text-red-500">
                                            {errors.image}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-0 w-full mb-5 ">
                                    <button
                                        type="submit"
                                        className="bg-gray-500 text-gray-50 px-2 py-1 rounded-md w-full hover:bg-gray-600 hover:text-gray-100 transition-all delay-75"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
