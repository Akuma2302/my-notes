import { useContext } from 'react';
import { ContentContext } from '../context/ContentContext.jsx';
export const useContent = () => useContext(ContentContext);
