import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import { AppProps } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { NextPage, NextPageContext } from 'next';
import { configureStore } from '../store';
import '../styles/index.scss';
import { verifyAuth } from '../actions/loginActions';
import Router from 'next/router';

import Header from '../containers/Header';

const store = configureStore();

const ToDoApp: NextPage<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    store.dispatch(verifyAuth() as any);
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps}/>
    </Provider>
  );
};

export default withRedux(configureStore)(ToDoApp);
