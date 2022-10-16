import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material";
import customTheme from "./theme-provider/themeProvider";
import MetaTags from "react-meta-tags";
import { APP_INFO } from "./utils/constant";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "antd/dist/antd.css";
import "antd/dist/antd.min.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={customTheme}>
    <Provider store={store}>
      <MetaTags>
        <title>{APP_INFO.TITLE}</title>
        <meta property="og:description" content={APP_INFO.DESCRIPTION} />
        <meta property="og:title" content={APP_INFO.TITLE} />
        <meta property="og:type" content={APP_INFO.TYPE} />
        <meta property="og:url" content={APP_INFO.URL} />
        <meta property="og:image" content={APP_INFO.OG_IMAGE} />
      </MetaTags>
      <App />
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
