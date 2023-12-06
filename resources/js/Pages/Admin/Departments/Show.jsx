import Background from "@/Components/Background";
import React from "react";

const Show = ({ auth, department }) => {
    return (
        <Background user={auth?.user} title={department.name}>
            <div className="grid grid-cols-2 gap-4">
                {department.image_url ? (
                    <img
                        className="rounded-md col-span-2 sm:col-span-1"
                        src={`/storage/${department.image_url}`}
                    />
                ) : (
                    <img
                        className="rounded-md col-span-2 sm:col-span-1"
                        src="/assets/noimage.jpg"
                    />
                )}

                <div className="col-span-2 sm:col-span-1">
                    <div className="">
                        <h3 className="text-gray-600 font-semibold">
                            {department.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {department.description}
                        </p>
                    </div>
                </div>
            </div>
        </Background>
    );
};

export default Show;
