import { useState } from "react";
function Register()
{
    
    const team=[
        {
          id:"Team Details :",
          type:"Heading"

        },
        {
            id:"TeamName:",
            type:"text",
            placeholder: "Enter your team name",
            required:true

        },
        {
          id: "Upload Profile Picture",
          type: "image",
          required: false
       },

        {
            id:"Agegroup:",
            type:"select",
            required:true,
            options:["under-18","under-19","open"]
        },
        {
            id:"Number of players:",
            type:"text",
            placeholder: "Enter no of Players",
            required:true
        },
        {
            id:"District:",
            type:"text",
            placeholder: "Enter your District",
            required:true
        },
        {
           id:"Team captain / Manager Details:",
           type:"Heading"
        },
        {   id:"Role:",
            type:"radio",
            required:true,
            options:["Team Captain ","Manager"]
        },
        {
            id:"Fullname:",
            placeholder: "Enter the Fullname",
            type:"text",
            required:true

        },
        {
            id:"Email:",
            type:"email",
            placeholder: "example@email.com",
            required:true
        },
        {
            id:"Mobileno:",
            type:"text",
            placeholder: "Enter moblie no:",
            required:true

        },
        {
          id:"Alternate Mobile no:",
          type:"text",
          placeholder: "alternate mobile no:",
          required:true
        },
        {
          id:"Addhar Number:",
          type:"text",
          placeholder: "Enter Addhar no ",
          required:true
        },

        {
            id:"Password:",
            type:"password",
            placeholder: "Create strong Password",
            required:true
        },
        {
          id:"Confirm Password:",
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
            id:"Email:",
            type:"email",
            placeholder: "Enter your email id",
            required:true
        },
        {
            id:"Mobileno:",
            type:"text",
            placeholder: "Enter your mobile no",
            required:true

        },
        {
           id:"Password:",
            type:"password",
            placeholder: "Create Strong Password ",
            required:true
        },
        {
          id:"Confirm Password:",
          type:"password",
          placeholder: "re-enter the Password",
          required:true

        },
        {
          id:"Terms & conditions",
          type:"checkbox"

        }
      
    ]



    const [Users,setuser]=useState(team)
    const [formValues, setFormValues] = useState({});
    const [activeRole, setActiveRole] = useState(team);
    const [previewImage, setPreviewImage] = useState(null);



    const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormValues({...formValues,[name]: type === "checkbox" ? checked : value});
  };


  const handleImageChange = (e, fieldId) => {
  const file = e.target.files[0];
  if (file) {
    setFormValues({
      ...formValues,
      [fieldId]: file,  
    });

    
    const reader = new FileReader();
    reader.onload = () => {
      setFormValues((prev) => ({
        ...prev,
        [`${fieldId}_preview`]: reader.result, 
      }));
    };
    reader.readAsDataURL(file);
  }
};



    const comp = Users.map((field, index) => (
        <div key={index} className="w-full mb-4">
        {field.type ==="Heading" ?(
          <h1 className="text-[20px]  font-bold font-sans m-5  p-1  text-gray-500 rounded-[2px] shadow-sm  bg-gray-100">{field.id}</h1>
        ): field.type === "checkbox" ? (
          <div className=" flex text-[15px] font-bold font-sans m-5 text-green-950">
          
            <input className="w-[20px] accent-green-400"
              type="checkbox"
              name={field.id}
              checked={ formValues[field.id]||false}
              required={field.required}
              onChange={handleChange}
            />
            <label className="text-slate-700 font-sans ml-5">{field.id ==="Terms & conditions" ? (<div className="flex"><p className="display-inline">By clicking this i agree to the </p><a href="/terms" target="_blank" className="text-blue-600 underline">
         Terms & Conditions
        </a></div>):( field.id)}</label>
            
            </div>
          ):(<label className="text-slate-700 font-sans ml-5 block">{field.id}</label>)
        }

        
        {(
        field.type === "text" || field.type === "email" || field.type === "password"|| field.type==="date") && (
            <input
              className="p-2  border-2 border-slate-300 ml-5 mt-1  rounded-lg shadow-sm  focus:ring-emerald-500 text-base bg-white w-[90%]"
              type={field.type}
              name={field.id}
              placeholder={field.placeholder}
              value={formValues[field.id] || ""}
              required={field.required}
               onChange={handleChange}

            />
          )} 
          {field.type === "radio" && (<div className="flex flex-wrap ml-5 gap-4 mt-2">
            {
            field.options.map((option, idx) => (
              
              <label key={idx} className="flex items-center gap-2" >
                <input className="accent-green-300"
                  type="radio"
                  name={field.id}
                  checked={formValues[field.id] === option}
                  required={field.required}
                  onChange={handleChange}
                  value={option} 
                />
                {option}
              </label>
              
        

            ))}
            </div>
          ) } {field.type === "select" && (
            <select
            className="m-[20px] mb-[20px] p-[10px] pr-[50px] bg-green-700 text-white rounded-[20px]"
              name={field.id}
              value={formValues[field.id] || ""}
              onChange={handleChange}
              required={field.required}
            >
              <option value="" >Select</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          )}

          {field.type === "image" && (
  <div className="ml-5 mt-2">
    <input type="file" accept="image/*" onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({ ...formValues, [field.id]: file }); 
    }
  }}
  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
/>

  </div>

  
)}

      {formValues[`${field.id}_preview`] && (
  <img
    src={formValues[`${field.id}_preview`]}
    alt="Preview"
    className="m-auto w-32 h-32 object-cover rounded-full border"
  />
)}


        </div>
      ))

    return (
      //-----------------start------------------
  
        //bg-[#c2fff8]  #b2dbec    bg-gradient-to-r from-[#00ffff] to-white  #e1ebeb
        <div className=" bg-center bg-cover bg-no-repeat bg-fixed p-[50px]" >
              

              <div className=" m-auto  flex flex-col w-1/4 min-w-[500px] bg-white   pt-0 pl-0 p-4 pr-0  border border-slate-300 shadow-black shadow-sm rounded-[10px] text-slate-700 font-medium">
                  
                  <div >
                        <p className="text-center mt-3 mb-3 text-black font-semibold">SignUp as?</p>
                        <div className="flex flex-nowrap justify-center">
                          <button className="px-6 py-2 border-2 border-green-600 text-green-700 font-semibold rounded-full bg-white hover:bg-green-600 hover:text-white hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" onClick={()=>changeUser(user)}>User</button>
                          <p className="m-2">or</p>
                          <button className="px-6 py-2 border-2 border-green-600 text-green-700 font-semibold rounded-full bg-white hover:bg-green-600 hover:text-white hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" onClick={()=>changeUser(team)}>Team</button>        
                        </div>
                       </div>

                
                  <h1 className="text-[30px] text-center font-bold font-sans m-5 text-green-700">
                  {activeRole === "user" ? "User SignUp!" : " Team SignUp!"}
                  </h1>

                 
                  {comp}
                  <>
        
      </>

                  <div className=" flex flex-row justify-around flex-wrap">

                    <button className="px-[40px] py-[10px] mb-[30px] bg-green-800 text-white rounded-[20px] font-sans">Submit</button>
                    <button className="px-[40px] py-[10px] mb-[30px] bg-green-800 text-white rounded-[20px] font-sans">Clear</button>        
                  </div>
            </div>
        </div>
            
    
    )
    

    function changeUser(user)
    {
        setuser(user)
        setFormValues({});
        setActiveRole(user === team ? "team" : "user");
        setPreviewImage(null)
    }


    

    

}
export default Register;