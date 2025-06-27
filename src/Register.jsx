import { useState } from "react";
import { useRef } from "react";
import { EyeOff, Eye, User } from "lucide-react";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
function Register()
{
    
    const team=[
        {
          id:"Team Details",
          type:"Heading"

        },
        {
            id:"Name",
            type:"text",
            placeholder: "Enter your team name",
            required:true

        },
        {
          id: "Upload Team Logo",
          type: "image",
          required: false
       },

        {
            id:"Agegroup",
            type:"select",
            required:true,
            options:["under-18","under-19","open"]
        },
        {
            id:"Number of players",
            type:"text",
            placeholder: "Enter no of Players",
            required:true
        },
        {
            id:"District",
            type:"text",
            placeholder: "Enter your District",
            required:true
        },
        {
           id:"Team captain / Manager Details",
           type:"Heading"
        },
        {   id:"Role",
            type:"radio",
            required:true,
            options:["Team Captain ","Manager"]
        },
        {
            id:"Fullname",
            placeholder: "Enter the Fullname",
            type:"text",
            required:true

        },
        {
            id:"Email",
            type:"email",
            placeholder: "example@email.com",
            required:true
        },
        {
            id:"Mobileno",
            type:"text",
            placeholder: "Enter moblie no:",
            required:true

        },
        {
          id:"Alternate Mobile no",
          type:"text",
          placeholder: "alternate mobile no:",
          required:true
        },
        {
          id:"Aadhar Number",
          type:"text",
          placeholder: "Enter Addhar no ",
          required:true
        },

        {
            id:"Password",
            type:"password",
            placeholder: "Create strong Password",
            required:true
        },
        {
          id:"Confirm Password",
          type:"password",
          placeholder: "re-enter the Password",
          required:true

        },
        {
          id:"Terms & conditions",
          type:"checkbox"

        }
    
    ]

    const user=[
        {
            id:"Name",
            type:"text",
            placeholder: "Enter your Name",
            required:true

        },
        
        {
            id:"Email",
            type:"email",
            placeholder: "Enter your email id",
            required:true
        },
        {
            id:"Mobileno",
            type:"text",
            placeholder: "Enter your mobile no",
            required:true

        },
        {
           id:"Password",
            type:"password",
            placeholder: "Create Strong Password ",
            required:true
        },
        {
          id:"Confirm Password",
          type:"password",
          placeholder: "re-enter the Password",
          required:true

        },
        {
          id:"Terms & conditions",
          type:"checkbox"

        }
      
    ]

    const [Users,setuser]=useState(user)
    const [formValues, setFormValues] = useState({});
    const [activeRole, setActiveRole] = useState("user");
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(); // to reset the input manually

     
    const navigate=useNavigate()
    
    const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormValues({...formValues,[name]: type === "checkbox" ? checked : value});
    
  };

const handleImageChange = (e, fieldId) => {
  const file = e.target.files[0];

  if (!file) {
    // User clicked "Cancel" from file dialog
    setFormValues((prev) => {
      const updated = { ...prev };
      delete updated[fieldId];
      delete updated[`${fieldId}_preview`];
      return updated;
    });
    return;
  }

  // Set file
  setFormValues((prev) => ({ ...prev,  [fieldId]: file,}));

  // Set preview
  const reader = new FileReader();
  reader.onload = () => {
    setFormValues((prev) => ({
      ...prev,
      [`${fieldId}_preview`]: reader.result,
    }));
  };
  reader.readAsDataURL(file);
};

const handleCancelUpload = (fieldId) => {
  setFormValues((prev) => {
    const updated = { ...prev };
    delete updated[fieldId];
    delete updated[`${fieldId}_preview`];
    return updated;
  });

  // Reset file input
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};

 
const Districts = ["Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"];

