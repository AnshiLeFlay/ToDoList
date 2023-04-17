import {
    CheckCircleOutlined,
    CheckOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
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
import {
    ADD_NEW_TASK,
    CHANGE_COMPLETE,
    CHANGE_CURRENT_TASK,
    DELETE_TASK,
} from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks";

const App: React.FC = () => {
    const [taskText, setTaskText] = useState<string>("");
    const { Content, Footer } = Layout;

    const tasks = useSelector((store) => store.tasks);
    const project = useSelector((store) => store.projects?.[0]);
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

    const handleCurrent = (i: number) => {
        dispatch({ type: CHANGE_CURRENT_TASK, position: i });
    };

    const root = Object.keys(project[0]).filter(
        (task) => !Object.values(project[0]).flat().includes(task)
    );

    const buildTaskList = (adjList: any, task: any) => {
        const subtasks = adjList[task] || [];

        if (subtasks.length === 0) {
            return <li key={task}>{task}</li>;
        }

        return (
            <li key={task}>
                {task}
                <ul>
                    {subtasks.map((subtask: any) =>
                        buildTaskList(adjList, subtask)
                    )}
                </ul>
            </li>
        );
    };

    return (
        <Layout style={{ height: "100%" }}>
            
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
                                onClick={() => handleCurrent(index)}
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
                                        tasks[index].completed && (
                                            <div style={{ color: "#7cb305" }}>
                                                completed{" "}
                                                <CheckCircleOutlined />
                                            </div>
                                        )
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    {root.length > 0 &&
                        root.map((task: any) =>
                            buildTaskList(project[0], task)
                        )}
                </div>
            </Content>
            
        </Layout>
    );
};

export default App;
