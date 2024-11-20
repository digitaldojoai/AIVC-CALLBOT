import { Link } from "react-router-dom";
import logoDark from "../../assets/img/logo-dark.png";
import logoLight from "../../assets/img/logo-light.png";

// eslint-disable-next-line react/prop-types
const LogoDark = ({ light }) => {
  return (
    <Link to="/">
      <img
        src={"/assets/img/th-1/hollo-logo.png"}
        alt="AIMass"
        className="w-36"
      />
    </Link>
  );
};

export default LogoDark;