const buildValidationSchema = (Users) => {
  const shape = {};

  Users.forEach((field) => {
    const name = field.id;
    const type = field.type.toLowerCase();
    let validator = Yup.string();

    if (field.required) {
      validator = validator.required("This field is required *");
    }

    if (name.toLowerCase().includes("email")) {
      validator = validator.email("Invalid email format");
    }

    if (name.toLowerCase().includes("mobile")) {
      validator = Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
        .required("Mobile number is required *");
    }

    if (name.toLowerCase().includes("aadhar")) {
      validator = Yup.string()
        .matches(/^[0-9]{12}$/, "Aadhar number must be 12 digits")
        .required("Aadhar number is required *");
    }

    if (name.toLowerCase().includes("district")) {
  validator = Yup.string()
    .required("District is required *")
    .oneOf(Districts, "Enter a valid district");
}

    if (name.toLowerCase().includes("players")) {
      validator = Yup.number()
        .typeError("Must be a number")
        .max(20, "Maximum 20 players allowed")
        .required("This field is required *");
    }

    if (name.toLowerCase() === "password") {
      validator = Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
        )
        .required("Password is required *");
    }

    if (name.toLowerCase() === "confirm password") {
      validator = Yup.string()
        .oneOf([Yup.ref("Password")], "Password didn't matched")
        .required("Please confirm your password *")
    }

    if (type === "checkbox") {
     validator = Yup.boolean()
    .required("You must select this field*")
    .oneOf([true], "You must select this field*");
}

    if (type === "select" || type === "radio") {
      validator = validator.required("Please select an option *");
    }

    if (type === "image") {
      validator = Yup.mixed()
    .required("Image is required *")
    .test("fileExists", "Image is required *", (value) => {
      return value instanceof File;
    })
    .test("fileType", "Only JPG/PNG images are allowed", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    })
      
    }
    shape[name] = validator;
  });

  return Yup.object().shape(shape);
};
const validationSchema = buildValidationSchema(Users);

const validateForm = async () => {
  try {
    await validationSchema.validate(formValues, { abortEarly: false });
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

const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = await validateForm();

  if (isValid) {
    console.log("Form submitted", formValues);


    try {
      const formData = new FormData();

  // Append each field from formValuesY
      for (const key in formValues) {
       if (formValues.hasOwnProperty(key) && key != "Upload Team Logo_preview") {
       const cleanKey = key.trim().toLowerCase().replace(/\s+/g, '');
       formData.append(cleanKey, formValues[key]);
       }
      }
      formData.append("userrole",activeRole);
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body:  formData
      });

      if (response.ok) {
        console.log("Form submitted", formValues);
        alert("Registered Successfully! Go to login page.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error from server:", errorData.message);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check your connection.");
    }
  }
    
   else {
    console.log("Fix validation errors first");
  }
};

