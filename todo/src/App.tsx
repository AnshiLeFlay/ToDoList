import { CheckCircleOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    Layout,
    Input,
    theme,
    Button,
    Divider,
    List,
    Row,
    Col,
    Statistic,
} from "antd";
import React, { BaseSyntheticEvent, useState } from "react";

import "./App.css";
import { ADD_NEW_TASK, CHANGE_COMPLETE, DELETE_TASK } from "./services/actions";
import { useDispatch, useSelector } from "./services/hooks";

const App: React.FC = () => {
    const [taskText, setTaskText] = useState<string>("");
    const { Header, Content, Footer } = Layout;

    const tasks = useSelector((store) => store.tasks);
    const dispatch = useDispatch();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleTaskInput = (e: BaseSyntheticEvent) => {
        setTaskText(e.target.value);
    };

    const handleSubmit = () => {
        if (taskText !== "") {
            dispatch({ type: ADD_NEW_TASK, caption: taskText });
            setTaskText("");
        }
    };

    return (
        <Layout style={{ height: "100%" }}>
            <Header
                style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
            >
                <div
                    style={{
                        float: "left",
                        width: 120,
                        height: 31,
                        margin: "16px 24px 16px 0",
                        background: "rgba(255, 255, 255, 0.2)",
                    }}
                />
            </Header>
            <Content className="site-layout" style={{ padding: "0 50px" }}>
                <div
                    style={{
                        padding: 24,
                        height: "100%",
                        minHeight: 380,
                        background: colorBgContainer,
                    }}
                >
                    <Row>
                        <Col span={18}>
                            <Input.Group compact>
                                <Input
                                    style={{ width: "calc(100% - 100px)" }}
                                    onChange={handleTaskInput}
                                    value={taskText}
                                />
                                <Button onClick={handleSubmit} type="primary">
                                    Add
                                </Button>
                            </Input.Group>
                        </Col>
                        <Col span={6}>
                            <Row>
                                <Col span={12}>
                                    <Statistic
                                        title="Completed"
                                        value={
                                            tasks.filter(
                                                (task) =>
                                                    task.completed === true
                                            ).length
                                        }
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="In progress"
                                        value={
                                            tasks.filter(
                                                (task) =>
                                                    task.completed === false
                                            ).length
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <List
                        size="large"
                        itemLayout="horizontal"
                        dataSource={tasks}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[
                                    <CheckOutlined 
                                        onClick={() => {
                                            dispatch({
                                                type: CHANGE_COMPLETE,
                                                position: index,
                                            });
                                        }}
                                    />,
                                    <DeleteOutlined
                                        onClick={() => {
                                            dispatch({
                                                type: DELETE_TASK,
                                                position: index,
                                            });
                                        }}
                                    />,
                                ]}
                            >
                                <List.Item.Meta
                                title={item.caption}
                                    description={
                                        tasks[index].completed && <div style={{ color: '#7cb305' }}>completed <CheckCircleOutlined /></div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Denis Pominov © 2023
            </Footer>
        </Layout>
    );
};

export default App;
