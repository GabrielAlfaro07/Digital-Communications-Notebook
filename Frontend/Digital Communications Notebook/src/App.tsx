import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router component
import MainContent from "./MainContent"; // Import MainContent component
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Toast styling

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Or "dark"
      />
      <MainContent />
    </Router>
  );
};

export default App;
