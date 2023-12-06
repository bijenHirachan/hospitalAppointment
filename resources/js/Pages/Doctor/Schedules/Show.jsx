import Background from "@/Components/Background";
import Status from "@/Components/Status";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";

const Show = ({ auth, schedule }) => {
    return (
        <Background user={auth.user} title={"Appointments"}>
            <div>
                <div className="flex gap-4 py-2">
                    <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-gray-500">
                            Date
                        </div>
                        <div className="text-sm text-gray-500">
                            {dayjs(schedule.data.day).format("DD/MM/YYYY")}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-gray-500">
                            Shift
                        </div>
                        <div className="text-sm text-gray-500">
                            {schedule.data.shift}
                        </div>
                    </div>
                </div>

                {schedule.data.appointments.length > 0 && (
                    <div className="relative overflow-x-auto py-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Time
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-500">
                                {schedule.data.appointments.length > 0 && (
                                    <>
                                        {schedule.data.appointments.map(
                                            (appointment) => (
                                                <tr
                                                    key={appointment.id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                >
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-white"
                                                    >
                                                        <Link
                                                            href={`/doctor/appointments/${appointment.id}`}
                                                        >
                                                            {
                                                                appointment.time_slot
                                                            }
                                                        </Link>
                                                    </th>

                                                    <td className="px-6 py-4">
                                                        <Status
                                                            value={
                                                                appointment.status
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Background>
    );
};

export default Show;
