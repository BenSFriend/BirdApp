import React, { useEffect, useRef } from "react";
import styles from "./BirdCard.module.css";
import { useNavigate } from "react-router-dom";

// Radial magnification hook
const useRadialMagnification = (cardRef) => {


    const getCardCenter = (card) => {
        const rect = card.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    };

    const getDistance = (pos1, pos2) => {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const handleHover = (hoveredCard) => {
        // Find all cards in the same container
        const container = hoveredCard.closest('.bird-grid') || hoveredCard.parentElement;
        const allCards = container.querySelectorAll(`.${styles.cardContainer}`);
        const hoveredCenter = getCardCenter(hoveredCard);

        // Calculate distances and sort by proximity
        const cardDistances = Array.from(allCards).map(card => ({
            card,
            distance: card === hoveredCard ? 0 : getDistance(hoveredCenter, getCardCenter(card))
        })).sort((a, b) => a.distance - b.distance);

        cardDistances.forEach(({ card, distance }, index) => {
            if (card === hoveredCard) {

                // Hovered card grows largest
                card.style.transform = 'scale(1.2)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
            } else {
                // Create exponential decay based on distance rings
                // Use both pixel distance and proximity rank for smoother effect
                const maxDistance = 1200; // Increased for better range
                const normalizedDistance = Math.min(distance / maxDistance, 1);

                // Exponential decay formula: more dramatic falloff
                const falloff = Math.pow(normalizedDistance, 1.5); // Power > 1 for exponential decay

                // Scale decreases more dramatically with distance
                const scale = 1 - (falloff * 0.4); // 40% max reduction
                const opacity = 1 - (falloff * 0.5); // 50% max opacity reduction
                const translateY = falloff * 12; // Subtle vertical offset

                // Ensure minimum values
                const finalScale = Math.max(scale, 0.6);
                const finalOpacity = Math.max(opacity, 0.4);

                card.style.transform = `scale(${finalScale}) translateY(${translateY}px)`;
                card.style.opacity = finalOpacity;
                card.style.zIndex = '1';
            }
        });
    };

    const resetCards = () => {
        const card = cardRef.current;
        if (!card) return;

        const container = card.closest('.bird-grid') || card.parentElement;
        const allCards = container.querySelectorAll(`.${styles.cardContainer}`);

        allCards.forEach(card => {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.opacity = '1';
            card.style.zIndex = 'auto';
        });
    };

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Set up base styles
        card.style.transition = 'all 0.3s ease';
        card.style.transformOrigin = 'center';

        const handleMouseEnter = () => handleHover(card);
        const handleMouseLeave = resetCards;

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);
};

export default function BirdCard({ bird }) {
    const navigate = useNavigate();
    const cardRef = useRef(null);

    // Use the radial magnification effect
    useRadialMagnification(cardRef);

    console.log('Bird data:', bird);
    console.log('Image URL:', bird.img_url);

    return (
        <div
            ref={cardRef}
            className={styles.cardContainer}
            onClick={() => navigate(`/bird/${bird.id}`)}
        >
            <h2 className={styles.birdName}>{bird.bird_name}</h2>
            <img className={styles.birdImage} src={bird.img_url} alt={bird.img_url} />
            <div className={styles.infoContainer}>
                <div className={styles.infoSubContainer}>
                    <h1 className={styles.wingspan}> Wingspan- {bird.wingspan}</h1>
                    <h1 className={styles.range}> Native Range- {bird.bird_range}</h1>
                    <h1 className={styles.diet}> Diet- {bird.bird_diet}</h1>
                </div>
                <p className={styles.birdDescription}>{bird.bird_description}</p>
            </div>
        </div>
    );
}