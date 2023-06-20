import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vis, setVis] = useState(false)
  const { errors, doRequest } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={!vis ? "password" : 'text'}
          className="form-control"
        />
        <button type="button"  onClick={() => setVis((prevState) => !prevState)}>d</button>
      </div>
      {errors}
      <button type='submit' className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default SigninPage;
