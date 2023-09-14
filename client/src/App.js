import "./App.css";
import { Typography } from "@mui/material";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Typography variant="h5" color="info">
        app
      </Typography>
    </>
  );
}

export default App;
