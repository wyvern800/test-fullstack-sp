import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import GlobalStyle from "./globalStyles";
import Toast from "./components/Toast";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes />
      <GlobalStyle />
      <Toast />
    </BrowserRouter>
  );
};

export default App;
