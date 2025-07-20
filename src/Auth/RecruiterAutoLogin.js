import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecruiterAutoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("prefill", JSON.stringify({
      email: "demouser@gmail.com",
      password: "05Aug2003#"
    }));
    navigate("/login");
  }, [navigate]);

  return null;
};

export default RecruiterAutoLogin;

