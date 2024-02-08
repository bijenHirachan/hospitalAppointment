import React from "react";

const Paginator = ({ page, setPage, currentPage, lastPage, total }) => {
    const pageHandler = (type) => {
        if (type === "prev" && currentPage !== 1) {
            setPage((page) => page - 1);
        }

        if (type === "next" && lastPage !== page) {
            setPage((page) => page + 1);
        }
    };

    return (
        <div className="flex justify-between my-2">
            <button
                disabled={page === 1}
                onClick={() => pageHandler("prev")}
                className={`text-sky-500 border border-sky-500 px-1 text-sm  transition-all delay-75 ${
                    page === 1
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:bg-sky-500 hover:text-sky-50"
                }`}
            >
                Prev
            </button>
            <span className="text-sky-500 ">Page {currentPage}</span>
            <span className="text-sky-500 ">Total {total}</span>
            <button
                disabled={lastPage === page}
                onClick={() => pageHandler("next")}
                className={`text-sky-500 border border-sky-500 px-1 text-sm transition-all delay-75 ${
                    lastPage === page
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:bg-sky-500 hover:text-sky-50"
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Paginator;
