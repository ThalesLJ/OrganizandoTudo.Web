import "./styles.css";
import React, { useState } from 'react';
import { Container, Card, Form } from 'react-bootstrap';
import { Button } from '@mui/material';
import { CircularProgress, styled } from '@mui/material';
import Api from "../../services/Api";
import { useNavigate } from "react-router-dom";
import Auth from "../../services/Auth";
import ReactQuill from "react-quill";

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

  React.useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key === 'Enter') {
        Save();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [title, content]);

  const Save = async () => {
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
  }

  const FormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    Save();
    event.preventDefault();
  }

  const OnContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <Container className="my-4" style={{ paddingTop: '50px' }}>
      <Card className="bg-transparent border-0">
        <Card.Body>
          <Form onSubmit={FormSubmit}>
            <Form.Group controlId="formNoteTitle">
              <Form.Label className="custom-label">Título</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Digite o título da nota" className="bg-light" required />
            </Form.Group>
            <Form.Group controlId="formNoteContent" className="mt-3">
              <Form.Label className="custom-label">Conteúdo</Form.Label>
              <ReactQuill className="resizable-editor" value={content} onChange={OnContentChange} placeholder="Digite o conteúdo da nota" />
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
