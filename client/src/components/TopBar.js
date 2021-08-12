import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";
import Logo from "../images/logo.png";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);
  const { t } = useTranslation();

  const handleLogout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link
              className="link nav-item navbar-brand align-self-center"
              aria-current="page"
              to="/"
            >
              <img
                src={Logo}
                height="68"
                alt=""
                loading="lazy"
                style={{ marginTop: "-1px" }}
              />
            </Link>
            <div className="nav-item align-self-center fw-light fst-italic ">
              {t("description")}
            </div>
          </div>
          <div>
            {user ? (
              <div className="d-flex align-items-center justify-content-evenly mb-2 flex-sm-fill">
                <Link
                  className="btn btn-outline-success me-3 flex-sm-fill"
                  to=""
                  role="button"
                >
                  <span>
                    <i
                      className="bi bi-person-check-fill"
                      style={{ fontSize: "1rem" }}
                    ></i>{" "}
                    {user && user.username}
                  </span>
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary me-md-3 flex-sm-fill"
                  onClick={handleLogout}
                >
                  {t("sign-out")}
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-evenly mb-2 flex-sm-fill">
                <Link className="link flex-sm-fill" to="/login">
                  <button
                    type="button"
                    className="btn btn-success px-3 me-md-3"
                  >
                    {t("sign-in")}
                  </button>
                </Link>
                <Link className="link" to="/register">
                  <button
                    type="button"
                    className="btn btn-primary me-md-3 flex-sm-fill"
                  >
                    {t("sign-up-for-toody")}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-bs-toggle="collapse"
          data-bs-target="#navbarButtonsExample"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default TopBar;
