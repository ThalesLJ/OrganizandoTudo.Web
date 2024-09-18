import "../../index.css";
import { useLanguage } from '../../context/LanguageContext';
import React, { useCallback, useState } from 'react';
import { Container, Card, Form } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import Api from "../../services/Api";
import { useNavigate } from "react-router-dom";
import Auth from "../../context/Auth";
import ReactQuill from "react-quill";
import FormButton from '../../components/FormButton';

export default function CreateNote() {
  const { strings } = useLanguage();
  
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const Save = useCallback(() => {
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
  }, [title, content, navigate]);

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
  }, [Save]);

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
              <Form.Label className="custom-label">{strings.createNote_noteTitle}</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={strings.createNote_noteTitlePlaceholder} className="bg-light txtTitle" required />
            </Form.Group>
            <Form.Group controlId="formNoteContent" className="mt-3">
              <Form.Label className="custom-label">{strings.createNote_noteContent}</Form.Label>
              <ReactQuill className="resizable-editor" value={content} onChange={OnContentChange} placeholder={strings.createNote_noteContentPlaceholder} />
            </Form.Group>
            <Form.Group controlId="formSave" className="mt-3">
              <FormButton variant="contained" disabled={isSaving} >
                {isSaving ? (<CircularProgress size={24} color="inherit" />) : (strings.createNote_btnSave)}
              </FormButton>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
