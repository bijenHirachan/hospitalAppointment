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
import dayjs from "dayjs";
import Calendar from "react-calendar";
import Modal from "@/Components/Modal";
import "react-calendar/dist/Calendar.css";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
);

export default function Dashboard({ auth, days, daysSelector }) {
    const [range, setRange] = useState("");

    const [showModal, setShowModal] = useState(false);

    const data = {
        labels: days?.map((day) => dayjs(day.day).format("DD/MM/YYYY")),
        datasets: [
            {
                label: "Aantal bezoekers per dag",
                data: days?.map((day) => day.reservations_count),
                backgroundColor: "#959ef9",
                borderColor: "black",
                pointBorderColor: "#959ef9",
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
                max: 1000,
            },
        },
    };

    const submitHandler = (e) => {
        setRange(e);

        router.get(
            "/dashboard",
            {
                startDate: dayjs(e[0]).format("YYYY-MM-DD"),
                endDate: dayjs(e[1]).format("YYYY-MM-DD"),
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => setShowModal(false),
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
                        <Modal
                            show={showModal}
                            closeable
                            onClose={() => setShowModal(false)}
                            maxWidth="md"
                        >
                            <div className="p-6 flex justify-center">
                                <Calendar
                                    className={"rounded"}
                                    minDate={new Date(daysSelector[0])}
                                    maxDate={
                                        new Date(
                                            daysSelector[
                                                daysSelector.length - 1
                                            ]
                                        )
                                    }
                                    locale="nl"
                                    selectRange
                                    value={range}
                                    onChange={submitHandler}
                                />
                            </div>
                        </Modal>
                        <div className="px-6 pt-6 flex justify-end">
                            <button
                                className="text-gray-600 text-sm hover:underline"
                                onClick={() => setShowModal(true)}
                            >
                                Selecteer datum
                            </button>
                        </div>

                        <div className="p-6 text-gray-900 flex justify-center items-center w-full min-h-[70svh]">
                            <Line data={data} options={options}></Line>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
