import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, departments }) {
    return (
        <Guest>
            <Head>
                <title>Departments</title>
            </Head>
            <h2 className="text-lg font-semibold text-gray-500 text-center mb-4">
                Select department
            </h2>
            {departments.length > 0 && (
                <div className="flex gap-4 flex-wrap justify-center">
                    {departments.map((department) => (
                        <Link
                            href={`/departments/${department.id}`}
                            className="h-44 w-40 rounded bg-gray-100 text-gray-500 shadow-sm"
                            key={department.id}
                        >
                            {department.image_url ? (
                                <img
                                    className="rounded-t h-36 w-40 object-cover object-center"
                                    src={`/storage/${department.image_url}`}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className="rounded-t h-36 w-40 object-cover object-center"
                                    src={"/assets/noimage.jpg"}
                                    alt=""
                                />
                            )}
                            <h3 className="p-1 text-center">
                                {department.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            )}
        </Guest>
    );
}
