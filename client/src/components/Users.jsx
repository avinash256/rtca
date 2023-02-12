/* eslint-disable react/prop-types */
import React from "react";
import onlineIcon from "../icons/onlineIcon.png";

function Users({ users }) {
  return (
    <div className="users rounded">
      {users ? (
        <div>
          <h4>Active users:</h4>
          <div className="activeContainer">
            <h5>
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  {name}
                  <img alt="Online Icon" src={onlineIcon} />
                </div>
              ))}
            </h5>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Users;
