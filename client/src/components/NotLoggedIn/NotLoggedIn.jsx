import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotLoggedIn() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      // Redirect to the specified page after 10 seconds
      navigate("/");
    }
  }, [timer]);

  return (
    <div className="countdown">
      <div className="message">You are not logged in.</div>
      <div className="timer">Redirecting in {timer} seconds...</div>
    </div>
  );
}
