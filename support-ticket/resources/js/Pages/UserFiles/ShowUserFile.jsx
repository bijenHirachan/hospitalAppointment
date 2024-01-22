import DocViewer from "@cyntler/react-doc-viewer";
import { Head } from "@inertiajs/react";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

const ShowUserFile = ({ auth, path }) => {
    return (
        <div className="p-8 ">
            <Head title="File" />
            <a
                href={`/storage/${path}`}
                download={path.split("/")[1]}
                className="text-xs w-fit mb-2 font-semibold rounded flex hover:bg-gray-200 transition-all delay-75 items-center gap-1 border px-1 py-1 border-gray-400 text-gray-500"
                target="_blank"
                rel="noreferrer"
            >
                <AiOutlineDownload size={14} /> Download
            </a>
            <DocViewer
                documents={[
                    {
                        uri: `/storage/${path}`,
                    },
                ]}
                config={{
                    header: {
                        disableHeader: true,
                        disableFileName: true,
                        retainURLParams: true,
                    },
                }}
            />
        </div>
    );
};

export default ShowUserFile;
