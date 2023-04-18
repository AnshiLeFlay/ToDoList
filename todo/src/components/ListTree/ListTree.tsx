import React, { useState } from "react";
import { Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { useDispatch, useSelector } from "../../services/hooks";
import { UPDATE_DATA_TREE } from "../../services/actions";

//const defaultData: DataNode[] = [];

const ListTree: React.FC = () => {
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    
    const project = useSelector((store) => store.projects?.[0]);
    const dispatch = useDispatch();

    const onCheck = (checkedKeysValue: React.Key[]) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
      };
    
      const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
      };

    const onDragEnter: TreeProps["onDragEnter"] = (info) => {
        console.log(info);
    };

    const onDrop: TreeProps["onDrop"] = (info) => {
        console.log(info);
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split("-");
        const dropPosition =
            info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (
            data: DataNode[],
            key: React.Key,
            callback: (node: DataNode, i: number, data: DataNode[]) => void
        ) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children!, key, callback);
                }
            }
        };
        const data = [...project];

        let dragObj: DataNode;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                item.children.unshift(dragObj);
            });
        } else if (
            ((info.node as any).props.children || []).length > 0 &&
            (info.node as any).props.expanded &&
            dropPosition === 1
        ) {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                item.children.unshift(dragObj);
            });
        } else {
            let ar: DataNode[] = [];
            let i: number;
            loop(data, dropKey, (_item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i!, 0, dragObj!);
            } else {
                ar.splice(i! + 1, 0, dragObj!);
            }
        }

        dispatch({ type: UPDATE_DATA_TREE, project: 0, data: data });
    };

    return (
        <Tree
            className="draggable-tree"
            checkable
            defaultExpandAll
            draggable
            blockNode
            onCheck={(checkedVal: any) => onCheck(checkedVal)}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={project}
        />
    );
};

export default ListTree;
