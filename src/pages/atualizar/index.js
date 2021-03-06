import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Jumbotron, Button, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';

function AtualizarTarefa(props) {

    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState('');
    const [carregarTarefa, setCarregarTarefa] = useState(true);

    useEffect( () => {
        if (carregarTarefa) {
            const tarefasDb = localStorage['tarefas'];
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            const tarefa = tarefas.filter(
                t => t.id === parseInt(props.id)
            )[0];
            setTarefa(tarefa.nome);
            setCarregarTarefa(false);
        }
    },[carregarTarefa, props])

    function voltar(event) {
        event.preventDefault();
        navigate('/');
    }

    function handleFecharModal(event) {
        navigate('/');
    }

    function atualizar(event) {
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true) {
            //obtém as tarefas
            const tarefasDb = localStorage['tarefas'];
            let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            //persistir a tarefa atualizada
            tarefas = tarefas.map(tarefasObj => {
                if (tarefasObj.id === parseInt(props.id)) {
                    tarefasObj.nome = tarefa;
                }
                return tarefasObj;
            })
            localStorage['tarefas'] = JSON.stringify(tarefas);
            setExibirModal(true);
        }
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value);
    }

    return (
        <div>
            <h3 className="text-center">Atualizar</h3>
            <Jumbotron>
                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a tarefa"
                            minLength="5"
                            maxLength="100"
                            required 
                            value={tarefa}
                            onChange={handleTxtTarefa} />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button variant="success" type="submit">
                            Atualizar
                        </Button>
                        &nbsp;
                        <A href="/" className="btn btn-light" onClick={voltar}>
                            Voltar
                        </A>
                    </Form.Group>
                </Form>
                <Modal show={exibirModal} onHide={handleFecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa atualizada com sucesso!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleFecharModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </div>
    );
};

AtualizarTarefa.prototypes = {
    id: PropTypes.number.isRequired
}

export default AtualizarTarefa;