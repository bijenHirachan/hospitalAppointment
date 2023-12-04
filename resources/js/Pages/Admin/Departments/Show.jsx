import Background from "@/Components/Background";
import React from "react";

const Show = ({ auth, department }) => {
    return (
        <Background user={auth.user} title={department.name}>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center col-span-2 sm:col-span-1">
                    {department.image_url ? (
                        <img
                            className="h-40 w-40 object-cover object-center rounded"
                            src={`/storage/${department.image_url}`}
                        />
                    ) : (
                        <img
                            className="h-40 w-40 object-cover object-center rounded"
                            src="/assets/noimage.jpg"
                        />
                    )}
                </div>

                <div className="flex justify-center items-center col-span-2 sm:col-span-1">
                    <div className="w-full">
                        <div className="grid grid-cols-2">
                            <div className="font-semibold col-span-1 border-r border-l border-t px-2 py-1 text-sm text-gray-500 border-gray-500">
                                Name
                            </div>
                            <div className="col-span-1 border-t border-r px-2 py-1 text-sm text-gray-500 border-gray-500">
                                {department.name}
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="font-semibold col-span-1 border-r border-l border-t border-b px-2 py-1 text-sm text-gray-500 border-gray-500">
                                Description
                            </div>
                            <div className="col-span-1 border-t border-r border-b px-2 py-1 text-sm text-gray-500 border-gray-500">
                                {department.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Background>
    );
};

export default Show;
