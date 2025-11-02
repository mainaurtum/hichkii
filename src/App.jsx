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
        <p>&copy; 2024 Hichkii Restaurant. All rights reserved.</p>
        <p>FSSAI: 20420111000012 | Contact: 9162642282</p>
      </footer>
    </div>
  )
}

export default App
