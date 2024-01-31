import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

export default function Dashboard({ auth, teachers, students, standards }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-200 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 grid grid-cols-12 gap-2">
                            <div className="col-span-12 sm:col-span-4  bg-white rounded shadow p-2 flex flex-col items-center justify-center gap-4">
                                <h3 className="text-lg text-gray-600 font-semibold">
                                    Teachers
                                </h3>
                                <FaChalkboardTeacher className="text-3xl text-gray-600" />
                                <p className="text-3xl text-gray-500">
                                    {teachers}
                                </p>
                            </div>
                            <div className="col-span-12 sm:col-span-4 bg-white rounded shadow p-2 flex flex-col items-center justify-center gap-4">
                                <h3 className="text-lg text-gray-600 font-semibold">
                                    Students
                                </h3>
                                <PiStudent className="text-3xl text-gray-600" />
                                <p className="text-3xl text-gray-500">
                                    {students}
                                </p>
                            </div>
                            <div className="col-span-12 sm:col-span-4 bg-white rounded shadow p-2 flex flex-col items-center justify-center gap-4">
                                <h3 className="text-lg text-gray-600 font-semibold">
                                    Standards
                                </h3>
                                <SiGoogleclassroom className="text-3xl text-gray-600" />
                                <p className="text-3xl text-gray-500">
                                    {standards}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
