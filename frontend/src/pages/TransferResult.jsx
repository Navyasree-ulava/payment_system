import { useSearchParams, useNavigate } from "react-router-dom";

export const TransferResult = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const status = searchParams.get("status");

    // ✅ VERY IMPORTANT GUARD
    if (!status) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600">Loading transfer result...</p>
            </div>
        );
    }

    const isSuccess = status === "success";

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">

                {isSuccess ? (
                    <>
                        <h2 className="text-2xl font-bold text-green-600">
                            ✅ Transfer Successful
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Your money has been transferred successfully.
                        </p>

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="mt-6 w-full bg-green-500 text-white py-2 rounded-md"
                        >
                            Go to Dashboard
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-red-600">
                            ❌ Transfer Failed
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Something went wrong. Please try again.
                        </p>

                        <button
                            onClick={() => navigate(-1)}
                            className="mt-6 w-full bg-red-500 text-white py-2 rounded-md"
                        >
                            Retry Transfer
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};
