import Background from "@/Components/Background";
import { Link } from "@inertiajs/react";

const Index = ({ auth, departments }) => {
    return (
        <Background user={auth.user} title={"Departments"}>
            {departments.data.length > 0 && (
                <div className="flex flex-col gap-2">
                    {departments.data.map((department) => (
                        <Link
                            href={`/departments/${department.id}`}
                            className="border p-2 flex gap-2"
                            key={department.id}
                        >
                            {department.image_url ? (
                                <img
                                    className="h-28 w-40 flex-shrink-0 rounded object-cover object-center"
                                    src={`/storage/${department.image_url}`}
                                />
                            ) : (
                                <img
                                    className="h-28 w-40 flex-shrink-0 rounded object-cover object-center"
                                    src="/assets/noimage.jpg"
                                />
                            )}
                            <div>
                                <h2 className="text-gray-600 font-semibold">
                                    {department.name}
                                </h2>
                                <p className="text-gray-599 text-sm">
                                    {department.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </Background>
    );
};

export default Index;
