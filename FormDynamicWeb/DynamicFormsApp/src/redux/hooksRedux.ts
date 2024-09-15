import { useDispatch, useSelector } from 'react-redux';

// Usa los hooks de Redux directamente
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
