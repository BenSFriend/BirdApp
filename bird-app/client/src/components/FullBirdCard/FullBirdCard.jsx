import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FullBirdCard.module.css";

export default function FullBirdCard({ bird }) {
    const navigate = useNavigate();

    return (
        <div className={styles.cardContainer} onClick={() => navigate(`/bird/${bird.id}`)}>
            <h2 className={styles.birdName}>{bird.bird_name || bird.name}</h2>
            <img className={styles.birdImage} src={bird.img_url || bird.image} alt={bird.bird_name || bird.name} />
            <div className={styles.infoContainer}>
                <div className={styles.infoSubContainer}>
                    <h1 className={styles.wingspan}>Wingspan- {bird.wingspan}</h1>
                    <h1 className={styles.range}>Native Range- {bird.range}</h1>
                    <h1 className={styles.diet}>Diet- {bird.diet}</h1>
                </div>
                <p className={styles.birdDescription}>
                    {bird.bird_description || 'Beautiful bird with distinctive characteristics.'}
                </p>
            </div>
        </div>
    );
}