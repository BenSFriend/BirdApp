import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import BirdService from '../../services/BirdService';
import styles from './HomeView.module.css';
import BirdCard from '../../components/BirdCard/BirdCard';

export default function HomeView() {
  const user = useContext(UserContext);
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    const fetchBirds = async () => {
      const birdData = await BirdService.getAllBirds();
      setBirds(birdData);
    };
    
    fetchBirds();
  }, []);

  return (
    <div className={styles.wholePage}>
    
      <div className={styles.cardContainer}> 
        {birds.map(bird => (
          <BirdCard key={bird.id} bird={bird} />
        ))}
      </div>
    </div>
  );
}