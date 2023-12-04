import Background from "@/Components/Background";
import React from "react";

const Index = ({ auth, patients }) => {
    return (
        <Background user={auth.user} title={"Patients"}>
            <div className="relative overflow-x-auto py-2">
                {/* {auth.user.role === "admin" && (
                    <div className="flex justify-end pb-2">
                        <Link href={route("doctors.create")}>
                            <Button>Add Doctor</Button>
                        </Link>
                    </div>
                )} */}

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients?.length > 0 && (
                            <>
                                {patients.map((patient) => (
                                    <tr
                                        key={patient.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="col"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {patient.name}
                                        </th>

                                        <td className="px-6 py-4">
                                            {patient.email}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </Background>
    );
};

export default Index;
