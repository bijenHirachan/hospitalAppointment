import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Background from "@/Components/Background";
import { Link } from "@inertiajs/react";
import Button from "@/Components/Button";

const Departments = ({ auth, departments }) => {
    return (
        <Background user={auth.user} title={"Departments"}>
            <div className="relative overflow-x-auto">
                {auth.user.role === "admin" && (
                    <div className="flex justify-end pb-2">
                        <Link href={route("departments.create")}>
                            <Button>Add Department</Button>
                        </Link>
                    </div>
                )}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            {auth.user.role === "admin" && (
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {departments?.length > 0 && (
                            <>
                                {departments.map((department) => (
                                    <tr
                                        key={department.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {department.image_url ? (
                                                <img
                                                    className="h-8 w-8 object-cover object-center rounded-full"
                                                    src={`/storage/${department.image_url}`}
                                                />
                                            ) : (
                                                <img
                                                    className="h-8 w-8 object-cover object-center rounded-full"
                                                    src="/assets/avatar.jpeg"
                                                />
                                            )}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <Link
                                                href={`/departments/${department.id}`}
                                            >
                                                {department.name}
                                            </Link>
                                        </th>
                                        {auth.user.role === "admin" && (
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <AiOutlineEdit
                                                    size={18}
                                                    className="text-green-700 cursor-pointer hover:text-green-500 transition-all delay-75"
                                                />
                                                <AiOutlineDelete
                                                    size={18}
                                                    className="text-red-700 cursor-pointer hover:text-red-500 transition-all delay-75"
                                                />
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </Background>
    );
};

export default Departments;
