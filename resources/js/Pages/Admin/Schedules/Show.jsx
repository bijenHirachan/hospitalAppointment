import Background from "@/Components/Background";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";

const Show = ({ auth, schedule }) => {
    const [duration, setDuration] = useState(15);

    const submit = (e) => {
        e.preventDefault();

        router.post(`/admin/appointments/${schedule.data.id}`, {
            duration,
        });
    };

    const deleteAppointment = (id) => {
        router.delete(`/admin/appointments/${id}`);
    };

    const deleteAllAppointments = () => {
        router.delete(`/admin/appointments/${schedule.data.id}/all`);
    };

    return (
        <Background user={auth.user} title={"Schedule"}>
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full sm:w-1/2 text-lg text-gray-600 font-semibold ">
                    <div className="grid grid-cols-2">
                        <div className="border-t border-l px-2 py-1 border-gray-400 text-sm text-gray-500">
                            Doctor
                        </div>
                        <div className="border-t border-l border-r px-2 py-1 border-gray-400 text-sm text-gray-500">
                            {schedule.data.doctor}
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="border-t border-l px-2 py-1 border-gray-400 text-sm text-gray-500">
                            Date
                        </div>
                        <div className="border-t border-l border-r px-2 py-1 border-gray-400 text-sm text-gray-500">
                            {dayjs(schedule.data.day).format("DD/MM/YYYY")}
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="border-t border-l px-2 py-1 border-gray-400 text-sm text-gray-500">
                            Shift
                        </div>
                        <div className="uppercase border-t border-l border-r px-2 py-1 border-gray-400 text-sm text-gray-500">
                            {schedule.data.shift}
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="border-t border-b border-l px-2 py-1 border-gray-400 text-sm text-gray-500">
                            Time
                        </div>
                        <div className="border-t border-b border-l border-r px-2 py-1 border-gray-400 text-sm text-gray-500">
                            {schedule.data.start_time} -{" "}
                            {schedule.data.end_time}
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 flex justify-between items-center">
                    <form onSubmit={submit} className="flex gap-1 my-2">
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="rounded-md border-gray-400 focus:outline-none focus:ring-0"
                        >
                            <option value="">Select Duration</option>
                            <option value="15">15 mins</option>
                            <option value="30">30 mins</option>
                            <option value="60">60 mins</option>
                        </select>
                        <PrimaryButton type="submit">Submit</PrimaryButton>
                    </form>

                    <SecondaryButton onClick={deleteAllAppointments}>
                        Delete All
                    </SecondaryButton>
                </div>

                {schedule.data.appointments.length > 0 && (
                    <div className="w-full sm:w-1/2">
                        {schedule.data.appointments.map(
                            (appointment, index) => (
                                <div key={appointment.id}>
                                    {appointment.status === "available" ? (
                                        <div className="grid grid-cols-8">
                                            <div
                                                className={`col-span-1 border-t border-l border-r px-2 py-1 border-gray-400 text-gray-500 ${
                                                    schedule.data.appointments
                                                        .length -
                                                        1 ===
                                                    index
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                {index + 1}
                                            </div>
                                            <div
                                                className={`col-span-5 border-t border-r px-2 py-1 border-gray-400 text-gray-500 ${
                                                    schedule.data.appointments
                                                        .length -
                                                        1 ===
                                                    index
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                {appointment.time_slot}
                                            </div>
                                            <div
                                                className={`col-span-2 border-t border-r px-2 py-1 border-gray-400 text-gray-500 ${
                                                    schedule.data.appointments
                                                        .length -
                                                        1 ===
                                                    index
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                <button
                                                    onClick={() =>
                                                        deleteAppointment(
                                                            appointment.id
                                                        )
                                                    }
                                                    className="bg-red-500 text-xs  font-semibold text-red-50 px-2 py-1 rounded hover:bg-red-600 hover:text-red-100 transition-all delay-75"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-8">
                                            <div
                                                className={`col-span-1 border-t border-l border-r px-2 py-1 border-gray-400 text-gray-500 ${
                                                    schedule.data.appointments
                                                        .length -
                                                        1 ===
                                                    index
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                {index + 1}
                                            </div>
                                            <div
                                                className={`col-span-5 line-through border-t border-r px-2 py-1 border-gray-400 text-gray-500 ${
                                                    schedule.data.appointments
                                                        .length -
                                                        1 ===
                                                    index
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                {appointment.time_slot}
                                            </div>
                                            <div
                                                className={`col-span-2  border-t border-r px-2 py-1 border-gray-400 text-gray-500 ${
                                                    schedule.data.appointments
                                                        .length -
                                                        1 ===
                                                    index
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                <span className="bg-green-400 cursor-not-allowed text-green-50 px-2 py-1 uppercase rounded text-xs font-semibold">
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </Background>
    );
};

export default Show;
