import { useNavigate } from "react-router-dom";

export const Appbar = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>

            {user && (
                <div className="flex items-center mr-4">
                    {/* Hello text (not clickable) */}
                    <div className="flex flex-col justify-center h-full mr-3">
                        Hello {user.firstName}
                    </div>

                    {/* Avatar icon → Update Profile */}
                    <div
                        onClick={() => navigate("/profile")}
                        className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center cursor-pointer hover:bg-slate-300 transition"
                        title="Update Profile"
                    >
                        <div className="text-xl font-semibold">
                            {user.firstName[0].toUpperCase()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
