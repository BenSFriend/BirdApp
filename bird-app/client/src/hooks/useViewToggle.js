import { useState, useEffect } from 'react';

export const useViewToggle = () => {
  const [currentView, setCurrentView] = useState('gallery');

  useEffect(() => {
    const savedView = localStorage.getItem('birdAppView') || 'gallery';
    setCurrentView(savedView);
  }, []);

  const toggleView = () => {
    const newView = currentView === 'gallery' ? 'list' : 'gallery';
    setCurrentView(newView);
    localStorage.setItem('birdAppView', newView);
  };

  return { currentView, toggleView };
};