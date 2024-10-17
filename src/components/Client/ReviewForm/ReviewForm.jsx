import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import axios from 'axios';

const Tailwind = {
  form: {
    fieldWrapper: 'mb-4',
    label: 'block text-sm font-medium text-gray-700 mb-1 dark:text-white/80',
    textarea: 'block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-900 dark:text-white/80 dark:border-gray-600'
  },
  footer: {
    buttonsContainer: 'flex justify-between items-center',
    button: 'p-button'
  }
};

const ReviewForm = ({ productId, onClose }) => {
  const [rating, setRating] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // تحديد حالة التحرير

  useEffect(() => {
    // جلب المراجعة الحالية للمستخدم إذا كانت موجودة
    const fetchReview = async () => {
      try {
        const response = await axios.get(`https://server-esw.up.railway.app/api/v1/reviews/product/${productId}`);
        if (response.data.review) {
          setRating(response.data.review.rating);
          setReviewComment(response.data.review.comment);
          setIsEditing(true); // إذا كانت هناك مراجعة موجودة، تغيير الحالة إلى التحرير
        }
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };
    
    fetchReview();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reviewData = {
      rating, 
      comment: reviewComment 
    };

    try {
      if (isEditing) {
        // تحديث المراجعة الموجودة
        const response = await axios.put(`https://server-esw.up.railway.app/api/v1/reviews/product/${productId}`, reviewData);
        if (response.data.status === 'success') {
          alert('Done processing');
        }
      } else {
        // إضافة مراجعة جديدة
        const response = await axios.post(`https://server-esw.up.railway.app/api/v1/reviews/product/${productId}`, reviewData);
        if (response.data.status === 'success') {
          alert(' Done Processing');
          setIsEditing(true); // بعد الحفظ، التغيير إلى وضع التحرير
        }
      }
      onClose(); // إغلاق المودال بعد الحفظ
    } catch (error) {
      setError('Error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog header={isEditing ? "Edit Your Review" : "Write a Review"} visible={true} onHide={onClose} style={{ width: '50vw' }}>
      <form onSubmit={handleSubmit}>
        <div className={Tailwind.form.fieldWrapper}>
          <label htmlFor="rating" className={Tailwind.form.label}>Rating</label>
          <Rating
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.value)}
            stars={5}
            cancel={false}
          />
        </div>

        <div className={Tailwind.form.fieldWrapper}>
          <label htmlFor="reviewComment" className={Tailwind.form.label}>Share your thoughts</label>
          <textarea
            id="reviewComment"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className={Tailwind.form.textarea}
            rows={5}
            placeholder="Your thoughts on the product"
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className={Tailwind.footer.buttonsContainer}>
          <Button label="Cancel" className="p-button-secondary" onClick={onClose} />
          <Button
            label={loading ? (isEditing ? "Updating..." : "Saving...") : (isEditing ? "Update" : "Save")}
            className="p-button-success"
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default ReviewForm;
