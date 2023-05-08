import { UserCard } from '@/components';
import { User } from '@/models';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('UserCard', () => {
  const user: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('renders user details correctly', () => {
    render(<UserCard user={user} />);

    const userPicture = screen.getByAltText('User Picture') as HTMLImageElement;
    expect(userPicture.width).toBe(512);
    expect(userPicture.height).toBe(512);

    const userId = screen.getByText(`#${user.id}`);
    expect(userId).toBeInTheDocument();

    const firstName = screen.getByText('First Name');
    expect(firstName).toBeInTheDocument();
    const lastName = screen.getByText('Last Name');
    expect(lastName).toBeInTheDocument();
    const email = screen.getByText('Email');
    expect(email).toBeInTheDocument();

    const firstNameValue = screen.getByText(user.firstName);
    expect(firstNameValue).toBeInTheDocument();
    const lastNameValue = screen.getByText(user.lastName);
    expect(lastNameValue).toBeInTheDocument();
    const emailValue = screen.getByText(user.email);
    expect(emailValue).toBeInTheDocument();
  });
});