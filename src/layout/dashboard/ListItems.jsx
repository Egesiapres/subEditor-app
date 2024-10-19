import ContentCutIcon from "@mui/icons-material/ContentCut";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router";

export default function ListItems() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/subtitle-editor");
  };

  return (
    <ListItemButton onClick={handleDashboard}>
      <ListItemIcon>
        <ContentCutIcon />
      </ListItemIcon>

      <ListItemText primary="Subtitle Editor" />
    </ListItemButton>
  );
}
