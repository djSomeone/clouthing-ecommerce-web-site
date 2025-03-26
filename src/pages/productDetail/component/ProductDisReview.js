import React, { useState, useEffect } from "react";
import styles from "./ProductDisReview.module.css";
import { domain } from "../../../api.service";

const ProductDisReview = ({ productId,discription }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example description text
  const descriptionText =discription

  // Fetch review data from the API endpoint
  useEffect(() => {
    const fetchReviewData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${domain}/user/productReviewDetails/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch review data.");
        }
        const data = await response.json();
        setReviewData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
      setLoading(false);
    };

    if (productId) {
      fetchReviewData();
    }
  }, [productId]);

  // Destructure overallReview and topReviews from fetched data,
  // falling back to default values if data is not available
  const overallReview = reviewData?.overallReview || { avgRating: 0, totalReviews: 0 };
  const topReviews = reviewData?.topReviews || [];

  return (
    <div className={styles.container}>
      {/* Tab Buttons */}
      <div className={styles.tabButtons}>
        <button
          className={
            activeTab === "description" ? styles.activeTabButton : styles.tabButton
          }
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={
            activeTab === "reviews" ? styles.activeTabButton : styles.tabButton
          }
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <hr />

      {/* Description Section */}
      {activeTab === "description" && (
        <div className={styles.descriptionSection}>
          <h2 style={{ margin: "0px" }}>Description</h2>
          <p style={{ textAlign: "start" }}>{descriptionText}</p>
        </div>
      )}

      {/* Reviews Section */}
      {activeTab === "reviews" && (
        <div className={styles.reviewsSection}>
          <h2>Reviews</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <>
              {/* Overall Review Data */}
              <div className={styles.overallReview}>
                <span className={styles.avgRating}>
                  Overall Rating: {overallReview.avgRating} / 5
                </span>
                <span className={styles.totalReviews}>
                  ({overallReview.totalReviews} reviews)
                </span>
              </div>
              {topReviews.length > 0 ? (
                <div className={styles.rootReview}>
                  {topReviews.map((review) => (
                    <div key={review._id} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <span className={styles.userName}>
                          {review.userId.name}
                        </span>
                        <span className={styles.rating}>
                          {Array(review.stars)
                            .fill("★")
                            .join("")}
                        </span>
                      </div>
                      <p className={styles.comment}>{review.comment}</p>
                      <small className={styles.date}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noReviews}>
                  No reviews available for this product.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDisReview;
