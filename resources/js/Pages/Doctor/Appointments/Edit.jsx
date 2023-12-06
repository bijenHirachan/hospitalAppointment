import Background from "@/Components/Background";
import PrimaryButton from "@/Components/PrimaryButton";
import Status from "@/Components/Status";
import { Link, router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";

const Edit = ({ auth, appointment, schedule }) => {
    const [status, setStatus] = useState(appointment.data.status ?? "");
    const [remarks, setRemarks] = useState(appointment.data.remarks ?? "");

    const submit = (e) => {
        e.preventDefault();

        router.put(`/doctor/appointments/${appointment.data.id}`, {
            status,
            remarks,
        });
    };

    return (
        <Background user={auth.user} title={"Appointments"}>
            <div>
                <div className="flex gap-4 py-2">
                    <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-gray-500">
                            Date
                        </div>
                        <div className="text-sm text-gray-500">
                            {dayjs(schedule.day).format("DD/MM/YYYY")}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-gray-500">
                            Shift
                        </div>
                        <div className="text-sm text-gray-500">
                            {schedule.shift}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-gray-500 text-sm">
                <div className="grid grid-cols-12">
                    <div className="border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 font-semibold border-t border-r border-l">
                        Time
                    </div>
                    <div className="border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 border-t border-r">
                        {appointment.data.time_slot}
                    </div>
                </div>
                <div className="grid grid-cols-12 ">
                    <div
                        className={`border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 font-semibold border-t border-r border-l`}
                    >
                        Status
                    </div>
                    <div
                        className={`border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 border-t border-r`}
                    >
                        <Status value={appointment.data.status} />
                    </div>
                </div>

                {appointment.data.patient && (
                    <>
                        <div className="grid grid-cols-12">
                            <div className="border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 font-semibold border-t border-r border-l">
                                Patient Name
                            </div>
                            <div className="border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 border-t border-r">
                                {appointment.data.patient.name}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 font-semibold border-t border-r border-l">
                                Patient Email
                            </div>
                            <div className="border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 border-t border-r">
                                {appointment.data.patient.email}
                            </div>
                        </div>
                    </>
                )}
                <div className="grid grid-cols-12">
                    <div className="border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 font-semibold border-t border-b border-r border-l">
                        Remarks
                    </div>
                    <div className="border-gray-400 px-2 py-1 col-span-6 sm:col-span-4 border-t border-r border-b ">
                        {appointment.data.remarks}
                    </div>
                </div>
            </div>

            <div className="my-8">
                <h2 className="text-gray-500 text-sm font-semibold">
                    Update Appointment
                </h2>
                <form
                    onSubmit={submit}
                    className="flex flex-col gap-2 w-full sm:w-1/2"
                >
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="text-sm text-gray-500 outline-none rounded border border-gray-400 focus:outline-none focus:ring-0"
                    >
                        <option value="">Select an option</option>
                        <option value="avilable">Available</option>
                        <option value="booked">Booked</option>
                        <option value="checked">Checked</option>
                    </select>
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Remarks here plz..."
                        type="text"
                        className="text-sm text-gray-500  outline-none rounded border border-gray-400 focus:outline-none focus:ring-0"
                    />

                    <PrimaryButton className="w-fit">Update</PrimaryButton>
                </form>
            </div>
        </Background>
    );
};

export default Edit;
