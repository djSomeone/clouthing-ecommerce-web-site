import React, { useState } from "react";
import styles from "./AddProductReview.module.css";

const AddProductReview = ({ productId, userId }) => {
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const reviewData = {
      productId,
      userId,
      stars,
      comment,
    };

    try {
      const response = await fetch(`{{local}}/user/productReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to add review.");
      }

      await response.json();
      setSuccessMsg("Review added successfully!");
      setComment("");
      setStars(5);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Your Review</h2>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <div className={styles.formGroup}>
          <label htmlFor="stars">Rating:</label>
          <select
            id="stars"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className={styles.selectInput}
          >
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Good</option>
            <option value={3}>3 - Average</option>
            <option value={2}>2 - Poor</option>
            <option value={1}>1 - Terrible</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            className={styles.textArea}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
};

export default AddProductReview;
