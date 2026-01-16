import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("token")
    };

    axios.get("http://localhost:3000/api/v1/user/me", { headers })
        .then(res => setUser(res.data.user));

    axios.get("http://localhost:3000/api/v1/account/balance", { headers })
        .then(res => setBalance(res.data.balance));

}, []);


    return (
        <div>
            <Appbar user={user} />
            <div className="m-8">
                <Balance value={balance}/>
                <Users />
            </div>
        </div>
    );
};
