import { Head, Link, router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Welcome = ({ auth, days, errors }) => {
    const [day, setDay] = useState("");

    const [selectedDay, setSelectedDay] = useState(null);

    const [timeslot, setTimeslot] = useState("");

    const [users, setUsers] = useState([
        { first_name: "", last_name: "", subscription_number: "" },
    ]);

    const handleDay = (e) => {
        const d = days.filter(
            (day) => day.day == dayjs(e).format("YYYY-MM-DD")
        );
        setSelectedDay(d[0]);
    };

    const addUser = () => {
        setUsers([
            ...users,
            { first_name: "", last_name: "", subscription_number: "" },
        ]);
    };

    const deleteUser = (index) => {
        const filterUsers = users.filter((_, i) => i !== index);

        setUsers(filterUsers);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        router.post(
            "/reservations",
            {
                day,
                timeslot,
                users,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <Head title="Welcome" />
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-600 tracking-wide">
                    Zoo registratie
                </h2>
                {auth?.user ? (
                    <Link
                        href="/dashboard"
                        className="text-sm tracking-wide hover:underline text-blue-500"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <Link
                        href="/login"
                        className="text-sm tracking-wide hover:underline text-blue-500"
                    >
                        Log In
                    </Link>
                )}
            </div>
            <form
                onSubmit={submitHandler}
                className="w-full grid grid-cols-12  gap-6 mt-16"
            >
                <div className="col-span-12 sm:col-span-6 flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 tracking-wide leading-6">
                            Datum
                        </label>
                        <Calendar
                            className={"rounded"}
                            value={day}
                            onChange={setDay}
                            onClickDay={handleDay}
                            minDate={new Date(days[0]?.day)}
                            maxDate={new Date(days[days.length - 1]?.day)}
                            locale="nl"
                        />
                        <span className="text-xs mt-1 text-red-500">
                            {errors.day}
                        </span>
                    </div>

                    <div className="flex flex-col w-96">
                        <label className="text-sm text-gray-600 tracking-wide leading-6">
                            Tijdslot
                        </label>
                        <select
                            className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                            value={timeslot}
                            onChange={(e) => setTimeslot(e.target.value)}
                        >
                            <option className="text-xs text-gray-600" value="">
                                Select Time
                            </option>
                            {selectedDay?.schedules?.length > 0 ? (
                                selectedDay?.schedules.map((schedule) => (
                                    <option
                                        className="text-xs text-gray-600"
                                        key={schedule.id}
                                        value={schedule.id}
                                    >
                                        {schedule.start_time} -{" "}
                                        {schedule.end_time}
                                    </option>
                                ))
                            ) : (
                                <option
                                    className="text-xs text-gray-600"
                                    value=""
                                >
                                    No schedules found!
                                </option>
                            )}
                        </select>
                        <span className="text-xs mt-1 text-red-500">
                            {errors.timeslot}
                        </span>
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 mt-6 max-h-[70svh] overflow-y-auto">
                    <div className="border rounded border-gray-400 p-4 flex flex-col gap-8">
                        {users?.map((user, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <p className="text-sm font-semibold text-gray-500">
                                        Bezoeker #{index + 1}
                                    </p>
                                    {users?.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => deleteUser(index)}
                                            className="text-sm text-gray-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600 tracking-wide leading-6">
                                        Voornaam
                                    </label>
                                    <input
                                        value={user.first_name}
                                        className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                        type="text"
                                        onChange={(e) => {
                                            const updatedUsers = [...users];
                                            updatedUsers[index].first_name =
                                                e.target.value;
                                            setUsers(updatedUsers);
                                        }}
                                    />
                                    <span className="mt-1 text-xs text-red-500">
                                        {errors[`users.${index}.first_name`]}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600 tracking-wide leading-6">
                                        Familienaam
                                    </label>
                                    <input
                                        className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                        type="text"
                                        value={user.last_name}
                                        onChange={(e) => {
                                            const updatedUsers = [...users];
                                            updatedUsers[index].last_name =
                                                e.target.value;
                                            setUsers(updatedUsers);
                                        }}
                                    />
                                    <span className="text-xs mt-1 text-red-500">
                                        {errors[`users.${index}.last_name`]}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600 tracking-wide leading-6">
                                        Abonnementsnummer
                                    </label>
                                    <input
                                        className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                        type="text"
                                        placeholder="1234-1234-12"
                                        value={user.subscription_number}
                                        onChange={(e) => {
                                            const updatedUsers = [...users];
                                            updatedUsers[
                                                index
                                            ].subscription_number =
                                                e.target.value;
                                            setUsers(updatedUsers);
                                        }}
                                    />
                                    <span className="text-xs mt-1 text-red-500">
                                        {
                                            errors[
                                                `users.${index}.subscription_number`
                                            ]
                                        }
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-2">
                        <button
                            onClick={addUser}
                            type="button"
                            className="text-gray-600 text-sm hover:underline"
                        >
                            Voeg nog een bezoeker toe
                        </button>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            className="border border-gray-600 px-3 py-1 text-gray-600 font-semibold rounded hover:bg-gray-500 hover:text-gray-50 transition-all delay-75"
                            type="submit"
                        >
                            Reserveer!
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Welcome;
