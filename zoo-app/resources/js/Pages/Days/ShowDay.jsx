import SchedulesTable from "@/Components/SchedulesTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const ShowDay = ({ auth, day }) => {
    return (
        <Authenticated
            user={auth?.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {day?.day}
                </h2>
            }
        >
            <Head title={day?.day} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-8 flex justify-end">
                                {/* <form className="flex gap-2">
                                    <input
                                        className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                        type="text"
                                    />
                                    <button className="border border-gray-600 px-2 py-1 text-gray-600 text-sm tracking-wide font-semibold rounded hover:bg-gray-500 hover:text-gray-50 transition-all delay-75">
                                        Add Schedule
                                    </button>
                                </form> */}
                            </div>
                            {day?.schedules?.length > 0 && (
                                <SchedulesTable schedules={day?.schedules} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default ShowDay;
