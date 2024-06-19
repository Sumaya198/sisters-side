// app/mosque/[id]/page.js
import MosqueDetailsPage from '../../components/MosqueDetailsPage';

const MosquePage = ({ params }) => {
    const { id } = params;

    return <MosqueDetailsPage mosqueId={id} />;
};

export default MosquePage;
