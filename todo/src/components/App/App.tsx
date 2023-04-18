import React from "react";
import { Button, Input, Layout, Space } from "antd";
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import ListTree from "../../components/ListTree/ListTree";

import "./App.css";

const App: React.FC = () => {
    return (
        <Layout style={{ height: "100%" }}>
            <Header />
            <Content>
                <Space.Compact style={{ width: "100%" }}>
                    <Input defaultValue="New task" />
                    <Button type="primary">Add</Button>
                </Space.Compact>
                <ListTree />
            </Content>
            <Footer />
        </Layout>
    );
};

export default App;
