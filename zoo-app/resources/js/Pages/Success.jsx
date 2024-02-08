import { Link } from "@inertiajs/react";
import React from "react";

const Success = ({ data }) => {
    return (
        <div className="min-h-screen flex gap-2 justify-center items-center flex-col">
            {data && (
                <h3 className="text-lg font-semibold tracking-wide leading-7">
                    Bedankt {data?.first_name} {data?.last_name} !{" "}
                </h3>
            )}
            <p className="text-lg tracking-wide leading-7">
                Je hebt je succesvol geregistreerd.
            </p>

            <Link className="text-blue-500 text-md hover:underline" href="/">
                Terug naar homepagina.
            </Link>
        </div>
    );
};

export default Success;
