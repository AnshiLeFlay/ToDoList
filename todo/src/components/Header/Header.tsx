import React from "react";
import { Layout } from "antd";

const Header: React.FC = () => {
    const { Header } = Layout;

    return (
        <Header
            style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
        >
        
        </Header>
    );
};

export default Header;
