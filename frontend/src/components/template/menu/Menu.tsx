import React, { useEffect, useState } from "react"
import "./Menu.css"
import { useAppSelector } from "../../../store/hooks"
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { baseApiUrl } from "../../../globals";
import axios from "axios";
import { Link } from "react-router-dom";

interface RenderTree {
    id: number;
    name: string;
    parentId: null | number;
    children?: RenderTree[];
}
export default function () {
    const isUserLogin = useAppSelector(state => state.auth.isUserLogin)
    const isMenuVisible = useAppSelector(state => state.menu.isMenuVisible)
    const [tree, setTree] = useState<RenderTree[]>([])
    useEffect(() => {
        const url = `${baseApiUrl}/categories/tree`
        axios.get(url).then(res => { setTree(res.data), console.log(res.data) })
    }, [])
    const renderTree = (nodes: RenderTree) => {
        return (
            <Link to={`/categories/${nodes.id}/articles`} style={{ textDecoration: 'none' }}>
                <TreeItem key={nodes.name} nodeId={nodes.name} label={nodes.name} className="node"
                    sx={{
                        '&:hover, &.Mui-selected': {
                            background: 'rgba(255,255,255,0.2)',
                        },
                        '& >.MuiTreeItem-content': {padding: '8px'}
                    }}>
                    {Array.isArray(nodes.children)
                        ? nodes.children.map((node) => renderTree(node))
                        : null}
                </TreeItem>
            </Link>
        )
    };
    return (
        <aside className={`menu ${!isUserLogin || !isMenuVisible ? 'menu-visible' : ''}`}>

            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<i className={`fa-solid fa-lg fa-angle-down text-white-50`} ></i>}
                defaultExpanded={['root']}
                defaultExpandIcon={<i className={`fa-solid fa-lg fa-angle-left text-white-50`}></i>}
                className="tree"
                sx={{ height: 110, flexGrow: 1, overflowY: 'auto' }}
            >
                {tree.map(node => renderTree(node))}
            </TreeView>

        </aside>
    )
}
