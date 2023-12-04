import Background from "@/Components/Background";
import React from "react";

const Show = ({ auth, doctor }) => {
    return (
        <Background user={auth.user} title={doctor.user.name}>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center col-span-2 sm:col-span-1">
                    {doctor.image_url ? (
                        <img
                            className="h-40 w-40 object-cover object-center rounded-full"
                            src={`/storage/${doctor.image_url}`}
                        />
                    ) : (
                        <img
                            className="h-40 w-40 object-cover object-center rounded-full"
                            src="/assets/avatar.jpeg"
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
                                {doctor.user.name}
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="font-semibold col-span-1 border-r border-l border-t px-2 py-1 text-sm text-gray-500 border-gray-500">
                                Email
                            </div>
                            <div className="col-span-1 border-t border-r px-2 py-1 text-sm text-gray-500 border-gray-500">
                                {doctor.user.email}
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="font-semibold col-span-1 border-r border-l border-t px-2 py-1 text-sm text-gray-500 border-gray-500">
                                Qualification
                            </div>
                            <div className="col-span-1 border-t border-r px-2 py-1 text-sm text-gray-500 border-gray-500">
                                {doctor.qualification}
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="font-semibold col-span-1 border-r border-l border-t border-b px-2 py-1 text-sm text-gray-500 border-gray-500">
                                Department
                            </div>
                            <div className="col-span-1 border-t border-r border-b px-2 py-1 text-sm text-gray-500 border-gray-500">
                                {doctor.department.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Background>
    );
};

export default Show;
