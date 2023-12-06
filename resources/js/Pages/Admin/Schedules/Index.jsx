import Background from "@/Components/Background";
import Button from "@/Components/Button";
import { Link } from "@inertiajs/react";

import dayjs from "dayjs";

const Schedule = ({ auth, schedules }) => {
    return (
        <Background user={auth.user} title={"Schedules"}>
            {auth.user.role === "admin" && (
                <div className="flex justify-end pb-2">
                    <Link href={route("schedules.create")}>
                        <Button>Add Schedule</Button>
                    </Link>
                </div>
            )}

            <div className="relative overflow-x-auto my-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Doctor
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Day
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Shift
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Start Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                End Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules?.data.length > 0 && (
                            <>
                                {schedules.data.map((schedule) => (
                                    <tr
                                        key={schedule.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <Link
                                                href={`/admin/schedules/${schedule.id}`}
                                            >
                                                {schedule.doctor}
                                            </Link>
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {dayjs(schedule.day).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {schedule.shift}
                                        </th>

                                        <th
                                            scope="row"
                                            className="px-6 py-4  text-indigo-500 whitespace-nowrap dark:text-white"
                                        >
                                            {schedule.start_time}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4  text-indigo-500 whitespace-nowrap dark:text-white"
                                        >
                                            {schedule.end_time}
                                        </th>
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

export default Schedule;
