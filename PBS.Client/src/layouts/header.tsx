
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


export const Header = () => {

  return (
      <AppBar position="static">
        <Toolbar sx={{ width: "100%" }}>
          
          <Typography variant="h4" component="div" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            Book a Special Date with Abbey
          </Typography>

         
        </Toolbar>
      </AppBar>
  );
};
