import * as React from 'react';
//import { Link } from 'react-router-dom';
import "./styles.css";
//import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

export default function EntryApp() {
  return ( <><Outlet></Outlet></> )
}
