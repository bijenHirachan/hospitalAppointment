import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Welcome = ({ auth, days, schedules, errors }) => {
    const [secondUser, setSecondUser] = useState(false);
    const [thirdUser, setThirdUser] = useState(false);

    const { data, setData, progress, post, reset } = useForm({
        day: "",
        timeslot: "",
        first_name1: "",
        last_name1: "",
        subscription_number1: "",
        first_name2: "",
        last_name2: "",
        subscription_number2: "",
        first_name3: "",
        last_name3: "",
        subscription_number3: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        post(`/reservations`);
    };

    const handleTimeslots = (e) => {
        setData("day", e.target.value);
        router.get(
            "/",
            {
                day: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleUsers = () => {
        if (!secondUser) {
            setSecondUser(true);
        }
        if (secondUser && !thirdUser) {
            setThirdUser(true);
        }
    };

    const removeUser = (option) => {
        if (option === "second") {
            reset("first_name2", "last_name2", "subscription_number2");
            setSecondUser(false);
        }
        if (option === "third") {
            reset("first_name3", "last_name3", "subscription_number3");
            setThirdUser(false);
        }
    };

    return (
        <div className="min-h-screen py-16 flex justify-center items-center">
            <Head title="Welcome" />

            <form
                onSubmit={submitHandler}
                className="w-full sm:w-4/5 lg:w-3/5 2xl:w-2/5 flex flex-col gap-4"
            >
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

                <div className="flex  flex-col w-1/2">
                    <label
                        className="text-sm text-gray-600 tracking-wide leading-6"
                        htmlFor="day"
                    >
                        Datum
                    </label>
                    <select
                        className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                        name="day"
                        id="day"
                        value={data.day}
                        onChange={handleTimeslots}
                    >
                        <option value="">Select Date</option>
                        {days?.length > 0 &&
                            days.map((day) => (
                                <option key={day.id} value={day.id}>
                                    {day.day}
                                </option>
                            ))}
                    </select>
                    <span className="text-xs mt-1 text-red-500">
                        {errors.day}
                    </span>
                </div>

                <div className="flex flex-col w-1/2">
                    <label
                        className="text-sm text-gray-600 tracking-wide leading-6"
                        htmlFor="timeslot"
                    >
                        Tijdslot
                    </label>
                    <select
                        className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                        value={data.tijdslot}
                        onChange={(e) => setData("timeslot", e.target.value)}
                        id="timeslot"
                    >
                        <option value="">Select Time</option>
                        {schedules?.length > 0 &&
                            schedules.map((schedule) => (
                                <option key={schedule.id} value={schedule.id}>
                                    {schedule.start_time} - {schedule.end_time}
                                </option>
                            ))}
                    </select>
                    <span className="text-xs mt-1 text-red-500">
                        {errors.timeslot}
                    </span>
                </div>

                <div className="border rounded border-gray-400 p-4 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-gray-500">
                            Bezoeker
                        </p>
                        <div className="flex flex-col">
                            <label
                                className="text-sm text-gray-600 tracking-wide leading-6"
                                htmlFor="first_name1"
                            >
                                Voornaam
                            </label>
                            <input
                                className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                value={data.first_name1}
                                onChange={(e) =>
                                    setData("first_name1", e.target.value)
                                }
                                id="first_name1"
                                type="text"
                            />
                            <span className="mt-1 text-xs text-red-500">
                                {errors.first_name1}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <label
                                className="text-sm text-gray-600 tracking-wide leading-6"
                                htmlFor="last_name1"
                            >
                                Familienaam
                            </label>
                            <input
                                className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                value={data.last_name1}
                                onChange={(e) =>
                                    setData("last_name1", e.target.value)
                                }
                                id="last_name1"
                                type="text"
                            />
                            <span className="text-xs mt-1 text-red-500">
                                {errors.last_name1}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <label
                                className="text-sm text-gray-600 tracking-wide leading-6"
                                htmlFor="subscription_number1"
                            >
                                Abonnementsnummer
                            </label>
                            <input
                                className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                value={data.subscription_number1}
                                onChange={(e) =>
                                    setData(
                                        "subscription_number1",
                                        e.target.value
                                    )
                                }
                                id="subscription_number1"
                                type="text"
                                placeholder="1234-1234-12"
                            />
                            <span className="text-xs mt-1 text-red-500">
                                {errors.subscription_number1}
                            </span>
                        </div>
                    </div>

                    {secondUser && (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <p className="text-sm font-semibold text-gray-500">
                                    Extra bezoeker
                                </p>
                                <button
                                    className="text-gray-600 text-sm hover:underline"
                                    onClick={() => removeUser("second")}
                                >
                                    Verwijder
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="text-sm text-gray-600 tracking-wide leading-6"
                                    htmlFor="first_name2"
                                >
                                    Voornaam
                                </label>
                                <input
                                    className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                    value={data.first_name2}
                                    onChange={(e) =>
                                        setData("first_name2", e.target.value)
                                    }
                                    id="first_name2"
                                    type="text"
                                />
                                <span className="text-xs mt-1 text-red-500">
                                    {errors.first_name2}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="text-sm text-gray-600 tracking-wide leading-6"
                                    htmlFor="last_name2"
                                >
                                    Familienaam
                                </label>
                                <input
                                    className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                    value={data.last_name2}
                                    onChange={(e) =>
                                        setData("last_name2", e.target.value)
                                    }
                                    id="last_name2"
                                    type="text"
                                />
                                <span className="text-xs mt-1 text-red-500">
                                    {errors.last_name2}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="text-sm text-gray-600 tracking-wide leading-6"
                                    htmlFor="subscription_number2"
                                >
                                    Abonnementsnummer
                                </label>
                                <input
                                    className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                    value={data.subscription_number2}
                                    onChange={(e) =>
                                        setData(
                                            "subscription_number2",
                                            e.target.value
                                        )
                                    }
                                    id="subscription_number2"
                                    type="text"
                                    placeholder="1234-1234-12"
                                />
                                <span className="text-xs mt-1 text-red-500">
                                    {errors.subscription_number2}
                                </span>
                            </div>
                        </div>
                    )}

                    {thirdUser && (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <p className="text-sm font-semibold text-gray-500">
                                    Extra bezoeker
                                </p>
                                <button
                                    className="text-gray-600 text-sm hover:underline"
                                    onClick={() => removeUser("third")}
                                >
                                    Verwijder
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="text-sm text-gray-600 tracking-wide leading-6"
                                    htmlFor="first_name3"
                                >
                                    Voornaam
                                </label>
                                <input
                                    className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                    value={data.first_name3}
                                    onChange={(e) =>
                                        setData("first_name3", e.target.value)
                                    }
                                    id="first_name3"
                                    type="text"
                                />
                                <span className="text-xs mt-1 text-red-500">
                                    {errors.first_name3}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="text-sm text-gray-600 tracking-wide leading-6"
                                    htmlFor="last_name3"
                                >
                                    Familienaam
                                </label>
                                <input
                                    className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                    value={data.last_name3}
                                    onChange={(e) =>
                                        setData("last_name3", e.target.value)
                                    }
                                    id="last_name3"
                                    type="text"
                                />
                                <span className="text-xs mt-1 text-red-500">
                                    {errors.last_name3}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="text-sm text-gray-600 tracking-wide leading-6"
                                    htmlFor="subscription_number3"
                                >
                                    Abonnementsnummer
                                </label>
                                <input
                                    className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                    value={data.subscription_number3}
                                    onChange={(e) =>
                                        setData(
                                            "subscription_number3",
                                            e.target.value
                                        )
                                    }
                                    id="subscription_number3"
                                    type="text"
                                    placeholder="1234-1234-12"
                                />
                                <span className="text-xs mt-1 text-red-500">
                                    {errors.subscription_number3}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {!thirdUser && (
                    <div>
                        <button
                            onClick={handleUsers}
                            type="button"
                            className="text-gray-600 text-sm hover:underline"
                        >
                            Voeg nog een bezoeker toe
                        </button>
                    </div>
                )}
                <div className="mt-8 flex justify-end">
                    <button
                        disabled={progress}
                        className="border border-gray-600 px-3 py-1 text-gray-600 font-semibold rounded hover:bg-gray-500 hover:text-gray-50 transition-all delay-75"
                        type="submit"
                    >
                        Reserveer!
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Welcome;
