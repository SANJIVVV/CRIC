function TeamRegister()
{
    return(
        <div className="signinbox">
            <h2>Team Registeration</h2>
                <label>Team Name:</label>
                <input className="input" type="text"></input>
                <label>Captain Name:</label>
                <input  className="input" type="email"></input>
                <label>Email:</label>
                <input className="input" type="text"></input>
                <label>Mobile no:</label>
                <input className="input" type="text"></input>
                <label>Number of Players:</label>
                <input className="input" type="text"></input>
                <label>District:</label>
                <input className="input" type="text"></input>
                <label>Age group:</label>
                <select  className="selectbox "name="Age">
                    <option value="Under-16">Under-18</option>
                    <option value="Under-19">Under-19</option>
                    <option value="Open">Open</option>
                </select>
                <label>Password:</label>
                <input className="input" type="password"></input>
                <div className="submitbtn">
                <button className="btn">Submit</button>
                <button className="btn">Clear</button>
                </div>
        </div>
    );
}
export default TeamRegister;