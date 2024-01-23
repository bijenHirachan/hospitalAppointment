import { Link } from "@inertiajs/react";
import { AiOutlineDashboard, AiOutlineLogout } from "react-icons/ai";
import { HiOutlineTicket } from "react-icons/hi2";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdOutlineEventNote } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoPricetagsOutline, IoSettingsOutline } from "react-icons/io5";
import MenuItem from "@/Components/Sidebar/MenuItem";
import { Toaster } from "react-hot-toast";

export default function AuthenticatedLayout({ user, children }) {
    return (
        <div className="min-h-screen bg-gray-500 flex">
            <div className="w-16 sm:w-56 bg-sky-600 p-2 sm:p-6 items-center sm:items-start shadow-md flex flex-col justify-between">
                <Link
                    href="/dashboard"
                    className="text-sky-50 text-xs sm:text-xl font-bold"
                >
                    {user?.name}
                </Link>

                <ul className="flex flex-col gap-2">
                    {user.role === "admin" && (
                        <li>
                            <MenuItem
                                routeName={"dashboard"}
                                icon={<AiOutlineDashboard />}
                                text={"Dashboard"}
                            />
                        </li>
                    )}

                    <li>
                        <MenuItem
                            routeName={"tickets.index"}
                            icon={<HiOutlineTicket />}
                            text={"Tickets"}
                        />
                    </li>
                    {user.role === "admin" && (
                        <>
                            <li>
                                <MenuItem
                                    routeName={"users.index"}
                                    icon={<PiUsersThreeLight />}
                                    text={"Users"}
                                />
                            </li>
                            <li>
                                <MenuItem
                                    routeName={"ticket-logs"}
                                    icon={<MdOutlineEventNote />}
                                    text={"Ticket Logs"}
                                />
                            </li>
                            <li>
                                <MenuItem
                                    routeName={"categories.index"}
                                    icon={<BiCategory />}
                                    text={"Categories"}
                                />
                            </li>
                            <li>
                                <MenuItem
                                    routeName={"labels.index"}
                                    icon={<IoPricetagsOutline />}
                                    text={"Labels"}
                                />
                            </li>
                        </>
                    )}
                </ul>

                <div className="flex flex-col gap-2">
                    <MenuItem
                        routeName={"profile.edit"}
                        icon={<IoSettingsOutline />}
                        text={"Settings"}
                    />
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex items-center gap-2 group"
                    >
                        <AiOutlineLogout
                            className="text-sky-50 group-hover:text-orange-500"
                            size={20}
                        />
                        <span className="text-sm hidden sm:block text-blue-50 group-hover:text-orange-500 font-semibold">
                            Logout
                        </span>
                    </Link>
                </div>
            </div>

            <Toaster />
            <div className="bg-sky-200 w-full p-6">{children}</div>
        </div>
    );
}
