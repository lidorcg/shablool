import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Game from '/imports/api/games/games';
import HistoryManager from './games-managed/game-stats.js';
import HistoryPlayer from './games-played/games-stats.js';
import Loading from '../../components/loading';

const HistoryRouter = ({ game }) => {
  const isManager = game.quiz.owner === Meteor.userId();
  return isManager ? <HistoryManager game={game} /> : <HistoryPlayer game={game} />;
};

HistoryRouter.propTypes = {
  game: PropTypes.instanceOf(Object).isRequired,
};

const HistoryRouterContainer = ({ loading, game }) => {
  if (loading) return <Loading color={'white'} />;
  return <HistoryRouter game={game} />;
};

HistoryRouterContainer.propTypes = {
  game: PropTypes.instanceOf(Object),
  loading: PropTypes.bool.isRequired,
};

export default createContainer(({ code }) => {
  const usersHandle = Meteor.subscribe('users.names');
  const gameHandle = Meteor.subscribe('games.get-by-code', code);
  const loading = !gameHandle.ready() || !usersHandle.ready();
  const game = Game.findOne();
  return { loading, game };
}, HistoryRouterContainer);