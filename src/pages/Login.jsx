import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { verifyToken } from "../../api/auth";
import { useState } from "react";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");

    try {
      // Verify token with backend
      const response = await verifyToken(credentialResponse.credential);

      if (response.success) {
        // Decode token to get user info
        const decoded = jwtDecode(credentialResponse.credential);

        // Save user info to context
        login({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        });

        navigate("/admin");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Sign in to access the admin dashboard</p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fee",
              color: "#c33",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {loading && <p style={{ textAlign: "center" }}>Verifying...</p>}

        <div className="login-button-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Login Failed")}
            size="large"
            shape="pill"
            width="280"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
