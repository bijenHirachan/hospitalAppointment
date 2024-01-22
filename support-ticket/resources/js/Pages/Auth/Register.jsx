import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="min-h-screen  flex flex-col items-center justify-center">
                <form
                    onSubmit={submit}
                    className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5"
                >
                    <div className="w-full">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-sky-50"
                        >
                            Name
                        </label>
                        <div className="w-full">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                            <span className="text-xs text-red-400">
                                {errors.email}
                            </span>
                        </div>
                    </div>
                    <div className="w-full mt-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-sky-50"
                        >
                            Email
                        </label>
                        <div className="w-full">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                            <span className="text-xs text-red-400">
                                {errors.email}
                            </span>
                        </div>
                    </div>

                    <div className="w-full mt-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-sky-50"
                        >
                            Password
                        </label>
                        <div className="w-full">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                            <span className="text-xs text-red-400">
                                {errors.password}
                            </span>
                        </div>
                    </div>

                    <div className="w-full mt-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-sky-50"
                        >
                            Confirm Password
                        </label>
                        <div className="w-full">
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                            <span className="text-xs text-red-400">
                                {errors.password_confirmation}
                            </span>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-sky-50">
                                Already registered?
                            </span>
                            <Link
                                href="/login"
                                className="hover:underline text-sm text-sky-50 hover:text-sky-200 "
                            >
                                Login here!
                            </Link>
                        </div>

                        <button
                            className="ms-4 px-4 py-2 hover:bg-sky-900 transition-all delay-75 bg-sky-800 rounded text-sky-50 text-sm uppercase font-semibold"
                            disabled={processing}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
