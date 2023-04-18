import React, { useState } from "react";
import { Button, Input, Layout, Space } from "antd";
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import ListTree from "../../components/ListTree/ListTree";
import { useDispatch } from "../../services/hooks";

import "./App.css";
import { ADD_TASK_TO_DATA_TREE } from "../../services/actions";

const App: React.FC = () => {
    const [taskText, setTaskText] = useState<string>("");
    const dispatch = useDispatch();

    return (
        <Layout style={{ height: "100%" }}>
            <Header />
            <Content>
                <Space.Compact style={{ width: "100%" }}>
                    <Input
                        onChange={(e) => {
                            setTaskText(e.target.value);
                        }}
                        value={taskText}
                    />
                    <Button
                        onClick={() => {
                            dispatch({
                                type: ADD_TASK_TO_DATA_TREE,
                                project: 0,
                                position: 0,
                                data: taskText,
                            });
                        }}
                        type="primary"
                    >
                        Add
                    </Button>
                </Space.Compact>
                <ListTree />
            </Content>
            <Footer />
        </Layout>
    );
};

export default App;
