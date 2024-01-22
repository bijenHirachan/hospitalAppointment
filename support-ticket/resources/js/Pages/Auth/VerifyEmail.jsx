import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="min-h-screen  flex flex-col items-center justify-center">
                <div className="mb-4 w-full text-sm text-sky-50 sm:w-4/5 md:w-3/5 xl:w-2/5">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </div>

                {status === "verification-link-sent" && (
                    <div className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5 mb-4 text-green-400">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}
                <div className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5 mb-4 text-sm text-green-400">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
                <form
                    onSubmit={submit}
                    className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5"
                >
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            className="px-4 py-2 hover:bg-sky-900 transition-all delay-75 bg-sky-800 rounded text-sky-50 text-sm uppercase font-semibold"
                            disabled={processing}
                        >
                            Resend Verification Email
                        </button>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="hover:underline text-sm text-sky-50 hover:text-sky-200 "
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
