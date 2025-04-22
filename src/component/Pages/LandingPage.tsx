import { Link } from "react-router-dom";
import { CodeResponse, NonOAuthError, useGoogleLogin } from "@react-oauth/google";
import { config } from "../../config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setProfileData } from "../../redux/profileSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { GoogleAuthAxiosResponse } from "@/constant";
const serverBaseUrl = config.serverBaseUrl;

const LandingPage = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <section className="landing_page">
      <div style={{ width: "100%" }}>
        <div className="left_landingpage">
          <h1
            style={{
              fontSize: "4.5rem",
              color: "#0B3558",
              fontWeight: "600",
              lineHeight: "5rem",
            }}
          >
            Easy scheduling ahead
          </h1>
          <p
            style={{
              color: "rgb(83, 103, 120)",
              fontWeight: "300",
              fontSize: "1.2rem",
              margin: "24px 0",
            }}
          >
            Join 20 Million professionals who easily book meeting with the #1
            scheduling tool.
          </p>
          <div style={{ width: "fit-content" }}>
            <div
              onClick={() => handleGoogleAuth()}
              style={{ margin: "20px 0" }}
            >
              <button className="google_button">
                <span>
                  <img src="https://calendly.com/media/googleLogo.svg" alt="" />
                </span>
                <span
                  style={{
                    fontSize: "1.2rem",
                    marginRight: "30px",
                    fontWeight: "500",
                  }}
                >
                  Sign up with Google
                </span>
              </button>
            </div>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Link
                style={{
                  color: "#004EBA",
                  fontSize: "13px",
                  textDecoration: "underline",
                }}
                to="/signup"
              >
                Sign up free with email.
              </Link>
              <h6 style={{ fontSize: "13px", fontWeight: "400" }}>
                No credit card required
              </h6>
            </div>
          </div>
        </div>
        <div className="right_landingpage">
          <div>
            <h3 style={{ padding: "2rem", fontSize: "2rem" }}>
              Share your Booking Page
            </h3>
            <img
              className="booking_image"
              src="https://marketing-assets.calendly.com/_next/static/media/share-booking-page.382f2a71.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
