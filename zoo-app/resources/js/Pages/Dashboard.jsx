import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
);

export default function Dashboard({ auth, days, daysSelector }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const data = {
        labels: days?.map((day) => day.day),
        datasets: [
            {
                label: "Aantal bezoekers per dag",
                data: days?.map((day) => day.reservations_count),
                backgroundColor: "aqua",
                borderColor: "black",
                pointBorderColor: "aqua",
                tension: 0.4,
            },
        ],
    };

    const options = {
        plugins: {
            legend: true,
        },
        scales: {
            y: {
                min: 0,
                max: 200,
            },
        },
    };

    const submitHandler = (e) => {
        e.preventDefault();

        router.get(
            "/dashboard",
            {
                startDate,
                endDate,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={submitHandler}
                            className="p-6 flex gap-2 justify-end"
                        >
                            <select
                                className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            >
                                <option value="">Select Start Date</option>
                                {daysSelector?.length > 0 &&
                                    daysSelector.map((day, index) => (
                                        <option value={day} key={index}>
                                            {day}
                                        </option>
                                    ))}
                            </select>
                            <select
                                className="rounded text-gray-500 border border-gray-400 outline-none focus:ring-0"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            >
                                <option value="">Select End Date</option>
                                {daysSelector?.length > 0 &&
                                    daysSelector.map((day, index) => (
                                        <option value={day} key={index}>
                                            {day}
                                        </option>
                                    ))}
                            </select>
                            <button
                                className="border border-gray-600 px-3 py-1 text-gray-600 font-semibold rounded hover:bg-gray-500 hover:text-gray-50 transition-all delay-75"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                        <div className="p-6 text-gray-900 flex justify-center items-center w-full min-h-[70svh]">
                            <Line data={data} options={options}></Line>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
