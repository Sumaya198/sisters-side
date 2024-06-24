"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Modal from 'react-modal';
import ReviewForm from './ReviewForm'; // Import the ReviewForm component
import { formatDistanceToNow } from 'date-fns'; // Import the date-fns function
import styles from './MosqueDetailsPage.module.css'; // Import the CSS module
import Footer from './Footer'; // Import the Footer component

const MosqueDetailsPage = ({ mosqueId }) => {
  const { data: session } = useSession();
  const [mosqueDetails, setMosqueDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);

  useEffect(() => {
    const storedReviews = localStorage.getItem(`reviews-${mosqueId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }

    const fetchMosqueDetails = async () => {
      try {
        const response = await axios.get(`/api/mosques/${mosqueId}`);
        setMosqueDetails(response.data);
      } catch (error) {
        console.error('Error fetching mosque details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/mosque-reviews?mosqueId=${mosqueId}`);
        console.log('Fetched reviews:', response.data); // Debugging log
        setReviews(response.data);
        localStorage.setItem(`reviews-${mosqueId}`, JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchMosqueDetails();
    fetchReviews();
  }, [mosqueId]);

  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => {
      const updatedReviews = [newReview, ...prevReviews];
      localStorage.setItem(`reviews-${mosqueId}`, JSON.stringify(updatedReviews));
      return updatedReviews;
    });
    setModalIsOpen(false); // Close the modal after submitting the review
  };

  const handleDeleteReview = async (reviewId) => {
    console.log('Attempting to delete review with ID:', reviewId);
    try {
      const response = await axios.delete(`/api/mosque-reviews/${reviewId}`);
      if (response.status === 200) {
        console.log('Review deleted successfully:', reviewId);
        setReviews((prevReviews) => {
          const updatedReviews = prevReviews.filter((review) => review._id !== reviewId);
          localStorage.setItem(`reviews-${mosqueId}`, JSON.stringify(updatedReviews));
          return updatedReviews;
        });
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleAcceptGuidelines = () => {
    setGuidelinesAccepted(true);
  };

  if (!mosqueDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>{mosqueDetails.name}</h1>
            <p>{mosqueDetails.address}</p>
          </div>
        </div>
        <button onClick={openModal} className={styles.reviewButton}>Leave a Review</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Leave a Review"
        >
          {!guidelinesAccepted ? (
            <div>
              <h2>Community Guidelines</h2>
              <p>Please read and accept the community guidelines before leaving a review.</p>
              <button onClick={handleAcceptGuidelines}>I Accept</button>
              <button onClick={closeModal}>Close</button>
            </div>
          ) : (
            <div>
              <h2>Leave a Review</h2>
              <button onClick={closeModal}>Close</button>
              <ReviewForm mosqueId={mosqueId} onNewReview={handleNewReview} />
            </div>
          )}
        </Modal>
        <h2 className={styles.reviewsTitle}>Reviews</h2>
        <div className={styles.reviewsContainer}>
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            reviews.map((review) => {
              console.log('Review data:', review); // Debugging log
              return (
                <div key={review._id} className={styles.reviewCard}>
                  <p>Sister's Side: {review.hasSistersSide ? 'Yes' : 'No'}</p>
                  <p>Lift: {review.hasLift}</p>
                  <p>Cleanliness: {review.cleanliness}</p>
                  <p>Review: {review.reviewText}</p>
                  <p>Recommend: {review.recommend ? 'Yes' : 'No'}</p>
                  {review.images.length > 0 && (
                    <div className={styles.imagesContainer}>
                      {review.images.map((image, index) => (
                        <img key={index} src={image} alt="Review Image" className={styles.reviewImage} />
                      ))}
                    </div>
                  )}
                  <p>Submitted {formatDistanceToNow(new Date(review.createdAt))} ago</p> {/* Display the date */}
                  {session && (session.user.id === review.userId._id || session.user.isAdmin) && (
                    <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MosqueDetailsPage;
