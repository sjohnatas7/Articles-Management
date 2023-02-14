import React, { useEffect, useState } from "react";
import axios from "axios"

import Title from "../template/title/Title";
import Stat from "./stat/Stat";

import { baseApiUrl } from "../../globals";
import "./Home.css"
import { useAppSelector } from "../../store/hooks";
import SnackbarMsg from "../template/snackbarMsg/SnackbarMsg";

import showErrorOrConclude from "../../config/showErrorOrConclude";

interface StatsApi {
    categories: number,
    articles: number,
    users: number,
}

export default function Home() {
    const { showMessageError } = showErrorOrConclude()
    const [data, setData] = useState<StatsApi>({ categories: 0, articles: 0, users: 0 })
    const snackbarVisible = useAppSelector(state => state.snackbar.showSnackbar)

    function getData() {
        axios.get(`${baseApiUrl}/stats`)
            .then(res => setData(res.data))
            .catch(err => showMessageError(err))

    }
    useEffect(getData, [])
    return (
        <div className="home">
            {snackbarVisible ? <SnackbarMsg></SnackbarMsg> : null}
            <Title icon="fa-home" title="Dashboard" subtitle="Base de Conhecimento" />
            <div className="stats">
                <Stat title="Categorias" icon="fa-folder" color="#d54d50" value={data.categories} />
                <Stat title="Artigos" icon="fa-file" color="#3bc480" value={data.articles} />
                <Stat title="Usuários" icon="fa-user" color="#3282cd" value={data.users} />
            </div>
        </div>
    )
}