import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="min-h-screen  flex flex-col items-center justify-center">
                <div className="w-full mb-4 text-sky-50 text-sm sm:w-4/5 md:w-3/5 xl:w-2/5">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form
                    className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5"
                    onSubmit={submit}
                >
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <span className="mt-2 text-sm text-red-400">
                        {errors.email}{" "}
                    </span>

                    <div className="flex items-center justify-end mt-4">
                        <button
                            className="ms-4 px-4 py-2 hover:bg-sky-900 transition-all delay-75 bg-sky-800 rounded text-sky-50 text-sm uppercase font-semibold"
                            disabled={processing}
                        >
                            Email Password Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
