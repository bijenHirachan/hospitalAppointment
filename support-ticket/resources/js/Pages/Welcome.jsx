import { Link, Head } from "@inertiajs/react";
import image from "../images/image.png";
import Guest from "@/Layouts/GuestLayout";

export default function Welcome({ auth }) {
    return (
        <Guest>
            <Head title="Welcome" />

            <section className="h-screen w-full py-8 flex flex-col items-center justify-center">
                <img
                    className="h-56 w-auto object-contain object-center"
                    src={image}
                    alt=""
                />
                <h3 className="text-sky-50 font-bold text-3xl leading-9 mt-8">
                    Create your support ticket!
                </h3>
                <p className="text-sm text-sky-50 leading-7 mt-4">
                    We are here 24/7 to help you.
                </p>
                {auth.user ? (
                    <Link
                        href="/dashboard"
                        className="border-2 mt-8 px-4 py-2 text-sm uppercase font-semibold text-sky-50 border-sky-50"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <div className="flex gap-2">
                        <Link
                            href="/login"
                            className="border-2 mt-8 px-4 py-2 text-sm uppercase font-semibold text-sky-50 border-sky-50 hover:text-orange-500 hover:border-orange-500 transition-all delay-75"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="border-2 mt-8 px-4 py-2 text-sm uppercase font-semibold text-sky-50 border-sky-50 hover:text-orange-500 hover:border-orange-500 transition-all delay-75"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </section>
        </Guest>
    );
}
