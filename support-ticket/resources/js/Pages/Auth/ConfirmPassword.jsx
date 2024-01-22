import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="min-h-screen  flex flex-col items-center justify-center">
                <div className="mb-4 text-sm text-sky-50 w-full sm:w-4/5 md:w-3/5 xl:w-2/5">
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </div>

                <form
                    onSubmit={submit}
                    className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5"
                >
                    <div className="mt-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-sky-50"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <span className="text-xs text-red-400">
                            {errors.password}
                        </span>
                    </div>

                    <div className="w-full flex items-center justify-end mt-4">
                        <button
                            className="px-4 py-2 hover:bg-sky-900 transition-all delay-75 bg-sky-800 rounded text-sky-50 text-sm uppercase font-semibold"
                            disabled={processing}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
