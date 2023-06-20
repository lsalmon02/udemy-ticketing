import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const SignOutPage = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    (async () => {
      await doRequest();
    })();
  }, []);

  return <div>Signing out out</div>;
};

export default SignOutPage;
