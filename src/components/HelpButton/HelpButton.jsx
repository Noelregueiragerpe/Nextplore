import { useNavigate } from "react-router-dom";
import "./HelpButton.css";

const HelpButton = () => {
  const navigate = useNavigate();
  return (
    <button className="help-button" onClick={() => navigate("/documentacion")}>
      <img className="help-image" src="/iconos/chat.svg" alt="help" />
    </button>
  );
};
export default HelpButton;
