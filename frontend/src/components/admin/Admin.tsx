import React, { useState } from 'react';
import Title from "../template/title/Title";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';

import Users from './users/Users';
import Categories from './categories/Categories';
import Articles from './articles/Articles';

import { useAppSelector } from '../../store/hooks';
import SnackbarMsg from '../template/snackbarMsg/SnackbarMsg';

function TabsAdmin() {
  const [key, setKey] = useState('articles');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k || 'articles')}
      className="mb-3 d-flex flex-row-reverse"
    >
      <Tab eventKey="users" key='users'  title="Usuários">
        <Users></Users>
      </Tab>
      <Tab eventKey="categories" key='categories'  title="Categorias">
        <Categories></Categories>
      </Tab>
      <Tab eventKey="articles" key='articles' title="Artigos">
        <Articles></Articles>
      </Tab>
    </Tabs>
  );
}


export default function Admin(){
  const snackbarVisible = useAppSelector(state => state.snackbar.showSnackbar)

    return (
        <div className="admin">
            { snackbarVisible ? <SnackbarMsg></SnackbarMsg> : null }
            <Title icon="fa-cogs" title="Administração do Sistema"
                subtitle="Cadastro e mais"/>
            <Card body>
                {TabsAdmin()}
            </Card>
            <div className="admin-pages-tabs"></div>
        </div>
    )
}