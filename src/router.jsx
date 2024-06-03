import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/user/Login';
import Profile from './pages/user/Profile';
import Dashboard from './pages/Dashboard'

import StuffCreate from './pages/Stuff/Create';
import Stuff from './pages/Stuff/Stuff';
import StuffEdit from './pages/Stuff/Edit';
import StuffTrash from './pages/trash/TStuff';

import Inbound from './pages/Inbound/Inbound';
import InboundCreate from './pages/Inbound/Create';

import User from "./pages/user/User";
import UserCreate from "./pages/user/CreateU";
import UserEdit from './pages/user/EditU';
import UserTrash from './pages/trash/TUser';

import StuffStock from './pages/StuffStock/Stock';
import StuffStockCreate from './pages/StuffStock/Create';

import Lending from './pages/lending/Lending';
import LendingCreate from './pages/lending/CreateL';



export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/profile', element: <Profile /> },
  { path: '/dashboard', element: <Dashboard/> },


  { path: '/user', element: <User/> },
  { path: '/user/create', element: <UserCreate/> },
  { path: '/user/edit/:id', element: <UserEdit/> },
  { path: '/user/trash/', element: <UserTrash/> },



  { path: '/stuff/create', element: <StuffCreate /> },
  {path: '/stuff/edit/:id', element: <StuffEdit/>},
  { path: '/stuff', element: <Stuff /> },
  { path: '/stuff/trash', element: <StuffTrash /> },

  
  {path: '/inbound', element: <Inbound/>},
  {path: '/inbound/create', element: <InboundCreate/>},

  {path: '/StuffStock', element: <StuffStock/>},
  { path: '/StuffStock/create', element: <StuffStockCreate/> },

  { path: '/lendings', element: <Lending/> },
  { path: '/lendings/create', element: <LendingCreate/> },



]);

