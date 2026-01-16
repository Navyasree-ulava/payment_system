import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const id = searchParams.get("id");
    const name = searchParams.get("name");

    // ✅ store amount as STRING
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTransfer = async () => {
        const numericAmount = Number(amount);

        // ✅ frontend validation
        if (!numericAmount || numericAmount <= 0) {
            alert("Enter a valid amount");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    to: id,
                    amount: numericAmount
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            // ✅ success
            navigate("/transfer-result?status=success");

        } catch (err) {
            // ❌ failure
            navigate("/transfer-result?status=failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">

                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">
                            Send Money
                        </h2>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">
                                    {name?.[0]?.toUpperCase()}
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>

                        <div className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>

                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                    placeholder="Enter amount"
                                />
                            </div>

                            <button
                                onClick={handleTransfer}
                                disabled={loading || !amount}
                                className={`justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full text-white
                                  ${loading ? "bg-gray-400" : "bg-green-500"}
                                `}
                            >
                                {loading ? "Processing..." : "Initiate Transfer"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
