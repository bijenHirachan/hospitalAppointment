import { Link } from "@inertiajs/react";
import React from "react";

const Success = ({ data }) => {
    return (
        <div className="min-h-screen flex gap-2 justify-center items-center flex-col">
            {data?.length > 0 && (
                <div className="flex flex-col items-center mb-2">
                    <h3 className="text-lg font-semibold tracking-wide leading-7 mb-2">
                        Bedankt!
                    </h3>
                    {data?.map((user, index) => (
                        <div key={index} className="text-sm">
                            {user.first_name} {user.last_name}
                        </div>
                    ))}
                </div>
            )}
            {data?.length > 1 ? (
                <p className="text-lg tracking-wide leading-7">
                    Jullie zijn succesvol geregistreerd.
                </p>
            ) : (
                <p className="text-lg tracking-wide leading-7">
                    Je bent succesvol geregistreerd.
                </p>
            )}

            <Link className="text-blue-500 text-md hover:underline" href="/">
                Terug naar homepagina.
            </Link>
        </div>
    );
};

export default Success;
