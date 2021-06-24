import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {addNewMessage, addPost, changeMessage, changeNewText, state} from './redux/store';


test('renders learn react link', () => {
  render(<App state={state} addPost={addPost} newPostText={state.profilePage.newPostText} changeNewText={changeNewText} newMessage={state.dialogPage.newMessage} changeMessage={changeMessage} addNewMessage={addNewMessage}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
