import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from "./components/App/App";
import ListTree from "./components/ListTree/ListTree";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";
import { Provider } from "react-redux";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Layout style={{ height: "100%" }}>
                <Header />
                <Content>
                    <ListTree />
                </Content>
                <Footer />
            </Layout>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
