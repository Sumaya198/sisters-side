"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Modal from 'react-modal';
import ReviewForm from './ReviewForm'; // Import the ReviewForm component
import { formatDistanceToNow } from 'date-fns'; // Import the date-fns functions
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import styles from './MosqueDetailsPage.module.css'; // Import the CSS module
import Footer from './Footer'; // Import the Footer component
import Navbar from './Navbar';

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
    <>
    <Navbar />
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.mosqueName}>{mosqueDetails.name}</h1>
            <p className={styles.mosqueAddress}>{mosqueDetails.address}</p>
          </div>
        </div>
       <div className={styles.reviewButtonContainer}>
       <button onClick={openModal} className={styles.reviewButton}>Leave a Review</button>
       </div>
        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={styles.modal}
          overlayClassName={styles.overlay}
          contentLabel="Leave a Review"
        >
          {!guidelinesAccepted ? (
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>Community Guidelines</h2>
              <h3 className={styles.modalText}>Please read and accept the community guidelines before leaving a review.</h3>
<p className={styles.modalsubText}>Sister’s Side is intended to be a resource guide to help Muslim women find suitable spaces to pray. In order to create a beneficial resource guide, all reviews must be constructive and focus on the physical space -- keeping in mind the provided criteria. We encourage members to include images of the sister’s side in their reviews, but to also avoid uploading images of masjids that may include any identifiable individuals and make sure to follow masjid rules on photography and videography. We have a zero-tolerance approach to any form of discrimination, bullying and harassment and anyone who would like to leave a review must adhere to the community guidelines. Reviews that violate the community guidelines will be subject to removal.</p>
              <div className={styles.modalButtonContainer}>
                <button className={styles.modalButton} onClick={handleAcceptGuidelines}>Accept</button>
                <button className={styles.modalButton} onClick={closeModal}>Decline</button>
              </div>
            </div>
          ) : (
            <div>

              <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={closeModal}><IoClose /></button>
                <h2 className={styles.modalTitle}>Leave a Review</h2>

                <ReviewForm mosqueId={mosqueId} onNewReview={handleNewReview} />
              </div>
            </div>
          )}
        </Modal>
        <h2 className={styles.reviewsTitle}>Reviews</h2>
        <div className={styles.reviewsContainer}>
          {reviews.length === 0 ? (
            <p className={styles.noReviews}>No reviews yet</p>
          ) : (
            reviews.map((review) => {
              console.log('Review data:', review); // Debugging log
              return (
                <div key={review._id} className={styles.reviewCard}>
                  <div className={styles.dateAndDelete}>
                  <p className={styles.date}>{formatDistanceToNow(new Date(review.createdAt))} ago</p>
                  {session && (session.user.id === review.userId._id || session.user.isAdmin) && (
                    <button className={styles.deleteButton} onClick={() => handleDeleteReview(review._id)}><FaTrashAlt /></button>
                  )}
                  </div>
                  <div className={styles.questionsContainer}>
                    <p className={styles.question}><span className={styles.bold}>Sister's Side:</span> {review.hasSistersSide ? 'Yes' : 'No'}</p>
                    <p className={styles.question}><span className={styles.bold}>Lift:</span> {review.hasLift}</p>
                    <p className={styles.question}><span className={styles.bold}>Cleanliness:</span> {review.cleanliness}</p>
                    <p className={styles.question}><span className={styles.bold}>Recommend:</span> {review.recommend ? 'Yes' : 'No'}</p>
                  </div>
                  <div className={styles.reviewContent}>
                    <h3 className={styles.bold}>Review:</h3>
                    <p>{review.reviewText}</p>
                  </div>
                  {review.images.length > 0 && (
                    <div className={styles.imagesContainer}>
                      {review.images.map((image, index) => (
                        <img key={index} src={image} alt="Review Image" className={styles.reviewImage} />
                      ))}
                    </div>
                  )}
                
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default MosqueDetailsPage;
