import "../../index.css";
import { useLanguage } from '../../context/LanguageContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../services/Api';
import Auth from '../../context/Auth';
import TokenValidator from '../../services/TokenValidator';
import INote from '../../types/INote';
import { Button, CircularProgress, styled } from '@mui/material';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import FormButton from '../../components/FormButton';

export default function EditNote() {
  TokenValidator();
  const { strings } = useLanguage();
  
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

  const hasChanges = title !== initialTitle || content !== initialContent;
  const navigate = useNavigate();

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

  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const SaveRef = useRef(Save);

  useEffect(() => {
    titleRef.current = title;
  }, [title]);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    SaveRef.current = Save;
  }, [Save]);

  // Page load
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

  const FormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    SaveRef.current();
    event.preventDefault();
  }

  const SaveAndKeep = () => {
    setExit(false);
  }

  const SaveAndExit = () => {
    setExit(true);
  }

  const OnContentChange = (value: string) => {
    setContent(value);
  };

  if (loading) {
    return (
      <Container className="my-4" style={{ paddingTop: '50px' }}>
        <div className="d-flex justify-content-center" style={{ marginTop: '1rem' }}>
          <CircularProgress size={24} color="inherit" />
        </div>
      </Container>
    );
  }

  if (!loading && (!note || !content)) {
    return <Container className="my-4">{strings.editNote_noteNotFound}</Container>;
  }

  return (
    <Container className="my-4" style={{ paddingTop: '50px' }}>
      <Card className="bg-transparent border-0">
        <Card.Body>
          <Form ref={form} onSubmit={FormSubmit}>
            <Form.Group controlId="formNoteTitle">
              <Form.Label className="custom-label">{strings.editNote_noteTitle}</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={strings.editNote_noteTitlePlaceholder} className="bg-light txtTitle" required />
            </Form.Group>
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
