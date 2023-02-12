import React from "react";

// eslint-disable-next-line react/prop-types
function Input({ message, setMessage, sendMessage }) {
  return (
    <div className="inputBox">
      <form className="inputForm">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name="message"
            value={message}
            placeholder="Enter text to send..."
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => sendMessage(e)}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Input;
