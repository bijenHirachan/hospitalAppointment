import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";

const SchedulesTable = ({ schedules }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tijdslot
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reservations
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {schedules?.length > 0 &&
                        schedules?.map((schedule) => (
                            <tr
                                key={schedule.id}
                                className="bg-white border-b "
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4  text-gray-600"
                                >
                                    <Link href={`/schedules/${schedule.id}`}>
                                        {schedule.start_time} -
                                        {schedule.end_time}
                                    </Link>
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4  text-gray-600"
                                >
                                    {schedule.reservations_count}
                                </th>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default SchedulesTable;
