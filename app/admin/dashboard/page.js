// app/admin/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { data: session, status } = useSession();
    const [pendingReviews, setPendingReviews] = useState([]);
    const [approvedReviews, setApprovedReviews] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || !session.user || !session.user.isAdmin) {
            router.push('/');
            return;
        }

        const fetchReviews = async () => {
            try {
                const pendingResponse = await axios.get('/api/admin/reviews?status=pending');
                const approvedResponse = await axios.get('/api/admin/reviews?status=approved');
                setPendingReviews(pendingResponse.data);
                setApprovedReviews(approvedResponse.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                toast.error('Error fetching reviews');
            }
        };

        fetchReviews();
    }, [session, status, router]);

    const handleApprove = async (reviewId) => {
        try {
            await axios.patch(`/api/admin/reviews/${reviewId}`, { status: 'approved' });
            setPendingReviews((prev) => prev.filter((review) => review._id !== reviewId));
            toast.success('Review approved');
        } catch (error) {
            console.error('Error approving review:', error);
            toast.error('Error approving review');
        }
    };

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`/api/admin/reviews/${reviewId}`);
            setPendingReviews((prev) => prev.filter((review) => review._id !== reviewId));
            toast.success('Review deleted');
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Error deleting review');
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Pending Reviews</h2>
            <div>
                {pendingReviews.map((review) => (
                    <div key={review._id}>
                        <p><strong>{review.userId ? review.userId.name : 'Unknown User'}</strong></p>
                        <p><strong>{review.mosqueId ? review.mosqueId.name : 'Unknown Mosque'}</strong> - {review.mosqueId ? review.mosqueId.address : 'No Address'}</p>
                        <p>Sister's Side: {review.hasSistersSide ? 'Yes' : 'No'}</p>
                        <p>Lift: {review.hasLift}</p>
                        <p>Cleanliness: {review.cleanliness}</p>
                        <p>Review: {review.reviewText}</p>
                        <p>Recommend: {review.recommend ? 'Yes' : 'No'}</p>
                        {review.images.length > 0 && (
                            <div>
                                {review.images.map((image, index) => (
                                    <img key={index} src={image} alt="Review Image" width="100" />
                                ))}
                            </div>
                        )}
                        <button onClick={() => handleApprove(review._id)}>Approve</button>
                        <button onClick={() => handleDelete(review._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <h2>Approved Reviews</h2>
            <div>
                {approvedReviews.map((review) => (
                    <div key={review._id}>
                        <p><strong>{review.userId ? review.userId.name : 'Unknown User'}</strong></p>
                        <p><strong>{review.mosqueId ? review.mosqueId.name : 'Unknown Mosque'}</strong> - {review.mosqueId ? review.mosqueId.address : 'No Address'}</p>
                        <p>Sister's Side: {review.hasSistersSide ? 'Yes' : 'No'}</p>
                        <p>Lift: {review.hasLift}</p>
                        <p>Cleanliness: {review.cleanliness}</p>
                        <p>Review: {review.reviewText}</p>
                        <p>Recommend: {review.recommend ? 'Yes' : 'No'}</p>
                        {review.images.length > 0 && (
                            <div>
                                {review.images.map((image, index) => (
                                    <img key={index} src={image} alt="Review Image" width="100" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
