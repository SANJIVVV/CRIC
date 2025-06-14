import { useState } from "react";
import Login from './assets/Login.jpg';
import validator from "validator";
import { EyeOff, Eye } from "lucide-react";

function TeamLogin() {
  const team = [
    {
      id: "Team Name",
      type: "text",
      placeholder: "Enter your team name",
      required: true,
    },
    {
      id: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const user = [
    {
      id: "Email id or Mobile number",
      type: "text",
      placeholder: "Enter your email id or mobile number",
      required: true,
    },
    {
      id: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const [Users, setUser] = useState(user);
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const comp = Users.map((field, index) => {
    const isPasswordField = field.id.toLowerCase().includes("password");
    const inputType = isPasswordField ? (show ? "text" : "password") : "text";

    return (
      <div key={index} className="flex flex-col mb-4">
        <label className="mb-2 font-medium">{field.id}</label>

        <div className="relative">
          <input
            className={`p-3 border border-slate-300 rounded-lg w-full ${isPasswordField ? "pr-10" : ""}`}
            type={inputType}
            name={field.id}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            required={field.required}
            onChange={handleChange}
          />

          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShow(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2  hover:text-emerald-600"
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>

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
    setShow(false); 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="flex max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-300 w-full">
        <div className="w-full md:w-1/2 p-8">
          <div>
            <h2 className="text-3xl font-bold decoration-green-100 text-center text-slate-800 mb-6">Login Portal</h2>

            <p className="text-sm text-slate-600 text-center mb-6">
              Do you have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>

            <div className="flex justify-center gap-4 mb-8">
              <button
                className="px-4 py-2 bg-white border border-emerald-500 text-emerald-700 font-semibold rounded-md hover:bg-emerald-50"
                onClick={() => changeUser(user)}
              >
                User Login
              </button>
              <button
                className="px-4 py-2 bg-white border border-emerald-500 text-emerald-700 font-semibold rounded-md hover:bg-emerald-50"
                onClick={() => changeUser(team)}
              >
                Team Login
              </button>
            </div>

            {comp}

            <div className="flex justify-center mt-4">
              <button
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 shadow"
                onClick={() => {
                  const identifier = formData["Email id or Mobile number"];
                  if (identifier) {
                    const isEmail = validator.isEmail(identifier);
                    const isMobile = validator.isMobilePhone(identifier, 'en-IN');

                    if (isEmail) {
                      alert("Valid Email ID");
                    } else if (isMobile) {
                      alert("Valid Mobile Number");
                    } else {
                      alert("Invalid Email ID or Mobile Number");
                    }
                  } else {
                    alert("Please enter Email ID or Mobile Number");
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-1/2">
          <img
            src={Login}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default TeamLogin;
