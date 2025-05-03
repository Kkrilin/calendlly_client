import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import { toast } from 'react-hot-toast';
import { googleAuthUrl, signUpUrl } from '../../api';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const payload = {
    name,
    email,
    password,
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('error in the signup');
      return;
    }

    if (password.length < 6) {
      setError('error in the signup');
      return;
    }

    try {
      const signUpRes = await axios.post(signUpUrl, payload);
      localStorage.setItem('token', signUpRes.data.token);
      navigate('/user/event-type');
    } catch (error) {
      setError(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    flow: 'auth-code',
    scope: 'openid email profile https://www.googleapis.com/auth/calendar.events',
    access_type: 'offline',
    prompt: 'consent',
    onSuccess: async ({ code }) => {
      console.log('code', code);
      try {
        const res = await axios.post(googleAuthUrl, { code });
        localStorage.setItem('token', res.data.token);
        navigate('/user/event-type');
      } catch (error) {
        toast.error(error.response.data.message);

        setError(error.message);
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
              fontSize: '3.2rem',
              color: '#0B3558',
              fontWeight: '600',
              lineHeight: '4rem',
            }}
          >
            Sign up for your Calendlly account
          </h2>
          <form onSubmit={handleSignUpSubmit} className="signup_form">
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Name {error && !name && <span className="error">enter the name</span>}
              </label>
              <input
                id="name"
                value={name}
                onInput={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
              ></input>
            </div>
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
              <span>Sign up</span>
            </button>
          </form>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
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
            <p
              style={{
                color: 'rgb(83, 103, 120)',
                fontWeight: '300',
                fontSize: '1rem',
                margin: '12px 0',
              }}
            >
              Easily connect your calender by signing up with your Google{' '}
            </p>
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
                Sign up with Google
              </span>
            </button>
            <Link
              to="/login"
              style={{
                color: 'blue',
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
