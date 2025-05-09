import React, { useEffect, useState } from 'react';
// import MarketData from './MarketData'; 
import {getAllMarketdata} from './../backendservice'
import './Market.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart';

// Import all market images
import tractor1 from '../Pictures/market/tractor1.jpg';
import tractor2 from '../Pictures/market/tractor2.jpg';
import harvester1 from '../Pictures/market/harvester1.jpg';
import harvester2 from '../Pictures/market/harvester2.jpg';
import plough1 from '../Pictures/market/plough1.jpg';
import plough2 from '../Pictures/market/plough2.jpg';
import seeder1 from '../Pictures/market/seeder1.jpg';
import seeder2 from '../Pictures/market/seeder2.jpg';
import sprayer1 from '../Pictures/market/sprayer1.jpg';
import sprayer2 from '../Pictures/market/sprayer2.jpg';
import cultivator1 from '../Pictures/market/cultivator1.jpg';
import cultivator2 from '../Pictures/market/cultivator2.jpg';
import baler1 from '../Pictures/market/baler1.jpg';
import baler2 from '../Pictures/market/baler2.jpg';
import rotavator1 from '../Pictures/market/rotavator1.jpg';
import rotavator2 from '../Pictures/market/rotavator2.jpg';

const imageMap = {
  'tractor': tractor1,
  'harvester': harvester1,
  'plough': plough1,
  'seeder': seeder1,
  'sprayer': sprayer1,
  'cultivator': cultivator1,
  'baler': baler1,
  'rotavator': rotavator1
};

const ITEMS_PER_PAGE = 8;

const Market = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [
    { id: 1, name: 'Tractors' },
    { id: 2, name: 'Harvesters' },
    { id: 3, name: 'Plows' },
    { id: 4, name: 'Seeders' },
    { id: 5, name: 'Sprayers' },
    { id: 6, name: 'Other' }
  ];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleAddQuantity = (itemId) => {
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleRemoveQuantity = (itemId) => {
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
    ));
  };
  
  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const [MarketData, setMarketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMarketdata();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredItems = MarketData
    .filter(item => 
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.year - a.year;
        case 'oldest':
          return a.year - b.year;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="market-container">
      <div className="market-header">
        <button 
          className="filter-toggle-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FontAwesomeIcon icon={faFilter} />
          <span>Filters</span>
        </button>

        <div className="search-bar">
          <input
            className='search-input'
            type="text"
            placeholder="Search Your Item"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>

        <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>

      <div className={`market-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Filters</h3>
          <button 
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="filter-section">
          <h4>Category</h4>
          <div className="category-list">
            <div 
              className={`category-item ${selectedCategory === 'All' ? 'selected' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Categories
            </div>
            {categories.map(category => (
              <div 
                key={category.id}
                className={`category-item ${selectedCategory === category.name ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="category-number">{category.id}</span>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Sort By</h4>
          <select 
            className="sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
        
      {cartOpen && cart.length > 0 && (
        <Cart 
          cartItems={cart} 
          handleAddQuantity={handleAddQuantity} 
          handleRemoveQuantity={handleRemoveQuantity} 
          handleRemoveFromCart={handleRemoveFromCart} 
        />
      )}

      <div className={`market-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="market-item-grid">
          {currentPageItems.map(item => (
            <div key={item._id} className="market-item">
              <div className="market-item-image">
                <img src={imageMap[item.image.toLowerCase()]} alt={item.name} />
                <div className="item-condition">{item.condition}</div>
              </div>
              <div className='item-details'>
                <h3 className='item-name'>{item.name}</h3>
                <p className='item-year'>Year: {item.year}</p>
                <p className='item-location'>Location: {item.location}</p>
                <div className='item-price-section'>
                  <button className='item-price'>₹{item.price.toLocaleString()}</button>
                  <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button 
            className='page-button' 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className='page-button' 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Market;

