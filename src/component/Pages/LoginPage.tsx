import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin, CodeResponse, NonOAuthError } from "@react-oauth/google";
import { config } from "../../config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { setProfileData } from "../../redux/profileSlice";
import { useDispatch } from "react-redux";
import { GoogleAuthAxiosResponse, LoginResponse } from "../../constant"; // Make sure these types exist

interface LoginPayload {
  email: string;
  password: string;
}

const serverBaseUrl = config.serverBaseUrl;

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const payload: LoginPayload = {
    email,
    password,
  };

  const loginUrl = `${serverBaseUrl}/auth/login`;

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const loginRes: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(loginUrl, payload);
      localStorage.setItem("token", loginRes.data.token);
      dispatch(setProfileData({ data: loginRes.data.userData }));
      navigate("/user/event_type");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      const msg = axiosErr.response?.data?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    flow: "auth-code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar.events",
    onSuccess: async ({ code }: { code: string }) => {
      try {
        const res: AxiosResponse<GoogleAuthAxiosResponse> = await axios.post(`${serverBaseUrl}/auth/google`, { code });
        localStorage.setItem("token", res.data.token);
        dispatch(setProfileData({ data: res.data.userData }));
        navigate("/user/event_type");
      } catch (err: unknown) {
        const axiosErr = err as AxiosError<{ message: string }>;
        const msg = axiosErr.response?.data?.message || "Google login failed";
        setError(msg);
        toast.error(msg);
      }
    },
    onError: (errorResponse: Pick<CodeResponse, "error" | "error_description" | "error_uri">) => {
      setError(errorResponse.error_description || "OAuth error occurred");
    },
    onNonOAuthError: (nonOAuthError: NonOAuthError) => {
      setError(nonOAuthError.type || "Non-OAuth error occurred");
    },
  });

  return (
    <section className="signup_page">
      <div>
        <div>
          <h2
            style={{
              fontSize: "2.5rem",
              color: "#0B3558",
              fontWeight: "600",
              lineHeight: "4rem",
            }}
          >
            Login to your account
          </h2>
          <form onSubmit={handleLoginSubmit} className="login_form">
            <div>
              <label htmlFor="email" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                Email
                {error && !email && <span className="error">Enter your email</span>}
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                Password
                {error && !password && <span className="error">Enter your password</span>}
                {error && password.length < 6 && <span className="error">Password length is too short</span>}
                <span style={{ color: "#372573", fontWeight: "300", fontSize: "0.875rem" }}>6 characters minimum</span>
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="google_button"
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                padding: "1rem 40%",
                textAlign: "center",
                width: "100%",
                margin: "20px 0",
                display: "grid",
                placeItems: "center",
              }}
              type="submit"
            >
              <span>Log In</span>
            </button>
          </form>
          <div>
            <div style={{ width: "100%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <p className="before_after">OR</p>
            </div>

            <button onClick={handleGoogleAuth} className="google_button" style={{ margin: "20px auto" }}>
              <span>
                <img src="https://calendly.com/media/googleLogo.svg" alt="Google Logo" />
              </span>
              <span style={{ fontSize: "1.2rem", marginRight: "15px", fontWeight: "500" }}>Log In with Google</span>
            </button>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              <span>Don't have an account?</span>
              <Link to="/signup" style={{ color: "blue" }}>
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
