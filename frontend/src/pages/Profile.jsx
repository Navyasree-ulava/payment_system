import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdate = async () => {
        const updateData = {};

        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (password) updateData.password = password;

        if (Object.keys(updateData).length === 0) {
            alert("Nothing to update");
            return;
        }

        try {
            setLoading(true);

            await axios.put(
                "http://localhost:3000/api/v1/user/update",
                updateData,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            alert("Profile updated successfully");
            navigate("/dashboard");

        } catch (err) {
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Update Profile
                </h2>

                <input
                    type="text"
                    placeholder="New First Name"
                    className="w-full border p-2 mb-2"
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="New Last Name"
                    className="w-full border p-2 mb-2"
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border p-2 mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>
        </div>
    );
};
