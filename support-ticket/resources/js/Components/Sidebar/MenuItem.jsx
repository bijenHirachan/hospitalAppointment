import { Link } from "@inertiajs/react";
import React from "react";

const MenuItem = ({ routeName, icon, text }) => {
    return (
        <Link href={route(routeName)} className="group flex items-center gap-2">
            <div
                className={`${
                    route().current(routeName.split(".")[0] + ".*") ||
                    route().current(routeName)
                        ? "text-orange-500"
                        : "text-sky-50"
                } text-xl group-hover:text-orange-500 transition-all delay-75  hover:tooltip hover:tooltip-open hover:tooltip-right`}
                data-tip={text}
            >
                {icon}
            </div>
            <span
                className={`${
                    route().current(routeName.split(".")[0] + ".*") ||
                    route().current(routeName)
                        ? "text-orange-500"
                        : "text-sky-50"
                } text-sm hidden sm:block font-semibold group-hover:text-orange-500 transition-all delay-75`}
            >
                {text}
            </span>
        </Link>
    );
};

export default MenuItem;
