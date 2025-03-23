import React, { createContext, useState, useContext } from "react";

// Create context
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", show: false });

  // Show alert function
  const showAlert = (message) => {
    setAlert({ message, show: true });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setAlert({ message: "", show: false });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert message={alert.message} show={alert.show} setAlert={setAlert} />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};

// Custom Alert Component
const CustomAlert = ({ message, show, setAlert }) => {
  if (!show) return null;

  return (
    <div style={styles.alert}>
      <span dangerouslySetInnerHTML={{ __html: message }} />
      <button onClick={() => setAlert({ message: "", show: false })} style={styles.closeBtn}>
        ✖
      </button>
    </div>
  );
};

// Styles
const styles = {
  alert: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#FAF9F6",
    color: "#333",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    animation: "fadeInOut 3s ease-in-out",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#DA231D",
    fontSize: "16px",
    cursor: "pointer",
  },
};

// Keyframe Animation (Add this in index.css or a global CSS file)
/*
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}
*/

