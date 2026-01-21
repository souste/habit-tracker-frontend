import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getMe();

      if (response.error) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setUser(response.data.user);
    })();
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Logged in as: {user.email}</p>
    </div>
  );
}

export default Dashboard;
