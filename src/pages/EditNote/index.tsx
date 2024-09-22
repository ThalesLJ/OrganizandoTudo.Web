import "../../index.css";
import { useLanguage } from '../../context/LanguageContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../services/Api';
import Auth from '../../context/Auth';
import INote from '../../types/INote';
import { CircularProgress } from '@mui/material';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import FormButton from '../../components/FormButton';
import FormInput from "../../components/FormInput";

export default function EditNote() {
  const { strings } = useLanguage();
  const navigate = useNavigate();

  const { id } = useParams<Record<string, string | undefined>>();
  const [note, setNote] = useState<INote>({ id: '', title: '', content: '' });
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSavingKeep, setIsSavingKeep] = React.useState(false);
  const [isSavingExit, setIsSavingExit] = React.useState(false);
  const [initialTitle, setInitialTitle] = useState<string>('');
  const [initialContent, setInitialContent] = useState<string>('');
  const [exit, setExit] = useState(true);

  const form = React.useRef<HTMLFormElement>(null);
  const titleRef = useRef(title);
  const contentRef = useRef(content);

  const hasChanges = title !== initialTitle || content !== initialContent;

  const Save = useCallback(() => {
    if (exit) {
      setIsSavingExit(true);
    } else {
      setIsSavingKeep(true);
    }

    if (id) {
      Api.UpdateNote({ id, title: titleRef.current, content: contentRef.current }, id, Auth.user.token)
        .then((result) => {
          setNote({ id, title: titleRef.current, content: contentRef.current });
          setInitialTitle(titleRef.current);
          setInitialContent(contentRef.current);

          if (exit) {
            setIsSavingExit(false);
            navigate("/Notes");
          } else {
            setIsSavingKeep(false);
          }
        })
        .catch((error) => {
          if (exit) {
            setIsSavingExit(false);
          } else {
            setIsSavingKeep(false);
          }

          alert('Promise rejected with error: ' + error);
        });
    }
  }, [exit, id, navigate]);

  const SaveRef = useRef(Save);

  // Sync the original title, to enable the save button with theres any changes
  useEffect(() => {
    titleRef.current = title;
  }, [title]);

  // Sync the original content, to enable the save button with theres any changes
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  // Sync the save function, to enable the save button with theres any changes
  useEffect(() => {
    SaveRef.current = Save;
  }, [Save]);

  // On page load: Get the note from the API and add a key listener to save the note with Ctrl+Enter
  useEffect(() => {
    let isMounted = true;

    if (id) {
      Api.GetNote(id, Auth.user.token)
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

    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key === 'Enter') {
        setExit(true);
        SaveRef.current();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [id]);

  // Call the API to save the note when the form is submitted
  const FormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    SaveRef.current();
    event.preventDefault();
  }

  // Set the state to false, to stay in the page after saving
  const SaveAndKeep = () => {
    setExit(false);
  }

  // Set the state to true, to exit the page after saving
  const SaveAndExit = () => {
    setExit(true);
  }

  // Sync the note content with the state
  const OnContentChange = (value: string) => {
    setContent(value);
  };

  // If the note is loading, show the loading spinner
  if (loading) {
    return (
      <Container className="my-4" style={{ paddingTop: '50px' }}>
        <div className="d-flex justify-content-center" style={{ marginTop: '1rem' }}>
          <CircularProgress size={24} color="inherit" />
        </div>
      </Container>
    );
  }

  // If the note is not found, show the not found message
  if (!loading && (!note || !content)) {
    return <Container className="my-4">{strings.editNote_noteNotFound}</Container>;
  }

  return (
    <Container className="my-4" style={{ paddingTop: '50px' }}>
      <Card className="bg-transparent border-0">
        <Card.Body>
          <Form ref={form} onSubmit={FormSubmit}>

            <FormInput type="text" value={title} labelFontSize={19} required
              label={strings.editNote_noteTitle} placeholder={strings.editNote_noteTitlePlaceholder}
              onChange={(e) => setTitle(e.target.value)} />

            <Form.Group controlId="formNoteContent" className="mt-3">
              <Form.Label className="custom-label">{strings.editNote_noteContent}</Form.Label>
              <ReactQuill className="resizable-editor" value={content} onChange={OnContentChange} placeholder={strings.editNote_noteContentPlaceholder} />
            </Form.Group>

            <Form.Group controlId="formSave" className="mt-3">
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <FormButton onClick={SaveAndKeep} className='login-btnAcessar' variant="contained" disabled={!hasChanges} >
                    {isSavingKeep ? (<CircularProgress size={24} color="inherit" />) : (strings.editNote_btnSave)}
                  </FormButton>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <FormButton onClick={SaveAndExit} className='login-btnAcessar' variant="contained" disabled={!hasChanges} >
                    {isSavingExit ? (<CircularProgress size={24} color="inherit" />) : (strings.editNote_btnSaveAndClose)}
                  </FormButton>
                </Col>
              </Row>
            </Form.Group>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
