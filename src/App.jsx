import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import MenuSection from './components/MenuSection'
import Reviews from './components/Reviews'
import menuData from './menuData'

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [addedItemName, setAddedItemName] = useState('')

  const addToCart = (item, category) => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name)
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.name === item.name 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { 
        ...item, 
        category,
        quantity: 1,
        selectedSize: item.half && item.full ? 'full' : 'full'
      }])
    }
    
    // Show toast notification
    setAddedItemName(item.name)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const removeFromCart = (itemName) => {
    setCart(cart.filter(item => item.name !== itemName))
  }

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemName)
    } else {
      setCart(cart.map(item => 
        item.name === itemName 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const updateSize = (itemName, size) => {
    setCart(cart.map(item => 
      item.name === itemName 
        ? { ...item, selectedSize: size }
        : item
    ))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.selectedSize === 'half' && item.half ? item.half : item.full
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const categories = [
    { id: 'all', name: 'All Items', color: '#d94028' },
    { id: 'veg-indian', name: 'Veg Items (Indian)', color: '#f5a623' },
    { id: 'non-veg-indian', name: 'Non-Veg Items (Indian)', color: '#f5a623' },
    { id: 'mushroom', name: 'Mushroom Items', color: '#f5a623' },
    { id: 'chinese-veg', name: 'Chinese Items (Veg)', color: '#f5a623' },
    { id: 'chinese-non-veg', name: 'Chinese Items (Non-Veg)', color: '#f5a623' },
    { id: 'roti', name: 'Roti & Paratha', color: '#f5a623' },
    { id: 'roll', name: 'Roll Items', color: '#f5a623' },
    { id: 'noodles', name: 'Noodles (Chowmin)', color: '#f5a623' },
    { id: 'rice', name: 'Rice Items', color: '#f5a623' },
    { id: 'biryani', name: 'Biryani', color: '#f5a623' },
    { id: 'salad', name: 'Salad & Raita', color: '#f5a623' },
    { id: 'papad', name: 'Papad', color: '#f5a623' },
    { id: 'soup', name: 'Soup', color: '#f5a623' },
    { id: 'starters-veg', name: 'Starters (Veg)', color: '#f5a623' },
    { id: 'starters-non-veg', name: 'Starters (Non-Veg)', color: '#f5a623' },
    { id: 'dal', name: 'Dal', color: '#f5a623' },
    { id: 'tandoori', name: 'Tandoori Items', color: '#f5a623' }
  ]

  const getCategoryItems = () => {
    if (activeCategory === 'all') {
      return menuData
    }
    
    const categoryMap = {
      'veg-indian': 'Veg Items (Indian)',
      'non-veg-indian': 'Non-Veg Items (Indian)',
      'mushroom': 'Mushroom Items',
      'chinese-veg': 'Chinese Items (Veg)',
      'chinese-non-veg': 'Chinese Items (Non-Veg)',
      'roti': 'Roti & Paratha',
      'roll': 'Roll Items',
      'noodles': 'Noodles (Chowmin)',
      'rice': 'Rice Items',
      'biryani': 'Biryani',
      'salad': 'Salad & Raita',
      'papad': 'Papad',
      'soup': 'Soup',
      'starters-veg': 'Starters (Veg)',
      'starters-non-veg': 'Starters (Non-Veg)',
      'dal': 'Dal',
      'tandoori': 'Tandoori Items'
    }
    
    const categoryName = categoryMap[activeCategory]
    return menuData.filter(item => item.category === categoryName)
  }

  return (
    <div className="App">
      <Header cartCount={getCartCount()} onCartClick={() => setIsCartOpen(!isCartOpen)} />
      
      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-icon">✅</span>
            <div className="toast-text">
              <strong>{addedItemName}</strong> added to cart
            </div>
          </div>
          <button 
            className="toast-view-cart" 
            onClick={() => {
              setIsCartOpen(true)
              setShowToast(false)
            }}
          >
            View Cart
          </button>
        </div>
      )}
      
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-cart" onClick={() => setIsCartOpen(false)}>&times;</button>
            </div>
            
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p className="cart-item-category">{item.category}</p>
                        {item.half && item.full && (
                          <div className="size-selector">
                            <button 
                              className={item.selectedSize === 'half' ? 'active' : ''}
                              onClick={() => updateSize(item.name, 'half')}
                            >
                              Half (₹{item.half})
                            </button>
                            <button 
                              className={item.selectedSize === 'full' ? 'active' : ''}
                              onClick={() => updateSize(item.name, 'full')}
                            >
                              Full (₹{item.full})
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                        </div>
                        <p className="cart-item-price">
                          ₹{(item.selectedSize === 'half' && item.half ? item.half : item.full) * item.quantity}
                        </p>
                        <button className="remove-item" onClick={() => removeFromCart(item.name)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <h3>Total:</h3>
                    <h3>₹{getCartTotal()}</h3>
                  </div>
                  <a href="tel:9162642282" className="call-delivery-btn">
                    📞 Call for Delivery
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <main className="main-content">
        <section className="hero" id="home">
          <div className="hero-wrapper">
            <div className="hero-content">
              <h1 className="hero-title">Better Food Better Mood, HICHKII...</h1>
              <p className="hero-subtitle">Explore our delicious menu with authentic Indian and Chinese cuisine</p>
              <div className="hero-features">
                <div className="feature-item">
                  <span className="feature-icon">🍽️</span>
                  <span>Fresh Ingredients</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">👨‍🍳</span>
                  <span>Expert Chefs</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <span>Fast Delivery</span>
                </div>
              </div>
              <div className="hero-buttons">
                <a href="#menu" className="hero-cta">Explore Menu</a>
                <a href="tel:9162642282" className="hero-cta hero-cta-secondary">📞 9162642282</a>
              </div>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=600&fit=crop" alt="Delicious Food" />
            </div>
          </div>
        </section>

        <div className="menu-container" id="menu">
          <h2 className="menu-title">Our Menu</h2>
          <p className="menu-subtitle">Savor the flavors made with the finest ingredients and traditional recipes.</p>
          
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                style={{
                  backgroundColor: activeCategory === cat.id ? cat.color : 'transparent',
                  borderColor: cat.color
                }}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="menu-sections">
            {getCategoryItems().map((section, index) => (
              <MenuSection 
                key={index}
                title={section.category} 
                items={section.items} 
                category={section.category.toLowerCase().replace(/\s+/g, '-')}
                onAddToCart={(item) => addToCart(item, section.category)}
              />
            ))}
          </div>
        </div>

        <Reviews />
      </main>

      <footer className="footer">
        <p>&copy; 2025 Hichkii Restaurant. All rights reserved.</p>
        <p>Address: Masjid Chowk, Tana Rd, Magarhatta, Hajipur, Bihar 844101</p>
        <p>Contact: 9162642282</p>
        <p className="made-by-line">
          Made by: 
          <a href="https://www.instagram.com/harsh_7243/" target="_blank" rel="noopener noreferrer" className="instagram-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" className="instagram-icon">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
