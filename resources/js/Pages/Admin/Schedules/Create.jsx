import Background from "@/Components/Background";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";
import { useState } from "react";

export default function create({
    auth,
    workinghours,
    days,
    doctors,
    errors,
    flash,
}) {
    const [doctor, setDoctor] = useState("");
    const [shift, setShift] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const submit = (e) => {
        e.preventDefault();

        try {
            router.post(
                "/admin/schedules",
                {
                    doctor,
                    shift,
                    day,
                    startTime,
                    endTime,
                },
                {
                    preserveState: true,
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const [hours, setHours] = useState([]);

    const changeWorkingHours = (currentShift) => {
        const newHours = workinghours.filter((hr) => hr.shift === currentShift);

        setHours(newHours);
    };

    return (
        <Background user={auth.user} title={"Schedules"}>
            {flash.message && (
                <span className="text-xs text-red-500">{flash.message}</span>
            )}
            <form onSubmit={submit} className="">
                <div className="relative z-0 w-full mb-5 group">
                    <label className="text-sm text-gray-500">Doctor</label>
                    <select
                        required
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        <option value={""}>Select day</option>
                        {doctors.length > 0 &&
                            doctors.map((doc, index) => (
                                <option key={index} value={doc.id}>
                                    {doc.user.name}
                                </option>
                            ))}
                    </select>
                    {errors.doctor && (
                        <span className="text-xs text-red-500">
                            {errors.doctor}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label className="text-sm text-gray-500">Day</label>
                    <select
                        required
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        <option value={""}>Select day</option>
                        {days.length > 0 &&
                            days.map((day, index) => (
                                <option
                                    key={index}
                                    value={dayjs(day).format("DD/MM/YYYY")}
                                >
                                    {dayjs(day).format("DD/MM/YYYY")}
                                </option>
                            ))}
                    </select>
                    {errors.day && (
                        <span className="text-xs text-red-500">
                            {errors.day}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label className="text-sm text-gray-500">Shift</label>
                    <select
                        required
                        value={shift}
                        onChange={(e) => {
                            setShift(e.target.value);
                            changeWorkingHours(e.target.value);
                        }}
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        <option value={""}>Select shift</option>
                        <option value={"day"}>Day</option>
                        <option value={"night"}>Night</option>
                    </select>
                    {errors.shift && (
                        <span className="text-xs text-red-500">
                            {errors.shift}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label className="text-sm text-gray-500">Start Time</label>
                    <select
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        <option value={""}>Select start time</option>
                        {hours.length > 0 &&
                            hours.map((hour) => (
                                <option key={hour.id} value={hour.time}>
                                    {hour.time}
                                </option>
                            ))}
                    </select>
                    {errors.startTime && (
                        <span className="text-xs text-red-500">
                            {errors.startTime}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label className="text-sm text-gray-500">End Time</label>
                    <select
                        required
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        <option value={""}>Select end time</option>
                        {hours.length > 0 &&
                            hours.map((hour) => (
                                <option key={hour.id} value={hour.time}>
                                    {hour.time}
                                </option>
                            ))}
                    </select>
                    {errors.endTime && (
                        <span className="text-xs text-red-500">
                            {errors.endTime}
                        </span>
                    )}
                </div>

                <PrimaryButton type="submit">Create</PrimaryButton>
            </form>
        </Background>
    );
}
