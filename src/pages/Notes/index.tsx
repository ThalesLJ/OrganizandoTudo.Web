import "./styles.css";
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TokenValidator from '../../services/TokenValidator';
import { Observer } from 'mobx-react-lite';
import Api from '../../services/Api';
import Auth from '../../services/Auth';
import INotes from '../../types/INotes';
import { Container, Card, Row, Col, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Notes() {
  TokenValidator();
  const [notes, setNotes] = React.useState<INotes[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [contextMenu, setContextMenu] = React.useState<{ show: boolean, x: number, y: number, noteId: string | null }>({ show: false, x: 0, y: 0, noteId: null });
  // const touchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    Api.GetNotes(Auth.user.token)
      .then((result) => {
        setNotes(result);
      })
      .catch((error) => {
        alert('Promise rejected with error: ' + error);
      });

    // Add event listener to close the context menu when clicking outside
    const handleClickOutside = () => setContextMenu({ show: false, x: 0, y: 0, noteId: null });
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const DeleteNote = (noteId: string) => {
    if (noteId) {
      Api.DeleteNote(noteId, Auth.user.token)
        .then((result) => {
          Api.GetNotes(Auth.user.token)
            .then((result) => {
              setNotes(result);
            })
            .catch((error) => {
              alert('Promise rejected with error: ' + error);
            });
        })
        .catch((error) => {
          alert('Promise rejected with error: ' + error);
        });
    }

    setContextMenu({ show: false, x: 0, y: 0, noteId: null });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContextMenu = (event: React.MouseEvent, noteId: string) => {
    event.preventDefault();
    setContextMenu({ show: true, x: event.clientX, y: event.clientY, noteId });
  };

  /*const handleTouchStart = (noteId: string) => {
    touchTimeoutRef.current = setTimeout(() => setContextMenu({ show: true, x: window.innerWidth / 2, y: window.innerHeight / 2, noteId }), 800);
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  };*/

  return (
    <Observer>
      {() => (
        <>
          <AnimatePresence key='divNotes'>
            <motion.div initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
              <Container className="my-4 note-list">
                <Row className="mb-4">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Search notes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  {notes.length === 0 ? (
                    <Col>
                      <div className="d-flex justify-content-center" style={{ marginTop: '1rem' }}>
                        <Spinner animation="border" variant="primary" />
                      </div>
                    </Col>
                  ) : (
                    filteredNotes.map(note => (
                      <Col xs={12} sm={6} md={4} lg={3} key={note.id} style={{ marginTop: '1rem' }}>
                        <Link to={`/Note/${note.id}`} style={{ textDecoration: 'none' }}>
                          <Card style={{ minHeight: '20svh' }} onContextMenu={(e) => handleContextMenu(e, note.id)}
                            /*onTouchStart={() => handleTouchStart(note.id)} onTouchEnd={handleTouchEnd}*/ >
                            <Card.Body>
                              <Card.Title>{note.title}</Card.Title>
                              <Card.Text>{note.content}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    ))
                  )}
                </Row>

                {contextMenu.show && (
                  <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
                    <button onClick={() => { if (contextMenu.noteId) { DeleteNote(contextMenu.noteId) } }}>Delete</button>
                  </div>
                )}

              </Container>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence key='floatingButtons'>
            <Link to="/AddNote" className="floating-btn">
              <AiOutlinePlus size={40} />
              <span className="d-none d-md-block">ADD</span>
            </Link>
          </AnimatePresence>
        </>
      )
      }
    </Observer >
  );
}
