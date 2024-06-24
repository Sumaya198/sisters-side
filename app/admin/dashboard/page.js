// app/admin/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';

const AdminDashboard = () => {
    const { data: session, status } = useSession();
    const [pendingReviews, setPendingReviews] = useState([]);
    const [viewedReviews, setViewedReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState('users');
    const [newReviewCount, setNewReviewCount] = useState(0);
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
                const viewedResponse = await axios.get('/api/admin/reviews?status=viewed');
                const sortedPendingReviews = pendingResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPendingReviews(sortedPendingReviews);
                setViewedReviews(viewedResponse.data);
                setNewReviewCount(sortedPendingReviews.length);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                toast.error('Error fetching reviews');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users');
                console.log('Users fetched:', response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Error fetching users');
            }
        };

        fetchReviews();
        fetchUsers();
    }, [session, status, router]);

    const handleViewed = async (reviewId) => {
        try {
            await axios.patch(`/api/admin/reviews/${reviewId}`, { status: 'viewed' });
            const updatedReview = pendingReviews.find((review) => review._id === reviewId);
            setPendingReviews((prev) => prev.filter((review) => review._id !== reviewId));
            setViewedReviews((prev) => [updatedReview, ...prev]);
            setNewReviewCount((prevCount) => prevCount - 1); // Decrement the new review count
            toast.success('Review marked as viewed');
        } catch (error) {
            console.error('Error marking review as viewed:', error);
            toast.error('Error marking review as viewed');
        }
    };

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`/api/admin/reviews/${reviewId}`);
            setPendingReviews((prev) => prev.filter((review) => review._id !== reviewId));
            setViewedReviews((prev) => prev.filter((review) => review._id !== reviewId));
            toast.success('Review deleted');
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Error deleting review');
        }
    };

    const renderUsers = () => (
        <div>
            <h2>Total Users: {users.length}</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderPendingReviews = () => (
        <div>
            <h2>New Reviews</h2>
            <div>
                {pendingReviews.map((review) => (
                    <div key={review._id} className={`review ${review.status === 'viewed' ? 'viewed' : ''}`}>
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
                        <button onClick={() => handleViewed(review._id)}>Viewed</button>
                        
                    </div>
                ))}
            </div>
        </div>
    );

    const renderViewedReviews = () => (
        <div>
            <h2>Viewed Reviews</h2>
            <div>
                {viewedReviews.map((review) => (
                    <div key={review._id} className={`review ${review.status === 'viewed' ? 'viewed' : ''}`}>
                        <span className="viewed-label">Viewed</span>
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

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <h1>Logo</h1>
                <button onClick={() => handleMenuClick('users')}>Users</button>
                <button onClick={() => handleMenuClick('pendingReviews')}>
                    Reviews {newReviewCount > 0 && <span className="badge">+{newReviewCount}</span>}
                </button>
                <button onClick={() => handleMenuClick('viewedReviews')}>Viewed Reviews</button>
            </div>
            <div className="content">
                <h1>Admin Dashboard</h1>
                {selectedMenu === 'users' && renderUsers()}
                {selectedMenu === 'pendingReviews' && renderPendingReviews()}
                {selectedMenu === 'viewedReviews' && renderViewedReviews()}
            </div>
            <style jsx>{`
                .admin-dashboard {
                    display: flex;
                }
                .sidebar {
                    width: 200px;
                    background-color: #f4f4f4;
                    padding: 2rem 10px;
                    position: fixed;
                    height: 100vh;
                    top: 0; /* Adjust according to the navbar height */
                    left: 0;
                    overflow-y: auto;
                }
                .sidebar button {
                    display: block;
                    width: 100%;
                    margin-bottom: 10px;
                    padding: 10px;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    cursor: pointer;
                    position: relative;
                }
                .sidebar button:hover {
                    background-color: #eee;
                }
                .badge {
                    background-color: red;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 50%;
                    font-size: 0.8rem;
                    position: absolute;
                    top: 5px;
                    right: 10px;
                }
                .content {
                    margin-left: 220px; /* Adjust according to the sidebar width */
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    height: calc(100vh - 60px); /* Adjust according to the navbar height */
                }
                .styled-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    font-size: 0.9em;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .styled-table thead tr {
                    background-color: #009879;
                    color: #ffffff;
                    text-align: left;
                }
                .styled-table th,
                .styled-table td {
                    padding: 12px 15px;
                }
                .styled-table tbody tr {
                    border-bottom: 1px solid #dddddd;
                }
                .styled-table tbody tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }
                .styled-table tbody tr:last-of-type {
                    border-bottom: 2px solid #009879;
                }
                .review {
                    padding: 10px;
                    border: 1px solid #ddd;
                    margin-bottom: 10px;
                    position: relative;
                }
                .viewed-label {
                    background-color: green;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 0.9rem;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
