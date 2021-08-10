import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { Context } from "../context/Context";
import { login } from "../services/userServices";
import { useTranslation } from "react-i18next";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching, error, errorCode } = useContext(Context);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await login({
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.status });
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="justify-content-center align-items-center p-4">
          <div className="col-md-8 offset-md-2">
            <div
              className="login-form bg-light mt-4 p-4 card text-black"
              style={{ borderRadius: "25px" }}
            >
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="d-flex justify-content-between align-items-start">
                  <h4>{t("welcome-back")}</h4>
                  {error && (
                    <h6 className="text-danger" role="alert">
                      {errorCode === 400 || errorCode === 404
                        ? t("no-such-username-found")
                        : t("wrong-password-please-try-again")}
                    </h6>
                  )}
                </div>
                <div className="col-12">
                  <label>{t("username")}</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    ref={userRef}
                  />
                </div>
                <div className="col-12">
                  <label>{t("password")}</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                </div>
                <div className="col-12 d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isFetching}
                  >
                    {t("sign-in")}
                  </button>
                </div>
              </form>
              <hr className="mt-4" />
              <div className="col-12">
                <p className="text-center mb-0">
                  {t("have-not-account-yet")}{" "}
                  <Link
                    className="link text-decoration-none fw-bolder"
                    to="/register"
                  >
                    {t("sign-up")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
