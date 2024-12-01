import "./App.css";
import Albumlist from "./Components/AlbumList/Albumlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-content">
        <Albumlist />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
