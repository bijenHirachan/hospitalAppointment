import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { IoPricetagsOutline, IoTicketOutline } from "react-icons/io5";
import {
    TbTicket,
    TbTicketOff,
    TbUserStar,
    TbUsersGroup,
} from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { GrUserSettings } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import DashCard from "@/Components/Dashboard/DashCard";

export default function Dashboard({
    auth,
    totalTickets,
    openTickets,
    closedTickets,
    totalUsers,
    totalAgents,
    totalAdmins,
    totalNormalUsers,
    totalLabels,
    totalCategories,
}) {
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

            <div className="py-12 h-[90svh] overflow-x-hidden overflow-y-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-sky-500 font-semibold text-xl mb-4">
                        Dashboard
                    </h2>
                    <div className="bg-white overflow-hidden rounded grid grid-cols-12 p-6 gap-6">
                        <DashCard
                            title={"Total Tickets"}
                            icon={<IoTicketOutline />}
                            number={totalTickets}
                        />
                        <DashCard
                            title={"Open Tickets"}
                            icon={<TbTicket />}
                            number={openTickets}
                        />
                        <DashCard
                            title={"Closed Tickets"}
                            icon={<TbTicketOff />}
                            number={closedTickets}
                        />
                        <DashCard
                            title={"Total Users"}
                            icon={<LuUsers />}
                            number={totalUsers}
                        />
                        <DashCard
                            title={"Admins"}
                            icon={<GrUserSettings />}
                            number={totalAdmins}
                        />
                        <DashCard
                            title={"Agents"}
                            icon={<TbUserStar />}
                            number={totalAgents}
                        />
                        <DashCard
                            title={"Clients"}
                            icon={<TbUsersGroup />}
                            number={totalNormalUsers}
                        />
                        <DashCard
                            title={"Labels"}
                            icon={<IoPricetagsOutline />}
                            number={totalLabels}
                        />
                        <DashCard
                            title={"Categories"}
                            icon={<BiCategory />}
                            number={totalCategories}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
