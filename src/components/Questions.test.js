import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('./Navigation', () => ({ Navigation: () => null }));
jest.mock('./Footer', () => ({ Footer: () => null }));
import { Questions } from './Questions';

test('shows registry details with linked registry names', () => {
  window.scrollTo = jest.fn();
  render(<Questions />);

  fireEvent.click(screen.getByText('Will you have a registry or are you accepting gifts?'));

  expect(screen.getByText(/We are so lucky to be in a position/)).toBeInTheDocument();

  const soireeSeasonLink = screen.getByRole('link', { name: 'Soiree Season' });
  expect(soireeSeasonLink).toHaveAttribute(
    'href',
    'https://soireeseason.com/registry/profile/6a03e251ac3d81829bfc070d'
  );
  expect(screen.getByRole('link', { name: 'Crate and Barrel' })).toHaveAttribute(
    'href',
    'https://www.crateandbarrel.com/gift-registry/Abby-Kendall-and-Ruben-Villarreal/r7564179'
  );
});
