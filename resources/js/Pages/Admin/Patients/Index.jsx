import Background from "@/Components/Background";

const Index = ({ auth, patients }) => {
    return (
        <Background user={auth.user} title={"Departments"}>
            <div className="relative overflow-x-auto">
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
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {patient.user.name}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4  text-indigo-500 whitespace-nowrap dark:text-white"
                                        >
                                            {patient.user.email}
                                        </th>
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