const comp = Users.map((field, index) => {
  const isPasswordField =
    field.type === "password" && field.id.toLowerCase().includes("password");
  const inputType = isPasswordField ? (show ? "text" : "password") : field.type;

  return (
    <div key={index} className="w-full mb-4">
      {field.type === "Heading" ? (
        <h1 className="text-[20px] font-bold font-sans m-5 p-1 text-gray-500 rounded-[2px] shadow-sm bg-gray-100">
          {field.id}
        </h1>
      ) : field.type === "checkbox" ? (
      <>
        <div className="flex text-[15px] font-bold font-sans m-5 text-green-950">
          <input
            className="w-[20px] accent-green-400" type="checkbox" name={field.id} checked={formValues[field.id] || false}
            onChange={handleChange}
          />
          <label className="text-slate-700 font-sans ml-5">
            {field.id === "Terms & conditions" ? (
              <div className="flex">
                <p className="inline">By clicking this I agree to the </p>
                <Link to="/terms" className="text-blue-600 underline ml-1"> Terms & Conditions</Link>
              </div>
            ) : (
              field.id
            )}
          </label>
          
        </div>
        {errors[field.id] && (
            <p className="text-red-600 text-sm ml-5 mt-1">{errors[field.id]}</p>
          )}
          </>
      ) : (
        <label className="text-slate-700 font-sans ml-5 block">{field.id}:</label>
      )}

      {(field.type === "text" || field.type === "email" || field.type === "date") && (
        <>
          <input
            className="p-2 border-2 border-slate-300 ml-5 mt-1 rounded-lg shadow-sm focus:ring-emerald-500 text-base bg-white w-[90%]"
            type={field.type} name={field.id} placeholder={field.placeholder} value={formValues[field.id] || ""}
            required={field.required} onChange={handleChange}
          />
          {errors[field.id] && (
            <p className="text-red-600 text-sm ml-5 mt-1">{errors[field.id]}</p>
          )}
        </>
      )}

      {field.type === "password" && (
        <div className="relative w-full mb-4">
          <input
            className="p-2 border-2 border-slate-300 ml-5 mt-1 rounded-lg shadow-sm focus:ring-emerald-500 text-base bg-white w-[90%]"
            type={show ? "text" : "password"} name={field.id} placeholder={field.placeholder} value={formValues[field.id] || ""} required={field.required}
            onChange={handleChange}
          />
          {errors[field.id] && (
            <p className="text-red-600 text-sm ml-5 mt-1">{errors[field.id]}</p>
          )}
          <button
            type="button" onClick={() => setShow((prev) => !prev)}
            className="absolute right-10 top-[25px] transform -translate-y-1/2 hover:text-emerald-600"
          >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      )}

      {field.type === "radio" && (
        <>
          <div className="flex flex-wrap ml-5 gap-4 mt-2">
            {field.options.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input className="accent-green-300" type="radio"  name={field.id} checked={formValues[field.id] === option}
                  required={field.required} onChange={handleChange} value={option}
                />
                {option}
              </label>
            ))}
          </div>
          {errors[field.id] && (
            <p className="text-red-600 text-sm ml-5 mt-1">{errors[field.id]}</p>
          )}
        </>
      )}

      {field.type === "select" && (
        <>
          <select
            className="m-[20px] mb-[20px] p-[10px] pr-[50px] bg-green-700 text-white rounded-[20px]"
            name={field.id} value={formValues[field.id] || ""} onChange={handleChange} required={field.required}
          >
            <option value="">Select</option>
            {field.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors[field.id] && (
            <p className="text-red-600 text-sm ml-5 mt-1">{errors[field.id]}</p>
          )}
        </>
      )}

      {field.type === "image" && (
  <div className="ml-5 mt-2">
    <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleImageChange(e, field.id)} 
    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
    />
    {formValues[`${field.id}_preview`] && (
      <div className="mt-4">
        <img
          src={formValues[`${field.id}_preview`]}
          alt="Preview"
          className="m-auto w-32 h-32 object-cover rounded-full border"
        />
        <button
          type="button" onClick={() => handleCancelUpload(field.id)} className="mt-3 bg-red-400 p-1 text-white rounded-md hover:bg-red-700" >Remove image </button>
      </div>
    )}
    {errors[field.id] && (
      <p className="text-red-600 text-sm ml-5 mt-1">{errors[field.id]}</p>
    )}
  </div>
)}

    </div>
  );
});

    return (
<div
    className="min-h-screen bg-cover bg-center flex justify-center items-start pt-[50px]"
    style={{ backgroundImage: "url('/bg-register.jpg')" }}
  >                 <div className="m-auto flex flex-col  min-w-[32px] max-w-[500px] bg-white p-4 border border-slate-300 shadow-black shadow-sm rounded-[10px] text-slate-700 font-medium">
 
                  <div >
                        <p className="text-center mt-3 mb-3 text-black font-semibold">SignUp as?</p>
                        <div className="flex flex-nowrap justify-center">
                          <button className="px-6 py-2 border-2 border-green-600 text-green-700 font-semibold rounded-full bg-white hover:bg-green-600 hover:text-white hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2" onClick={()=>changeUser(user)}>User</button>
                          <p className="m-2">or</p>
                          <button className="px-6 py-2 border-2 border-green-600 text-green-700 font-semibold rounded-full bg-white hover:bg-green-600 hover:text-white hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2" onClick={()=>changeUser(team)}>Team</button>        
                        </div>
                       </div>
                
                  <h1 className="text-[30px] text-center font-bold font-sans m-5 text-green-700">
                  {activeRole === "user" ? "User SignUp!" : " Team SignUp!"}
                  </h1>              
                  {comp}                            
                <div className="flex flex-row justify-around flex-wrap">
                  <button
                    className="px-[40px] py-[10px] mb-[30px] bg-green-600 hover:bg-green-800  text-white rounded-[20px] font-sans"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="px-[40px] py-[10px] mb-[30px] bg-green-600 hover:bg-green-800  text-white rounded-[20px] font-sans"
                    onClick={() => {
                      setFormValues({});
                      setErrors({});
                    }}
                  >
                    Clear all
                  </button>
                </div>              
            </div>
        </div>
            
    )

    function changeUser(role)
    {  
        setuser(role);
        const newFormValues = {};
       role.forEach((field) => {
       if (field.type === "checkbox") {
         newFormValues[field.id] = false;
        }
       
       });
        setFormValues(newFormValues);
        setActiveRole(role === team ? "team" : "user");
        setErrors({});
    }
}
export default Register;