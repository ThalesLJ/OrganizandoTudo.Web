import "./styles.css";
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TokenValidator from '../../services/TokenValidator';
import { Observer } from 'mobx-react-lite';
import Api from '../../services/Api';
import Auth from '../../services/Auth';
import INotes from '../../types/INotes';
import { Container, Card, Row, Col, Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { CircularProgress } from "@mui/material";

export default function Notes() {
  TokenValidator();
  const [notes, setNotes] = React.useState<INotes[]>([]);
  const [filteredNotes, setFilteredNotes] = React.useState<INotes[]>([]);
  const [filter, setFilter] = React.useState<'all' | 'public' | 'private'>('all');
  const [sortOrder, setSortOrder] = React.useState<'title' | 'date'>('date');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [contextMenu, setContextMenu] = React.useState<{ show: boolean, x: number, y: number, noteId: string | null }>({ show: false, x: 0, y: 0, noteId: null });

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

  React.useEffect(() => {
    let filtered = notes;

    if (filter !== 'all') {
      filtered = notes.filter(note => note.visible === (filter === 'public'));
    }

    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === 'title') {
      filtered = filtered.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        // Usando localeCompare para uma ordenação alfabética correta
        return titleA.localeCompare(titleB, 'en', { sensitivity: 'base' });
      });
    } else if (sortOrder === 'date') {
      // Ordena do mais recente para o mais antigo
      filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Ordena do mais antigo para o mais recente
      // filtered = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    setFilteredNotes(filtered);
  }, [notes, filter, sortOrder, searchQuery]);

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

  const PublicNote = (noteId: string, visible: boolean) => {
    // Atualiza a visibilidade localmente
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId ? { ...note, visible: !visible } : note
      )
    );

    if (noteId) {
      Api.PublishNote(noteId, Auth.user.token)
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
  };

  const handleContextMenu = (event: React.MouseEvent, noteId: string) => {
    event.preventDefault();
    setContextMenu({ show: true, x: event.clientX, y: event.clientY, noteId });
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <Observer>
        {() => (
          <>
            <AnimatePresence key='divNotes'>
              <motion.div initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
                <Container className="my-4 note-list">
                  <InputGroup className="mb-3">
                    <FormControl className="txt-search" placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </InputGroup>

                  <div className="filter-sort-container mb-3">
                    <div className="filter-buttons">
                      <Button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</Button>
                      <Button className={`filter-button ${filter === 'public' ? 'active' : ''}`} onClick={() => setFilter('public')}>Public</Button>
                      <Button className={`filter-button ${filter === 'private' ? 'active' : ''}`} onClick={() => setFilter('private')}>Private</Button>
                    </div>
                    <Dropdown onSelect={(eventKey) => setSortOrder(eventKey as 'title' | 'date')} className="sort-dropdown">
                      <Dropdown.Toggle variant="primary">
                        Sort by {sortOrder}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="title">Title</Dropdown.Item>
                        <Dropdown.Item eventKey="date">Date</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <Row>
                    {notes.length === 0 ? (
                      <Col>
                        <div className="d-flex justify-content-center" style={{ marginTop: '1rem' }}>
                          <CircularProgress size={24} color="inherit" />
                        </div>
                      </Col>
                    ) : (
                      filteredNotes.map(note => (
                        <Col xs={12} sm={6} md={6} lg={4} key={note.id} style={{ marginTop: '1rem' }}>
                          <Card onContextMenu={(e) => handleContextMenu(e, note.id)}>
                            <Card.Body className="note-card-body">
                              <Link to={`/Note/${note.id}`} style={{ textDecoration: 'none' }}>
                                <Card.Title className="note-title">{note.title}</Card.Title>
                              </Link>
                              <div className="note-text-container">
                                <Card.Text className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
                              </div>
                            </Card.Body>
                            <Card.Footer className="text-muted note-card-footer" style={{ textAlign: 'left' }}>
                              <div className="note-visibility">
                                <input className="note-visible" type="checkbox" checked={note.visible} onChange={(e) => PublicNote(note.id, note.visible)} />
                                <span onClick={() => PublicNote(note.id, note.visible)} style={{ cursor: 'pointer' }}>
                                  {note.visible ? 'Public' : 'Private'}
                                </span>
                              </div>
                            </Card.Footer>
                          </Card>
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
    </div>
  );
}
