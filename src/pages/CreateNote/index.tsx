import "./styles.css";
import React, { useState } from 'react';
import { Container, Card, Form } from 'react-bootstrap';
import { Button } from '@mui/material';
import { CircularProgress, styled } from '@mui/material';
import Api from "../../services/Api";
import { useNavigate } from "react-router-dom";
import Auth from "../../services/Auth";

const ColorButton = styled(Button)(({ theme }) => ({
  color: '#ffe3d5',
  backgroundColor: '#946a56',
  '&:hover': {
    backgroundColor: '#a87861',
    color: '#e2c8bc'
  },
  width: '100%'
}));

export default function CreateNote() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const navigate = useNavigate();

  const Save = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSaving(true);

    Api.CreateNote({ id: '', title, content }, Auth.user.token)
      .then((result) => {
        navigate("/Notes");
        setIsSaving(false);
      })
      .catch((error) => {
        setIsSaving(false);
        alert('Promise rejected with error: ' + error);
      });

    event.preventDefault();
  }

  return (
    <Container className="my-4">
      <Card className="bg-transparent border-0">
        <Card.Body>
          <Form onSubmit={Save}>
            <Form.Group controlId="formNoteTitle">
              <Form.Label className="custom-label">Título</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Digite o título da nota" className="bg-light" required />
            </Form.Group>
            <Form.Group controlId="formNoteContent" className="mt-3">
              <Form.Label className="custom-label">Conteúdo</Form.Label>
              <Form.Control as="textarea" rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Digite o conteúdo da nota" className="bg-light" required />
            </Form.Group>
            <Form.Group controlId="formSave" className="mt-3">
              <ColorButton type='submit' variant="contained" disabled={isSaving} >
                {isSaving ? (<CircularProgress size={24} color="inherit" />) : ('Save')}
              </ColorButton>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
