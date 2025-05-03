import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { googleAuthUrl, loginUrl } from '../../api';
import BackDropLoader from '../Utils/Loader/BackDropLoader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const payload = {
    email,
    password,
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('error in the signup');
      return;
    }

    if (password.length < 6) {
      setError('error in the signup');
      return;
    }

    try {
      setOpen(true);
      const loginRes = await axios.post(loginUrl, payload);
      localStorage.setItem('token', loginRes.data.token);
      navigate('/user/event-type');
    } catch (error) {
      setError(error.message);
      toast.error(error.response.data.message);
    } finally {
      setOpen(false);
    }
  };

  const navigate = useNavigate();
  const handleGoogleAuth = useGoogleLogin({
    flow: 'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/calendar.events',
    access_type: 'offline',
    prompt: 'consent',
    onSuccess: async ({ code }) => {
      try {
        setOpen(true);
        const res = await axios.post(googleAuthUrl, { code });
        localStorage.setItem('token', res.data.token);
        navigate('/user/event-type');
      } catch (error) {
        toast.error(error.response.data.message);
        setError(error.message);
      } finally {
        setOpen(false);
      }
    },
    onError: (error) => setError(error.message),
    onNonOAuthError: (error) => setError(error.message),
  });

  return (
    <section className="signup_page">
      <div>
        <div>
          <h2
            style={{
              fontSize: '2.5rem',
              color: '#0B3558',
              fontWeight: '600',
              lineHeight: '4rem',
            }}
          >
            Login to your account
          </h2>
          <form onSubmit={handleLoginSubmit} className="login_form">
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Email
                {error && !email && <span className="error">enter the email</span>}
              </label>
              <input
                id="email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
              ></input>
            </div>
            <div>
              <label
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                htmlFor="password"
              >
                Password
                {error && !password && <span className="error">enter the password</span>}
                {error && password.length < 6 && (
                  <span className="error">password lenth is small</span>
                )}
                <span
                  style={{
                    color: '#372573',
                    fontWeight: '300',
                    fontSize: '0.875rem',
                  }}
                >
                  6 character least
                </span>
              </label>

              <input
                id="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              ></input>
            </div>
            <BackDropLoader open={open}>
              <button
                className="google_button"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  padding: '1rem 40%',
                  textAlign: 'center',
                  width: '100%',
                  margin: '20px 0',
                  display: 'grid',
                  placeItems: 'center',
                }}
                type="submit"
              >
                <span>Log In</span>
              </button>
            </BackDropLoader>
          </form>
          <div>
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p className="before_after">OR</p>
            </div>
            <BackDropLoader open={open}>
              <button
                onClick={handleGoogleAuth}
                className="google_button"
                style={{ margin: '20px auto' }}
              >
                <span>
                  <img src="https://calendly.com/media/googleLogo.svg" alt="" />
                </span>
                <span
                  style={{
                    fontSize: '1.2rem',
                    marginRight: '15px',
                    fontWeight: '500',
                  }}
                >
                  Log In with Google
                </span>
              </button>
            </BackDropLoader>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>Don&apos;t have an account?</span>
              <span>
                <Link to="/signup" style={{ color: 'blue' }}>
                  Sign up for free
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
