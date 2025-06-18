import React from "react";
import styles from "./BirdCard.module.css";
import { useNavigate } from "react-router-dom";


export default function BirdCard({ bird }) {
    const navigate = useNavigate();

    console.log('Bird data:', bird);
    console.log('Image URL:', bird.img_url);

    return (
        <div className={styles.cardContainer} onClick={() => navigate(`/bird/${bird.id}`)}>
            <h2 className={styles.birdName}>{bird.bird_name}</h2>
            <img className={styles.birdImage} src={bird.img_url} alt={bird.bird_name} />
            <div className={styles.infoContainer}>
                <div className={styles.infoSubContainer}>
                    <h1 className={styles.wingspan}> Wingspan- {bird.wingspan}</h1>
                    <h1 className={styles.range}> Native Range- {bird.range}</h1>
                    <h1 className={styles.diet}> Diet- {bird.diet}</h1>
                </div>
                <p className={styles.birdDescription}>{bird.bird_description} bird description here, need to add to database</p>
            </div>
        </div>
    );
}