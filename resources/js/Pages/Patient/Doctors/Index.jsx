import Background from "@/Components/Background";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";
import { useState } from "react";

const Index = ({ auth, doctor }) => {
    const [show, setShow] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const showModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShow(true);
    };

    const bookAppointment = () => {
        router.post(`/patients/${selectedAppointment.id}`);
        setShow(false);
        setSelectedAppointment(null);
    };

    return (
        <Background user={auth.user} title={doctor.data.name}>
            <Modal
                show={show}
                onClose={() => setShow((prev) => (prev = !prev))}
                closeable={true}
            >
                <div className="p-4">
                    <p className="text-sm text-gray-500">
                        Are you sure you want to book an appointment for{" "}
                        {selectedAppointment?.time_slot}?
                    </p>
                    <div className="my-4 flex gap-2">
                        <PrimaryButton onClick={bookAppointment}>
                            Book
                        </PrimaryButton>
                        <SecondaryButton
                            onClick={() => {
                                setShow(false);
                                setSelectedAppointment(null);
                            }}
                        >
                            Cancel
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 sm:col-span-1 p-4 flex flex-col justify-center items-center">
                    {doctor.data.image_url ? (
                        <img
                            className="h-40 w-40 rounded-full object-cover object-top"
                            src={`/storage/${doctor.data.image_url}`}
                        />
                    ) : (
                        <img
                            className="h-40 w-40 rounded-full object-cover object-top"
                            src="/assets/avatar.jpeg"
                        />
                    )}
                    <h3 className="text-gray-600 mt-2">
                        Dr. {doctor.data.name}
                    </h3>
                    <p className="text-gray-500  font-semibold">
                        {doctor.data.qualification}
                    </p>
                </div>
                <div className="col-span-2 sm:col-span-1 p-4">
                    {doctor.data.schedules.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {doctor.data.schedules.map((schedule) => (
                                <div
                                    key={schedule.id}
                                    className="flex gap-2 flex-col p-2  bg-gray-200 rounded-lg"
                                >
                                    <div className="text-gray-500 ">
                                        <div className="text-xs flex">
                                            <div className="font-semibold ">
                                                Shift
                                            </div>
                                            <div className="uppercase  ml-2">
                                                {schedule.shift}
                                            </div>
                                        </div>
                                        <div className="text-xs flex ">
                                            <div className="font-semibold">
                                                Date
                                            </div>
                                            <div className="ml-2">
                                                {dayjs(schedule.day).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {schedule.appointments.length > 0 && (
                                        <div className="flex gap-2 flex-wrap bg-gray-50 rounded-md p-2">
                                            {schedule.appointments.map(
                                                (appointment) => (
                                                    <div key={appointment.id}>
                                                        {appointment.status ===
                                                        "available" ? (
                                                            <div
                                                                onClick={() =>
                                                                    showModal(
                                                                        appointment
                                                                    )
                                                                }
                                                                className="border cursor-pointer px-2 py-1 border-gray-400 text-gray-500 text-sm rounded"
                                                            >
                                                                {
                                                                    appointment.time_slot
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div className="border px-2 py-1 cursor-not-allowed border-red-400 text-red-500 text-sm rounded">
                                                                {
                                                                    appointment.time_slot
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <p className="text-gray-500">
                                Sorry! No appointments available right now.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Background>
    );
};

export default Index;
