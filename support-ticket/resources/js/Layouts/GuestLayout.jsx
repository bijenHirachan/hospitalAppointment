import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="w-full h-full bg-sky-600">
            <div className="container px-4 min-h-screen mx-auto">
                {children}
            </div>
        </div>
    );
}
