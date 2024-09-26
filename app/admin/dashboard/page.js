'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import { FaSignOutAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { GrView } from "react-icons/gr";
import styles from './admin.module.css'
import Link from 'next/link';

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
            <div className={styles.totalUsersContainer}>
                <div>
                <h2 className={styles.totalUsers}>Total Users:</h2>
                </div>
                <div className={styles.totalUserNumber}>{users.length}</div>
            </div>
           
            <div className={styles.usersContainer}>
                <table className="styled-table">
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.userHeading}>Name</th>
                            <th className={styles.userHeading}>Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className={styles.userContentContainer}>{user.name}</td>
                                <td className={styles.userContentContainer}>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderPendingReviews = () => (
        <div>
            <h2 className={styles.adminTitles}>New Reviews</h2>
            <div>
                {pendingReviews.map((review) => (
                    <div key={review._id} className={styles.review}>
                        <div className={styles.contentAdmin}>
                            <p className={styles.adminReviewName}><strong>{review.userId ? review.userId.name : 'Unknown User'}</strong></p>
                            <p><strong>{review.mosqueId ? review.mosqueId.name : 'Unknown Mosque'}</strong> - {review.mosqueId ? review.mosqueId.address : 'No Address'}</p>
                            <p><span className={styles.adminBoldQuestions}>Sister's Side: </span> {review.hasSistersSide ? 'Yes' : 'No'}</p>
                            <p><span className={styles.adminBoldQuestions}>Lift: </span> {review.hasLift}</p>
                            <p><span className={styles.adminBoldQuestions}>Cleanliness: </span> {review.cleanliness}</p>
                            <p><span className={styles.adminBoldQuestions}>Review: </span> {review.reviewText}</p>
                            <p><span className={styles.adminBoldQuestions}>Recommend: </span> {review.recommend ? 'Yes' : 'No'}</p>
                            {review.images.length > 0 && (
                                <div>
                                    {review.images.map((image, index) => (
                                        <img key={index} src={image} alt="Review Image" width="100" />
                                    ))}
                                </div>
                            )}
                            <button className={styles.viewedBtn} onClick={() => handleViewed(review._id)}>Viewed</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderViewedReviews = () => (
        <div>
            <h2 className={styles.adminTitles}>Viewed Reviews</h2>
            <div>
                {viewedReviews.map((review) => (
                    <div key={review._id} className={styles.review}>
                        <span className={styles['viewed-label']}>Viewed</span>
                        <div className={styles.contentAdmin}>
                            <h2 className={styles.adminReviewName}><strong>{review.userId ? review.userId.name : 'Unknown User'}</strong></h2>
                            <p><strong>{review.mosqueId ? review.mosqueId.name : 'Unknown Mosque'}</strong> - {review.mosqueId ? review.mosqueId.address : 'No Address'}</p>
                            <p><span className={styles.adminBoldQuestions}>Sister's Side:</span> {review.hasSistersSide ? 'Yes' : 'No'}</p>
                            <p><span className={styles.adminBoldQuestions}>Lift:</span> {review.hasLift}</p>
                            <p><span className={styles.adminBoldQuestions}>Cleanliness:</span> {review.cleanliness}</p>
                            <p><span className={styles.adminBoldQuestions}>Review:</span> {review.reviewText}</p>
                            <p><span className={styles.adminBoldQuestions}>Recommend:</span> {review.recommend ? 'Yes' : 'No'}</p>
                            {review.images.length > 0 && (
                                <div>
                                    {review.images.map((image, index) => (
                                        <img key={index} src={image} alt="Review Image" width="100" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div className={styles['admin-dashboard']}>
            <div className={styles.sidebar}>
                <div className={styles.sidbarLogo}>
                <h1>SS</h1>
                </div>
               
                <button onClick={() => handleMenuClick('users')}><FaRegUser /> <div className={styles.sidebarMenuText}>Users</div></button>
                <button onClick={() => handleMenuClick('pendingReviews')}>
                <MdOutlineReviews /> <div className={styles.sidebarMenuText}>Reviews</div> {newReviewCount > 0 && <span className={styles.badge}>+{newReviewCount}</span>}
                </button>
                <button onClick={() => handleMenuClick('viewedReviews')}><GrView /> <div className={styles.sidebarMenuText}>Viewed Reviews</div></button>
                <div className={styles.sidebarFooter}>
                    <div className={styles.sidbarLastBitContainer}>
                        <div><FaHome /></div>
                        <div ><Link href='/' className={styles.homeFooterMenu}>Home</Link></div>
                    </div>
                
                    <div className={styles.sidbarLastBitContainer}>
                        <div><FaSignOutAlt /></div>
                        <div className={styles.homeFooterMenu}><Link href='' onClick={() => signOut()}>Sign Out</Link></div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <h1 className={styles.adminTitle}>Admin Dashboard</h1>
                {selectedMenu === 'users' && renderUsers()}
                {selectedMenu === 'pendingReviews' && renderPendingReviews()}
                {selectedMenu === 'viewedReviews' && renderViewedReviews()}
            </div>
        </div>
    );
};

export default AdminDashboard;

