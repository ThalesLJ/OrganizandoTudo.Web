import "./styles.css";
import React, { useEffect, useState } from 'react';
import { Container, Card, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Api from '../../services/Api';
import INote from '../../types/INote';
import { CircularProgress } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

export default function Note() {
  const { id } = useParams<Record<string, string | undefined>>();
  const [note, setNote] = useState<INote>({ id: '', title: '', content: '' });
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // Page load
  useEffect(() => {
    let isMounted = true;

    if (id) {
      Api.GetPublicNote(id)
        .then((result) => {
          if (isMounted) {
            setNote(result);
            setTitle(result.title);
            setContent(result.content);
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
    return <Container className="my-4">Nota não encontrada.</Container>;
  }

  return (
    <>
      <AnimatePresence key='divNotes'>
        <motion.div initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
          <Container className="my-4" style={{ paddingTop: '50px' }}>
            <Card className="bg-transparent border-0">
              <Card.Body>
                <Form>
                  <Form.Group controlId="formNoteTitle">
                    <Form.Label className="custom-label">Título</Form.Label>
                    <Form.Control type="text" value={title} placeholder="Título da nota" className="bg-light txtTitle" readOnly />
                  </Form.Group>
                  <Form.Group controlId="formNoteContent" className="mt-3">
                    <Form.Label className="custom-label">Conteúdo</Form.Label>
                    <div className="txtContent" dangerouslySetInnerHTML={{ __html: content }} />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </motion.div>
      </AnimatePresence >

      <AnimatePresence key='floatingButtons'>
        <Link to="/Notes" className="floating-btn">
          <IoIosArrowBack size={40} />
          <span className="d-none d-md-block">Voltar</span>
        </Link>
      </AnimatePresence>
    </>
  );
}
