import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../components/ui/Button';

describe('Button', () => {
  it('renders correctly', async () => {
    const { getByText } = await render(
      <Button title="Test Button" onPress={(): void => undefined} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = await render(
      <Button title="Press Me" onPress={mockOnPress} />
    );
    await fireEvent.press(getByTestId('button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', async () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = await render(
      <Button title="Disabled" onPress={mockOnPress} disabled />
    );
    const button = getByTestId('button');
    expect(button.props.accessibilityState?.disabled).toBe(true);
  });

  it('shows loading indicator when loading', async () => {
    const { queryByText, getByTestId } = await render(
      <Button title="Loading" onPress={(): void => undefined} loading />
    );
    expect(queryByText('Loading')).toBeNull();
    expect(getByTestId('button')).toBeTruthy();
  });
});
