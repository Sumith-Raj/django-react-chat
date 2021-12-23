import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { userActions } from "../_actions/user.actions";
import "../Styles/style.css";

function HomePage() {
  const [submitted, setSubmitted] = useState(false);
  const storeduser = useSelector((state) => state.authentication.user);
  const username = storeduser.user.username;

  const [chatinput, setChat] = useState({
    message: "",
    senduser: username,
    replieduser: "",
  });

  const user = useSelector((state) => state.user);
  const details = user.detail?.message;

  const userlist = useSelector((state) => state.userlist);
  const list = userlist.detail?.message;

  // const replieduser= chatinput.replieduser
  console.log("senduser", username);
  console.log("replieduser", chatinput.replieduser);
  //details?.[0]
  console.log(details);

  function handleChange(e) {
    const { name, value } = e.target;
    setChat((chatinput) => ({ ...chatinput, [name]: value }));
  }

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (chatinput.message) {
      dispatch(userActions.postUserChat(chatinput));
      setChat((chatinput) => ({ ...chatinput, message: "" }));
      setTimeout(() => {
        document.getElementById("chatbox1").scrollTop =
          document.getElementById("chatbox1").scrollHeight;
      }, 1000);
    }
  }

  useEffect(() => {
    dispatch(userActions.getUserList());
    setInterval(() => {
      localStorage.getItem("replieduser") != null &&
        dispatch(
          userActions.getUserChat(username, localStorage.getItem("replieduser"))
        );
    }, 1000);
  }, []);

  return (
    <>
      <div id="sidebox">
        <div id="info">
          {/* {user.loading && <em>Loading user...</em>} */}
          {/* {user.error && <span className="text-danger">ERROR: {user.error}</span>}  */}
          <p>
            Username : <b>{username}</b>
          </p>
          <p>
            Email : <b>{storeduser.user.email}</b>
          </p>
          <button className="btn btn-md btn-info">
            <a
              href="/login"
              style={{
                padding: "5px",
                textDecoration: "none",
                color: "white",
                fontSize: "large",
                fontWeight: "bolder",
              }}
            >
              Logout
            </a>
          </button>
          <hr />
          {list ? (
            list?.map((k, i) => (
              <Fragment key={i}>
                <button
                  className="btn btn-md btn-info"
                  title="Click again to see latest message"
                  onClick={() => {
                    chatinput.replieduser = k?.username;
                    localStorage.setItem("replieduser", k?.username);
                    // setInterval(() => {
                    dispatch(
                      userActions.getUserChat(username, chatinput.replieduser)
                    );
                    // }, 1000);
                    setTimeout(() => {
                      document.getElementById("chatbox1").scrollTop =
                        document.getElementById("chatbox1").scrollHeight;
                    }, 1000);
                  }}
                >
                  {k?.username}
                </button>
              </Fragment>
            ))
          ) : (
            <p style={{ color: "red" }}>No Users to display</p>
          )}
        </div>
      </div>
      {localStorage.getItem("replieduser") ? (
      <><h3 id="sentto">{localStorage.getItem("replieduser")} </h3>
      <div className="chatbox" id="chattingbox">
          <div id="chatbox1">

           { details?.map((k, i) => (
            <Fragment key={i}>
              {k?.senduser === username && (
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <p className="right">{k?.message}</p>
                </div>
              )}
              {k?.senduser !== username && (
                <div style={{ display: "flex", justifyContent: "left" }}>
                  <p className="left">{k?.message}</p>
                </div>
              )}

              {/* <pre>{details?.[i]?.senduser}</pre> */}
            </Fragment>
            ))}

          </div>

          <form onSubmit={handleSubmit} id="create-form">
            <input
              type="text"
              name="message"
              placeholder="Enter your message here"
              autoComplete="off"
              value={chatinput.message}
              onChange={handleChange}
              className={"form-control" +
                (submitted && !chatinput.message ? " is-invalid" : "")} />
            {submitted && !chatinput.message && (
              <div className="invalid-feedback">Message is required</div>
            )}
          </form>
        </div></>) : (
            <p style={{ color: "red",'textAlign':'center',paddingTop:'10vh' }}>Select a User to chat with...</p>
            )}
    </>
  );
}
export { HomePage };
