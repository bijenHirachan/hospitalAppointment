import { Link, Head } from "@inertiajs/react";
import logo from "../images/logo.jpg";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex flex-col justify-center gap-8 items-center min-h-screen bg-center bg-white">
                <h3 className="text-3xl font-bold text-black">School Report</h3>
                <img src={logo} alt="" className="h-32" />

                <div>
                    {auth.user ? (
                        <Link
                            href="/dashboard"
                            className="text-black font-semibold text-lg border-2 border-black px-4 py-2 hover:border-gray-500 hover:text-gray-500 transition-all delay-75"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="text-black font-semibold text-lg border-2 border-black px-4 py-2 hover:border-gray-500 hover:text-gray-500 transition-all delay-75"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
