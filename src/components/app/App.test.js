import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
  test('renders logo', () => {
    render(<App />);
    const linkElement = screen.getByAltText("esquireX logo");
    expect(linkElement).toBeInTheDocument();
  });
});
