import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";

const DaysTable = ({ days }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Datum
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tijdslot
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {days?.length > 0 &&
                        days?.map((day) => (
                            <tr key={day.id} className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    <Link href={`/days/${day.id}`}>
                                        {dayjs(day.day).format("DD/MM/YYYY")}
                                    </Link>
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4  text-gray-900 flex gap-2 flex-wrap"
                                >
                                    {day?.schedules?.length > 0 &&
                                        day.schedules.map((schedule) => (
                                            <span
                                                className="text-xs border px-1 border-gray-400"
                                                key={`schedule-${schedule.id}`}
                                            >
                                                {schedule.start_time} -
                                                {schedule.end_time}
                                            </span>
                                        ))}
                                </th>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default DaysTable;
