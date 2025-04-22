import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isLogin && !formData.name) {
      setError("Please provide your name");
      return;
    }
    router.push("/home");
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="login-container">
      <Head>
        <title>SwipeMate - {isLogin ? "Login" : "Sign Up"}</title>
        <meta
          name="description"
          content={isLogin ? "Login to your account" : "Create a new account"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="auth-wrapper">
        <Link href="/">
          <div className="back-button">← Back to Home</div>
        </Link>

        <div className="auth-card">
          <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p className="subtitle">
            {isLogin
              ? "Login to continue browsing properties"
              : "Sign up to start finding your perfect home"}
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
            </div>

            {isLogin && (
              <div className="forgot-password">
                <a href="#forgot">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="switch-link" onClick={toggleAuthMode}>
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </div>

          <div className="demo-notice">
            <p>
              Demo Account: <br />
              Email: demo@swipemate.com <br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
