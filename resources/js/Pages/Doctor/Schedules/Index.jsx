import Background from "@/Components/Background";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";

const Index = ({ auth, schedules }) => {
    return (
        <Background user={auth.user} title={"Schedules"}>
            <div className="relative overflow-x-auto py-2">
                {/* {auth.user.role === "admin" && (
                    <div className="flex justify-end pb-2">
                        <Link href={route("doctors.create")}>
                            <Button>Add Doctor</Button>
                        </Link>
                    </div>
                )} */}

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Shift
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.length > 0 && (
                            <>
                                {schedules.map((schedule) => (
                                    <tr
                                        key={schedule.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="col"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <Link
                                                href={`/doctor/schedules/${schedule.id}`}
                                            >
                                                {dayjs(schedule.day).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </Link>
                                        </th>

                                        <td className="px-6 py-4">
                                            {schedule.shift}
                                        </td>
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

export default Index;
