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
import FormInput from "../../components/FormInput";

export default function CreateNote() {
  const { strings } = useLanguage();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Send the new note to API
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

  // On page load: Add a key listener to save the note with Ctrl+Enter
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

  // Call the API to save the note when the form is submitted
  const FormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    Save();
    event.preventDefault();
  }

  // Sync the note content with the state
  const OnContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <Container className="my-4" style={{ paddingTop: '50px' }}>
      <Card className="bg-transparent border-0">
        <Card.Body>
          <Form onSubmit={FormSubmit}>
            <FormInput type="text" value={title} labelFontSize={19} required
              label={strings.createNote_noteTitle} placeholder={strings.createNote_noteTitlePlaceholder}
              onChange={(e) => setTitle(e.target.value)} />

            <Form.Group controlId="formNoteContent" className="mt-3">
              <Form.Label className="custom-label">{strings.createNote_noteContent}</Form.Label>
              <ReactQuill className="resizable-editor" value={content} onChange={OnContentChange} placeholder={strings.createNote_noteContentPlaceholder} />
            </Form.Group>

            <FormButton type="submit" disabled={isSaving}>
              {isSaving ? (<CircularProgress size={24} color="inherit" />) : (strings.createNote_btnSave)}
            </FormButton>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
