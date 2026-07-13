import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from '../../hooks/useAuth';

jest.mock('../../services/auth', () => ({
  onAuthStateChanged: (callback: (user: null) => void): (() => void) => {
    setTimeout(() => callback(null), 0);
    return jest.fn();
  },
}));

describe('useAuth', () => {
  it('returns loading true initially', async () => {
    jest.useFakeTimers();
    const { result } = await renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    jest.useRealTimers();
  });

  it('returns null user when signed out', async () => {
    const { result } = await renderHook(() => useAuth());
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
