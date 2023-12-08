import { beforeEach, it } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
describe('Testing navigation ', () => {
  beforeEach(() => {
    render(<App />);
    fireEvent.click(screen.getByTestId('nav-icon'));
  });

  test(' Should have 2 navigation links when the menu', () => {
    const navigationLinks = screen.getAllByTestId('nav-link');
    expect(navigationLinks.length).toBe(2);
    expect(navigationLinks[0].textContent).toBe('Booking');
    expect(navigationLinks[1].textContent).toBe('Confirmation');
  });

  test('Should navigate to the correct page when a navigation link is clicked', async () => {
    const navigationLinks = screen.getAllByTestId('nav-link');
  
    // Click on the booking link
    fireEvent.click(navigationLinks[0]);
    await waitFor(() => {
      expect(screen.queryByText('When, WHAT & Who')).toBeInTheDocument();
    });
  
    // Click on the confirmation link
    fireEvent.click(navigationLinks[1]);
    await waitFor(() => {
      expect(screen.queryByText('Inga bokning gjord!')).toBeInTheDocument();
    });
  });
  
});
