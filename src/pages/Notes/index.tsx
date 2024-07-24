import * as React from 'react';
//import { Link } from 'react-router-dom';
import "./styles.css";
import { AnimatePresence, motion } from 'framer-motion';
import TokenValidator from '../../services/TokenValidator';
import { Observer } from 'mobx-react-lite';
import Api from '../../services/Api';
import Auth from '../../services/Auth';
import INotes from '../../types/INotes';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';

export default function Notes() {
  TokenValidator();
  const [notes, setNotes] = React.useState<INotes[]>([]);

  Api.GetNotes(Auth.user.token)
    .then((result) => {
      setNotes(result);
    })
    .catch((error) => {
      console.error('Promise rejected with error: ' + error);
    });

  return (
    <Observer>
      {() => (
        <AnimatePresence key='divNotes'>
          <motion.div initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
            <Container className="my-4">
              <Row>
                {notes.length === 0 ? (
                  <Col>
                    {/*<p className='force-txtCenter'>Não há notas disponíveis.</p>*/}
                    <div className="d-flex justify-content-center" style={{ marginTop: '1rem' }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  </Col>
                ) : (
                  notes.map(note => (
                    <Col xs={12} sm={6} md={4} lg={3} key={note.id} style={{ marginTop: '1rem' }}>
                      <Card style={{ minHeight: '20svh' }}>
                        <Card.Body>
                          <Card.Title>{note.title}</Card.Title>
                          <Card.Text>{note.content}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          </motion.div>
        </AnimatePresence>
      )}
    </Observer>
  );
}
