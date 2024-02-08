import React from "react";

const ReservationsTable = ({ reservations }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Voornaam
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Familienaam
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations?.length > 0 &&
                        reservations?.map((reservation) => (
                            <tr
                                key={reservation.id}
                                className="bg-white border-b "
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4  text-gray-500"
                                >
                                    {reservation.first_name}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4  text-gray-500"
                                >
                                    {reservation.last_name}
                                </th>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsTable;
