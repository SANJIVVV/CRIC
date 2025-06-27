import { useState } from "react";
import Login from './assets/Loginpg.jpeg';
import { EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

function TeamLogin() {
  const team = [
    { id: "name", type: "text", placeholder: "Enter your team name", required: true },
    { id: "Password", type: "password", placeholder: "Enter your password", required: true },
  ];

  const navigate=useNavigate();

  const user = [
    { id: "Email id or Mobile number", type: "text", placeholder: "Enter your email id or mobile number", required: true },
    { id: "Password", type: "password", placeholder: "Enter your password", required: true },
  ];

  const [Users, setUser] = useState(user);
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validationSchema = Yup.object().shape(
    Users.reduce((schema, field) => {
      if (field.id === "Email id or Mobile number") {
        schema[field.id] = Yup.string()
          .test("email-or-phone", "Enter a valid email or 10-digit mobile number", function (value) {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
            const isPhone = /^[0-9]{10}$/.test(value || "");
            return isEmail || isPhone;
          })
          .required("This field is required *");
      } else if (field.type === "password") {
        schema[field.id] = Yup.string().required("Password is required *");
      } else {
        schema[field.id] = Yup.string().required("This field is required *");
      }
      return schema;
    }, {})
  );

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const formattedErrors = {};
      err.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const isUserLogin = Users.some((f) => f.id === "Email id or Mobile number");
    const loginEndpoint = "http://localhost:5000/login";
    const role = isUserLogin ? "user" : "team";

    const identifier = isUserLogin
      ? formData["Email id or Mobile number"]
      : formData["name"];

    const password = formData["Password"];

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, role }),
      });

      const result = await response.json();

      if (response.ok) {
        setLoginMessage(result.message);
        setLoginSuccess(true);
        navigate("/");
      } else {
        setLoginMessage(result.message);
        setLoginSuccess(false);
      }

      setFormData({});
    } catch (error) {
      alert("Error connecting to server: " + error.message);
      setFormData({});
    }

  };

  const comp = Users.map((field, index) => {
    const isPasswordField = field.id.toLowerCase().includes("password");
    const inputType = isPasswordField ? (show ? "text" : "password") : "text";

    return (
      <div key={index} className="flex flex-col mb-4">
        <label className="mb-2 font-medium">{field.id}</label>
        <div className="relative">
          <input
            className={`p-3 border ${errors[field.id] ? "border-red-500" : "border-slate-300"} rounded-lg w-full ${isPasswordField ? "pr-10" : ""}`}
            type={inputType}
            name={field.id}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={handleChange}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-emerald-600"
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        {errors[field.id] && <p className="text-sm text-red-600 mt-1">{errors[field.id]}</p>}
        {isPasswordField && (
          <div className="text-right mt-1">
            <button
              type="button"
              className="text-sm text-emerald-600 hover:underline hover:text-emerald-700"
              onClick={() => alert("Forgot Password")}
            >
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    );
  });

  function changeUser(userType) {
    setUser(userType);
    setFormData({});
    setErrors({});
    setShow(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="flex max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-300 w-full">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Login Portal</h2>
          <p className="text-sm text-slate-600 text-center mb-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <button
              className="px-4 py-2 border border-emerald-500 text-emerald-700 font-semibold rounded-md hover:bg-emerald-50"
              onClick={() => changeUser(user)}
            >
              User Login
            </button>
            <button
              className="px-4 py-2 border border-emerald-500 text-emerald-700 font-semibold rounded-md hover:bg-emerald-50"
              onClick={() => changeUser(team)}
            >
              Team Login
            </button>
          </div>

          {comp}

          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 shadow"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          {loginMessage && (
            <p
              className={`mt-4 text-center text-sm font-semibold ${
                loginSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {loginMessage}
            </p>
          )}
        </div>

        <div className="hidden md:block w-1/2">
          <img src={Login} alt="Login Visual" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default TeamLogin;
