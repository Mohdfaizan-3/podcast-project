import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userAction } from "../../store/userSlice";
import { auth, getAuthUserDoc } from "../../utils/firebase.utils";
import "./style.css";

const defaultFormFeilds = {
  email: "",
  password: "",
};

const Login = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { email, password } = formFeilds;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFeilds({
      ...formFeilds,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormFeilds(defaultFormFeilds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await getAuthUserDoc(user);
      const userData = userDoc.data();
      dispatch(
        userAction.setUser({
          email,
          displayName: userData.displayName,
          uid: userData.uid,
        })
      );
      resetFormFields();
      toast.success("logged in successfully");
      navigate("/profile");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          toast("wrong password", {
            className: "error-toast",
          });
          break;
        case "auth/user-not-found":
          toast("user not found", {
            className: "error-toast",
          });
          break;
        default:
          console.error(error);
      }
    }

    resetFormFields();
    setSubmitting(false);
  };
  return (
    <>
      <div className="loginForm-container">
        <h2> login in</h2>

        <form onSubmit={handleSubmit}>
          <input
            autoComplete="true"
            type="email"
            placeholder="enter the email"
            onChange={handleChange}
            value={email}
            required
            name="email"
          />

          <input
            autoComplete="true"
            type="password"
            placeholder="enter the password"
            onChange={handleChange}
            value={password}
            required
            name="password"
          />

          <button type="submit" disabled={isSubmitting}>
            {!isSubmitting ? "log In" : "logging..."}
          </button>
        </form>
        <p>
          Don't have an account ?{" "}
          <span>
            <Link style={{ color: "blue" }} to="/signup">
              Click here to signup
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
