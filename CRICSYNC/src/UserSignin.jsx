function UserSignin(){
    return(
    
            <div className="signinbox">
                <h2>User Signin</h2>
                <label>Name:</label>
                <input className="input" type="text"></input>
                <label>Email:</label>
                <input  className="input" type="email"></input>
                <label>Mobile no:</label>
                <input className="input" type="text"></input>
                <label>Password:</label>
                <input className="input" type="password"></input>
                <button className="btn">Submit</button>
            </div>
    
    );
}
export default UserSignin