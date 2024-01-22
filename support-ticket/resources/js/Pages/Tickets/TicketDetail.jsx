import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";

const TicketDetail = ({ auth, ticket, agents, errors }) => {
    const [selectedAgent, setSelectedAgent] = useState(
        ticket?.assigned_to?.id || ""
    );

    const [comment, setComment] = useState("");

    const [selectedComment, setSelectedComment] = useState(null);

    const [editCommentInput, setEditCommentInput] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        router.put(
            `/tickets/${ticket.id}`,
            {
                agent: selectedAgent,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const closeTicketHandler = () => {
        router.put(`/tickets/${ticket.id}/close`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const addCommentHandler = (e) => {
        e.preventDefault();

        router.post(
            `/comments`,
            {
                comment,
                ticket: ticket.id,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: () => setComment(""),
            }
        );
    };

    const editCommentHandler = (comment) => {
        setSelectedComment(comment);
        setEditCommentInput(comment.body);
    };

    const updateCommentHandler = (e) => {
        e.preventDefault();
        router.put(
            `/comments/${selectedComment.id}`,
            {
                body: editCommentInput,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: () => {
                    setSelectedComment(null);
                    setEditCommentInput("");
                },
            }
        );
    };

    const deleteCommentHandler = (comment) => {
        router.delete(`/comments/${comment.id}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={ticket.title} />

            <div className="w-full h-[90svh] overflow-y-auto flex flex-col gap-2 items-center ">
                <div className="bg-white mt-16 relative px-6 py-4 rounded w-full md:w-4/5 xl:w-2/5 ">
                    <h3 className="leading-7 text-xl font-semibold text-gray-500">
                        {ticket.title}
                    </h3>
                    <p className="text-sm leading-6 my-4">
                        {ticket.description}
                    </p>

                    <div className="flex gap-1 my-2 flex-wrap">
                        {ticket.categories.length > 0 &&
                            ticket.categories.map((cat) => (
                                <span
                                    key={cat.id}
                                    className="uppercase text-xs font-semibold bg-indigo-400 px-2 py-1 rounded text-indigo-50"
                                >
                                    {cat.name}
                                </span>
                            ))}
                        {ticket.labels.length > 0 &&
                            ticket.labels.map((label) => (
                                <span
                                    key={label.id}
                                    className="uppercase text-xs font-semibold bg-orange-400 px-2 py-1 rounded text-orange-50"
                                >
                                    {label.name}
                                </span>
                            ))}
                        <span className="uppercase text-xs font-semibold bg-green-400 px-2 py-1 rounded text-green-50">
                            {ticket.priority}
                        </span>
                        <span className="uppercase text-xs font-semibold bg-red-400 px-2 py-1 rounded text-red-50">
                            {ticket.status}
                        </span>
                    </div>

                    {ticket.user_files.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-gray-600 font-semibold mb-1">
                                Files
                            </h2>
                            <div className="flex flex-col gap-1">
                                {ticket.user_files.map((file) => (
                                    <Link
                                        key={file.id}
                                        className="text-xs text-gray-500 hover:underline transition-all delay-75"
                                        href={`/user-file/${file.id}`}
                                    >
                                        {file.path.split("/")[1]}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col mt-4">
                        <h4 className="text-sm text-gray-600 font-bold">
                            {ticket.user.name}
                        </h4>
                        <p className="text-xs underline text-blue-500">
                            {ticket.user.email}
                        </p>
                    </div>
                    <span className="absolute top-2 right-2 text-gray-600 text-xs">
                        {dayjs(ticket.created_at).format("DD/MM/YYYY")}
                    </span>
                    {auth.user.role === "admin" && (
                        <form onSubmit={submitHandler} className="my-4">
                            <label
                                htmlFor="selectedAgent"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Agent
                            </label>
                            <select
                                value={selectedAgent}
                                onChange={(e) =>
                                    setSelectedAgent(e.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            >
                                <option value=""></option>
                                {agents.length > 0 &&
                                    agents.map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.name}
                                        </option>
                                    ))}
                            </select>

                            <button
                                type="submit"
                                className="mt-2 px-2 py-1 bg-sky-500 text-sm rounded uppercase font-semibold text-sky-50 hover:bg-sky-600 transition-all delay-75"
                            >
                                Update
                            </button>
                        </form>
                    )}
                    {(auth.user.role === "admin" ||
                        auth.user.role === "agent") && (
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={closeTicketHandler}
                                type="submit"
                                className="mt-2 px-2 py-1 bg-green-500 text-sm rounded uppercase font-semibold text-green-50 hover:bg-green-600 transition-all delay-75"
                            >
                                {ticket.status === "closed"
                                    ? "Open Ticket"
                                    : "Close Ticket"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-white relative px-6 py-4 rounded w-full md:w-4/5 xl:w-2/5 ">
                    <form onSubmit={addCommentHandler} className="mb-4">
                        <div className="">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Comment
                            </label>
                            <textarea
                                autoFocus
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                type="text"
                                name="title"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            ></textarea>
                            <span className="text-xs text-red-500">
                                {errors.comment}
                            </span>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-2 px-2 py-1 bg-sky-500 text-sm rounded uppercase font-semibold text-sky-50 hover:bg-sky-600 transition-all delay-75"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                    {ticket.comments.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {ticket.comments.map((comment) => (
                                <div key={comment.id}>
                                    {selectedComment &&
                                    selectedComment.id === comment.id ? (
                                        <form
                                            className="block  w-full p-1  rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                            onSubmit={updateCommentHandler}
                                        >
                                            <h4 className="text-sky-600 font-semibold text-sm px-2">
                                                {comment.user.name}
                                            </h4>
                                            <textarea
                                                className="w-full text-sm border-none outline-none focus:ring-0"
                                                value={editCommentInput}
                                                onChange={(e) =>
                                                    setEditCommentInput(
                                                        e.target.value
                                                    )
                                                }
                                                autoFocus
                                            ></textarea>

                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="mt-2 px-2 py-1 bg-sky-500 text-xs rounded uppercase font-semibold text-sky-50 hover:bg-sky-600 transition-all delay-75"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="border rounded border-gray-400 p-2">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-sky-600 font-semibold text-sm">
                                                    {comment.user.name}
                                                </h4>
                                                {(comment.user.id ===
                                                    auth.user.id ||
                                                    auth.user.role ===
                                                        "admin") && (
                                                    <div className="flex gap-2">
                                                        <div
                                                            onClick={() =>
                                                                editCommentHandler(
                                                                    comment
                                                                )
                                                            }
                                                            className="text-xs text-sky-500 hover:underline cursor-pointer hover:text-sky-700 transition-all delay-75"
                                                        >
                                                            Edit
                                                        </div>
                                                        <div
                                                            onClick={() =>
                                                                deleteCommentHandler(
                                                                    comment
                                                                )
                                                            }
                                                            className="text-xs text-sky-500 hover:underline cursor-pointer hover:text-sky-700 transition-all delay-75"
                                                        >
                                                            Delete
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-500">
                                                {comment.body}
                                            </p>
                                            <div className="flex justify-end mt-1">
                                                <span className="text-[11px]">
                                                    {comment.created_at ===
                                                    comment.updated_at ? (
                                                        <>
                                                            {" "}
                                                            {dayjs(
                                                                comment.created_at
                                                            ).format(
                                                                "HH:mm DD/MM/YYYY"
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            Updated on{" "}
                                                            {dayjs(
                                                                comment.updated_at
                                                            ).format(
                                                                "HH:mm DD/MM/YYYY"
                                                            )}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TicketDetail;
