//Importar as dependências 
import React from 'react';
//import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { useRoutes } from 'hookrouter';
//Importar as páginas
import ListarTarefas from './pages/listar/index';
import CadastrarTarefa from './pages/cadastrar/index';
import AtualizarTarefa from './pages/atualizar/index';

//Criar o componente com as rotas pelo react-router-dom

/*function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ListarTarefas} />
        <Route path="/cadastrar-tarefa" component={CadastrarTarefa} />
        <Route path="/atualizar-tarefa" component={AtualizarTarefa} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;*/

//Criar o componente com as rotas pelo 'hookrouter';
const routes = {
  '/': () => <ListarTarefas />,
  '/cadastrar': () => <CadastrarTarefa />,
  '/atualizar/:id': ({id}) => <AtualizarTarefa id={id} />
};

function GerenciadorTarefas() {
  return useRoutes(routes);
}

export default GerenciadorTarefas;