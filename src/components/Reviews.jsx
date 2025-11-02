import { useState } from 'react'
import './Reviews.css'

function Reviews() {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Rajesh Kumar', rating: 5, comment: 'Amazing food! The chicken biryani was delicious.', date: '2024-10-15' },
    { id: 2, name: 'Priya Singh', rating: 4, comment: 'Great taste and good service. Will visit again!', date: '2024-10-20' },
    { id: 3, name: 'Amit Patel', rating: 5, comment: 'Best restaurant in town. Loved the paneer tikka!', date: '2024-10-25' }
  ])

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newReview.name && newReview.comment) {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        date: new Date().toISOString().split('T')[0]
      }
      setReviews([review, ...reviews])
      setNewReview({ name: '', rating: 5, comment: '' })
    }
  }

  return (
    <div className="reviews-section" id="reviews">
      <h2 className="reviews-title">Customer Reviews</h2>
      
      <div className="review-form-container">
        <h3>Write a Review</h3>
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({...newReview, name: e.target.value})}
            required
          />
          
          <div className="rating-input">
            <label>Rating:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          
          <textarea
            placeholder="Write your review here..."
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            rows="4"
            required
          />
          
          <button type="submit" className="submit-btn">Submit Review</button>
        </form>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h4>{review.name}</h4>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                ))}
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <p className="review-date">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
