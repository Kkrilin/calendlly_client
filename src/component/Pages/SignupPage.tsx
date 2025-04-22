import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { CodeResponse, NonOAuthError, useGoogleLogin } from "@react-oauth/google";
import { setProfileData } from "../../redux/profileSlice";
import { useDispatch } from "react-redux";

import { toast } from "react-hot-toast";
import { GoogleAuthAxiosResponse, SignupResponse } from "@/constant";
const { serverBaseUrl } = config;


interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const payload: SignupPayload = {
    name,
    email,
    password,
  };

  const validateFields = ({ name, email, password }: SignupPayload): string | null => {
    if (!name || !email || !password) return "All fields are required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };
  const signUpUrl = `${serverBaseUrl}/auth/signup`;

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMsg = validateFields(payload);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const signUpRes: AxiosResponse<SignupResponse> = await axios.post<SignupResponse>(signUpUrl, payload);
      localStorage.setItem("token", signUpRes.data.token);
      dispatch(setProfileData({ data: signUpRes.data.userData }));
      navigate("/user/event_type");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Signup failed");
        toast.error(error.response?.data?.message || "Signup failed");
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    flow: "auth-code",
    scope:
      "openid email profile https://www.googleapis.com/auth/calendar.events",
    onSuccess: async ({ code }: { code: string }) => {
      console.log("code", code);
      try {
        const res: AxiosResponse<GoogleAuthAxiosResponse> = await axios.post<GoogleAuthAxiosResponse>(`${serverBaseUrl}/auth/google`, { code });
        localStorage.setItem("token", res.data.token);
        dispatch(setProfileData({ data: res.data.userData }));
        navigate("/user/event_type");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Something went wrong");
          setError(error.message);
        } else {
          setError("Unexpected error occurred");
        }
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
              fontSize: "3.2rem",
              color: "#0B3558",
              fontWeight: "600",
              lineHeight: "4rem",
            }}
          >
            Sign up for your Calendlly account
          </h2>
          <form onSubmit={(e) => handleSignUpSubmit(e)} className="signup_form">
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Name{" "}
                {error && !name && (
                  <span className="error">enter the name</span>
                )}
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
              ></input>
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Email
                {error && !email && (
                  <span className="error">enter the email</span>
                )}
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
              ></input>
            </div>
            <div>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                htmlFor="password"
              >
                Password
                {error && !password && (
                  <span className="error">enter the password</span>
                )}
                {error && password.length < 6 && (
                  <span className="error">password lenth is small</span>
                )}
                <span
                  style={{
                    color: "#372573",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                  }}
                >
                  6 character least
                </span>
              </label>

              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              ></input>
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
              <span>Sign up</span>
            </button>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p className="before_after">OR</p>
            </div>
            <p
              style={{
                color: "rgb(83, 103, 120)",
                fontWeight: "300",
                fontSize: "1rem",
                margin: "12px 0",
              }}
            >
              Easily connect your calender by signing up with your Google{" "}
            </p>
            <button
              onClick={handleGoogleAuth}
              className="google_button"
              style={{ margin: "20px auto" }}
            >
              <span>
                <img src="https://calendly.com/media/googleLogo.svg" alt="" />
              </span>
              <span
                style={{
                  fontSize: "1.2rem",
                  marginRight: "15px",
                  fontWeight: "500",
                }}
              >
                Sign up with Google
              </span>
            </button>
            <Link
              to="/login"
              style={{
                color: "blue",
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
