import Background from "@/Components/Background";
import { Link } from "@inertiajs/react";

const Show = ({ auth, department }) => {
    return (
        <Background user={auth?.user} title={department.data.name}>
            <div className="grid grid-cols-2 gap-4">
                {department.data.image_url ? (
                    <img
                        className="rounded-md col-span-2 sm:col-span-1"
                        src={`/storage/${department.data.image_url}`}
                    />
                ) : (
                    <img
                        className="rounded-md col-span-2 sm:col-span-1"
                        src="/assets/noimage.jpg"
                    />
                )}

                <div className="col-span-2 sm:col-span-1">
                    <div className="">
                        <h3 className="text-gray-600 font-semibold">
                            {department.data.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {department.data.description}
                        </p>
                    </div>

                    {department.data.doctors.length > 0 && (
                        <div className="my-2">
                            <h2 className="text-gray-600 font-semibold">
                                Doctors
                            </h2>
                            <div className="flex gap-2">
                                {department.data.doctors.map((doctor) => (
                                    <Link
                                        href={`/doctors/${doctor.id}`}
                                        className="gap-2 mb-1 border-gray-300 p-2  flex flex-col items-center justify-center"
                                        key={doctor.id}
                                    >
                                        {doctor.image_url ? (
                                            <img
                                                className="h-24 w-24 rounded-full object-cover object-top"
                                                src={`/storage/${doctor.image_url}`}
                                            />
                                        ) : (
                                            <img
                                                className="h-24  w-24 rounded-full object-cover object-center"
                                                src="/assets/avatar.jpeg"
                                            />
                                        )}
                                        <div className="text-center">
                                            <h2 className="text-gray-600">
                                                {doctor.name}
                                            </h2>
                                            <p className="text-gray-500 text-sm">
                                                {doctor.email}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Background>
    );
};

export default Show;
