import React from "react";
import './LoginPage.css';

function LoginPage() {
  const adminClick = () => {
    alert("ADMIN LOGIN");
  };

  const userClick = () => {
    alert("USER LOGIN");
  };

  return (

      <>
        <div class="container">
            <h1 className="title">CRIC SYNC</h1>
            <div className="button-group">
          <button className="b1" onClick={adminClick}>ADMIN</button>
          <button className="b1" onClick={userClick}>USER</button>
      </div>
           <p className="footer">© 2025 CricSync. All rights reserved.</p>
      </div>
      </>
  );
}

export default LoginPage;
