import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LogoDark = ({ light }) => {
  return (
    <Link to="/">
      <img
        src={"https://hollo.ai/assets/images/home/Hollo_Logo-10-Color.png"}
        alt="AIMass"
        width="96"
        height="24"
      />
    </Link>
  );
};

export default LogoDark;
