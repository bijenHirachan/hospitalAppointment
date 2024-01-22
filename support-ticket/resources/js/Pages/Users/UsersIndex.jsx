import Paginator from "@/Components/Paginator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const UsersIndex = ({ auth, users, roles, searchQuery, roleQuery }) => {
    const [search, setSearch] = useState(searchQuery || "");

    const [role, setRole] = useState(roleQuery || "");

    const [page, setPage] = useState(users.current_page || 1);

    const searchNow = () => {
        router.get(
            `/users`,
            {
                search,
                role,
                page,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    useEffect(() => {
        setPage(1);
        const handleSearch = setTimeout(() => searchNow(), 500);

        return () => {
            clearTimeout(handleSearch);
        };
    }, [search, role]);

    useEffect(() => {
        const handleSearch = setTimeout(() => searchNow(), 500);

        return () => {
            clearTimeout(handleSearch);
        };
    }, [page]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />

            <div className="w-full max-h-[90svh]  overflow-y-auto flex justify-center">
                <div className="py-16 w-full md:w-4/5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sky-500 font-semibold text-xl">
                            Users
                        </h2>
                        <Link
                            href="/users/create"
                            className="p-2 bg-sky-500  text-sky-50 uppercase text-sm font-semibold rounded-md hover:bg-sky-600 transition-all delay-75"
                        >
                            Create User
                        </Link>
                    </div>

                    <div className="flex flex-col gap-1 sm:flex-row justify-between mb-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            placeholder="Search..."
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        />

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border-none text-sky-500 focus:ring-0 rounded bg-white text-xs"
                        >
                            <option value="">All</option>
                            {roles.length > 0 &&
                                roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {users.data.length > 0 && (
                        <div className="overflow-x-auto bg-white p-4 rounded">
                            <div className="text-sm mb-2">
                                {users.total} users
                            </div>
                            <table className="table table-sm text-gray-600">
                                <thead className="text-gray-700">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr key={`user-${user.id}`}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <Link
                                                    className="text-xs font-semibold text-green-500 hover:text-green-600 transition-all delay-75"
                                                    href={`/users/${user.id}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Paginator
                                page={page}
                                setPage={setPage}
                                currentPage={users.current_page}
                                lastPage={users.last_page}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UsersIndex;
