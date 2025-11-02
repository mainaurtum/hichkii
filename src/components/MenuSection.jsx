import { useState } from 'react'
import './MenuSection.css'

function MenuSection({ title, items, category, onAddToCart }) {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (item, index) => {
    setSelectedItem(selectedItem === index ? null : index)
  }

  return (
    <div className="menu-section" id="menu">
      <h3 className="section-title">{title}</h3>
      <div className="menu-horizontal-scroll">
        <div className="menu-row">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`menu-card ${selectedItem === index ? 'active' : ''}`}
              onClick={() => handleItemClick(item, index)}
            >
              <div className="menu-card-image">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={(e) => {
                    console.error(`Failed to load image for ${item.name}:`, item.image);
                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop';
                  }}
                />
                <div className="menu-card-overlay">
                  <span className="view-details">Click for details</span>
                </div>
              </div>
              <div className="menu-card-content">
                <h4 className="item-name">{item.name}</h4>
                <div className="item-price">
                  {item.half && item.full ? (
                    <div className="half-full">
                      <span className="price-label">Half: <strong>₹{item.half}</strong></span>
                      <span className="price-label">Full: <strong>₹{item.full}</strong></span>
                    </div>
                  ) : item.full ? (
                    <span className="price">₹{item.full}</span>
                  ) : null}
                </div>
              </div>
              {selectedItem === index && (
                <div className="item-details">
                  <p className="detail-text">Delicious {item.name} prepared with authentic spices and fresh ingredients.</p>
                  <button className="order-btn" onClick={() => {
                    onAddToCart(item)
                    setSelectedItem(null)
                  }}>Add to Cart</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuSection
