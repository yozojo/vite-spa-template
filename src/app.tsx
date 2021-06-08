import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';

const Contented = ({ history }) => (
  <ConnectedRouter history={history}>{routes}</ConnectedRouter>
);

Contented.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Contented;
