// app/components/MosqueCard.js
import Link from 'next/link';

const MosqueCard = ({ mosque }) => {
    return (
        <div className="card">
            <h3>{mosque.name}</h3>
            <p>{mosque.formatted_address}</p>
            <p>Rating: {mosque.rating}</p>
            <Link href={`/mosque/${mosque.place_id}`}>
                View Details
            </Link>
        </div>
    );
};

export default MosqueCard;
