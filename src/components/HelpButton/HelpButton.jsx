import { useNavigate } from "react-router-dom";
import "./HelpButton.css";

const HelpButton = () => {
  const navigate = useNavigate();
  return (
    <button className="help-button" onClick={() => navigate("/documentacion")}>
      Ver documentación
    </button>
  );
};
export default HelpButton;
