import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../api/authService";
import cheffylogo from "../../assets/cheffy-logo-256x256.png";

function Register() {
  // allows for page redirection
  const navigate = useNavigate();

  // stores the error state
  const [error, setError] = useState(null);

  // stores the form values
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  // every time something is typed
  const handleChange = (e) => {
    setError(null);
    // sets the corresponding value in object based on input
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // prevents form from refreshing the page
    e.preventDefault();

    // we then get form from event and check if its valid
    const form = e.target;
    const isValid = form.checkValidity();

    if (!isValid) {
      setError("invalid-form");
    } else {
      // try to login else set error state
      authService
        .signup(values.username, values.email, values.password)
        .then(() => {
          authService.login(values.email, values.password).then(() => {
            navigate("/");
          });
        })
        .catch((error) => {
          if (error.status === 401) {
            setError("invalid-credentials");
          } else if (error.status === 500) {
            setError("server-error");
          } else if (error.status === 404) {
            setError("connection-error");
          }
        });
    }
  };
  return (
    <>
      <div className={styles.logo}>
        <img src={cheffylogo} />
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <p
            className={`${styles.invalid} ${error != "invalid-credentials" ? "hide" : ""}`}
          >
            The email or password is incorrect
          </p>
          <p
            className={`${styles.invalid} ${error != "server-error" ? "hide" : ""}`}
          >
            There is an issue with our servers
          </p>
          <p
            className={`${styles.invalid} ${error != "connection-error" ? "hide" : ""}`}
          >
            Unable to connect to servers
          </p>
          <div className={styles.doubleRow}>

            <div className={`${styles.row} ${styles.wrap}`}>
              <label htmlFor="email">Email</label>
              <input
                required
                className={`${styles.input} ${error ? styles.error : ""}`}
                onChange={handleChange}
                name="email"
                type="email"
              />
            </div>
            <div className={`${styles.row} ${styles.wrap}`}>
              <label htmlFor="username">Username</label>
              <input
                required
                className={`${styles.input} ${error ? styles.error : ""}`}
                onChange={handleChange}
                name="username"
                type="username"
              />
            </div>
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              required
              className={`${styles.input} ${error ? styles.error : ""}`}
              onChange={handleChange}
              name="password"
              type="password"
            />
          </div>
          <hr />
          <div className={styles.actions}>
            <button className={styles.create}>Create</button>
            <p
              className={`${styles.invalid} ${error != "invalid-form" ? "hide" : ""}`}
            >
              Please provide a valid email and password
            </p>
            <p>
              Already have an account?{" "}
              <Link to="/login" className={styles.clickable}>
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
