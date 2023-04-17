import React from "react";
import { Layout } from "antd";

const Header: React.FC<any> = (props) => {
    const { Content } = Layout;

    return (
        <Content className="site-layout" style={{ padding: "0 50px" }}>
            {props.children}
        </Content>
    );
};

export default Header;
