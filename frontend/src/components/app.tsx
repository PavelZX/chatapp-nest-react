import React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { AuthActions } from '../reducers/auth.reducer';

const usernameSelector = createSelector(
  (state: RootState) => state.auth,
  auth => auth.username,
);

const App = (props: any) => {
  const dispatch = useDispatch();
  const state = useSelector(usernameSelector);
  console.log(state);

  return (
    <div>
      <button onClick={() => dispatch(AuthActions.login())}>LOGIN</button>
    </div>
  );
};

export default App;
