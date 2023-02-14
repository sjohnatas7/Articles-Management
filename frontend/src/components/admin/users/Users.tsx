import React, { useEffect } from "react";
import Table from '../../template/table/TableUser';
import Forms from "./forms/Forms";
import "./Users.css"
import UserModel from "../../../services/UserService";


export default function Users(){
    return (
        <div className="user-admin">
            <h1>Usuarios</h1>
            <Forms></Forms>
            <Table></Table>
        </div>
    )
}

