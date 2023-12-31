import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      data-testid="toast"
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Toast;
