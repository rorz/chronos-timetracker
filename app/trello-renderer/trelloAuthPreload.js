/* eslint-disable no-param-reassign */
import {
  actionTypes,
} from 'trello-actions';
import * as Sentry from '@sentry/electron';

import configureStore from './store/configurePreloadStore';
import pjson from '../package.json';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableNative: false,
    release: `${pjson.version}_${process.platform}`,
  });
}

const store = configureStore();

function authRequest({ token }) {
  return {
    type: actionTypes.AUTH_REQUEST,
    token,
    scope: [1],
  };
}

function hideNode(el, scope) {
  const node = (scope || document).querySelector(el);
  if (node) {
    node.style.display = 'none';
  }
}

function initTrello(base) {
  hideNode('.account-header');
  hideNode('.privacy');

  const surface = base.querySelector('#surface');
  base.style.width = '100%';
  base.style.height = '100%';
  surface.style.margin = '0';
  surface.style.padding = '0';
  surface.style.width = '100%';
  surface.style.height = '100%';
  surface.style.border = 'none';
}

function init() {
  console.log('global.location.host', global.location.host);
  console.log('global.location.pathname', global.location.pathname);
  if (
    global.location.host === 'trello.com'
    && global.location.pathname === '/1/authorize'
  ) {
    const base = document.querySelector('.account-page');
    if (
      base
    ) {
      initTrello(base);
    }
  } else if (
    global.location.host === 'trello.com'
    && global.location.pathname === '/1/token/approve'
  ) {
    const token = document.querySelector('pre').textContent.trim();
    store.dispatch(authRequest({
      token,
    }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});