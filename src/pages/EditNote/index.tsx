import "./styles.css";
import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Api from '../../services/Api';
import Auth from '../../services/Auth';
import TokenValidator from '../../services/TokenValidator';
import INote from '../../types/INote';
import { Button, CircularProgress, styled } from '@mui/material';

const ColorButton = styled(Button)(({ theme }) => ({
  color: '#ffe3d5',
  backgroundColor: '#946a56',
  '&:hover': {
    backgroundColor: '#a87861',
    color: '#e2c8bc'
  },
  width: '100%'
}));

export default function EditNote() {
  TokenValidator();
  const { id } = useParams<Record<string, string | undefined>>();
  const [note, setNote] = useState<INote>({ id: '', title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [initialTitle, setInitialTitle] = useState<string>('');
  const [initialContent, setInitialContent] = useState<string>('');

  const hasChanges = title !== initialTitle || content !== initialContent;

  // Page load
  useEffect(() => {
    let isMounted = true;

    if (id) {
      Api.GetNote(id, Auth.user.token) // Assume que GetNoteById é o método para obter a nota por id
        .then((result) => {
          if (isMounted) {
            setNote(result);
            setTitle(result.title);
            setInitialTitle(result.title);
            setContent(result.content);
            setInitialContent(result.content);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error('Promise rejected with error: ' + error);
            setLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const Save = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSaving(true);

    if (id) {
      Api.UpdateNote({ id, title, content }, id, Auth.user.token)
        .then((result) => {
          setNote({ id, title, content });
          setInitialTitle(`${title}`);
          setInitialContent(`${content}`);
          setIsSaving(false);
        })
        .catch((error) => {
          setIsSaving(false);
          alert('Promise rejected with error: ' + error);
        });
    }

    event.preventDefault();
  }

  if (loading) {
    return (
      <Container className="my-4">
        <div className="d-flex justify-content-center" style={{ marginTop: '1rem' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </Container>
    );
  }

  if (!loading && !note) {
    return <Container className="my-4">Nota não encontrada.</Container>;
  }

  return (
    <Container className="my-4">
      <Card className="bg-transparent border-0"> {/* Remove o fundo branco e a borda */}
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
              <ColorButton type='submit' className='login-btnAcessar' variant="contained" disabled={!hasChanges} >
                {isSaving ? (<CircularProgress size={24} color="inherit" />) : ('Save')}
              </ColorButton>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
