import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";
import "../../index.css";
import "../../routes/signup/styles.css";

import { userAction } from "../../store/userSlice";
import {
  createAuthUserFromEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const defaultFormFeilds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { displayName, email, password, confirmPassword } = formFeilds;
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (password !== confirmPassword) {
      toast("password and confirm password doesn't match", {
        className: "error-toast",
      });
      setSubmitting(false);

      return;
    }

    if (password.length < 5) {
      toast("enter password length greater than 5", {
        className: "error-toast",
      });
      setSubmitting(false);

      return;
    }
    try {
      const { user } = await createAuthUserFromEmailAndPassword(
        email,
        password,
        
      );
      const {uid} = user;
      await createUserDocumentFromAuth(user, { displayName });
      dispatch(
        userAction.setUser({
          email,
          displayName,
          uid
        })
      );
      toast.success("signed in succesfully");

      navigate("/profile");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("cannot create user- email already in use", {
          className: "error-toast",
        });
      }else if(error.code === "auth/invalid-email") {
        toast.error('invalid email')
      } else {
        console.log("user creation encountered an error", error);
      }
    }
    resetFormFields();
    setSubmitting(false);
  };
  return (
    <div>
      <div className="SignUpform-container">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input
            autoComplete="true"
            type="text"
            placeholder="enter the name"
            onChange={handleChange}
            value={displayName}
            required
            name="displayName"
          />

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

          <input
            autoComplete="true"
            type="password"
            placeholder="confirm password"
            onChange={handleChange}
            value={confirmPassword}
            required
            name="confirmPassword"
          />

          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "submitting" : "Sign up"}
          </button>
        </form>
        <p>
          Already have an account ?{" "}
          <span>
            <Link style={{ color: "blue" }} to="/login">
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
