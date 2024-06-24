// app/components/MosqueCard.js
import Link from 'next/link';
import styles from './SearchForm.module.css'; 

const MosqueCard = ({ mosque }) => {
    const getPhotoUrl = (photoReference) => {
        const apiKey = 'AIzaSyA6RgGm2crPmrK2O4WRn1EC44Tb-bnqFp8';
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
    };
    const photoUrl = mosque.photos && mosque.photos.length > 0 ? getPhotoUrl(mosque.photos[0].photo_reference) : mosque.icon;
    return (
        <div className={styles.mosqueCard}>
                {photoUrl && (
                <img src={photoUrl} alt={mosque.name} className={styles.mosqueImage} />
            )}
            <div className={styles.cardContent}>
            <h3>{mosque.name}</h3>
            <p>{mosque.formatted_address}</p>
            <p>Rating: {mosque.rating}</p>
            </div>

            <Link href={`/mosque/${mosque.place_id}`} className={styles.detailsButton}>
                View Details
            </Link>
        </div>
    );
};

export default MosqueCard;
