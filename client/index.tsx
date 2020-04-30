import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from '../features/HomePage/HomePageView';
import { getConnectionsFromPorts } from './connection';
import * as routeMap from '../server/routes';

const ports = getConnectionsFromPorts()

const root = document.querySelector('#root');
ReactDOM.render(<HomePage ports={ports} />, root);
