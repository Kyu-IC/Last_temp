import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postHeader, setPostHeader] = useState('');
  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate();

  // Get the username from localStorage
  const username = localStorage.getItem('username');

  // Check if the user is authenticated when the page loads
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');  // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Open the modal popup
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal popup
  const closeModal = () => {
    setIsModalOpen(false);
    setPostHeader(''); // Reset header
    setPostContent(''); // Reset post content
  };

  // Handle the input change for header
  const handleHeaderChange = (e) => {
    setPostHeader(e.target.value);
  };

  // Handle the input change for post content
  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  // Handle post submission
  const handleSubmitPost = () => {
    if (postHeader.trim() && postContent.trim()) {
      console.log('Post Submitted:', { header: postHeader, content: postContent });
      closeModal(); // Close the modal after submission
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">NotAFacebook</a>
        </div>
        <div className="navbar-right">
          <ul className="navbar-links">
            <li><a href="#" onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </nav>

      {/* Display username under the navbar */}
      {username && (
        <div className="username-display">
          <span>Welcome, {username}!</span>
        </div>
      )}

      {/* Outer container with clickable placeholder for creating posts */}
      <div className="post-container" onClick={openModal}>
        <div className="post-container-wrapper">
          <input
            type="text"
            className="post-textbox"
            placeholder="What's on your mind?"
            readOnly
          />
          <div className="horizontal-line"></div>
          <div className="mamamiya-text">Post</div>
        </div>
      </div>

      {/* Modal Popup for writing a post */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeModal}>✕</button>
            <div className="modal-header">
              <h2>Create Post</h2>
              <hr />
            </div>
            <input
              type="text"
              className="post-header"
              placeholder="Write a header here!"
              value={postHeader}
              onChange={handleHeaderChange}
            />
            <textarea
              className="post-textarea"
              placeholder="Write your post..."
              value={postContent}
              onChange={handleContentChange}
            />
            <div className="modal-buttons">
              <button 
                onClick={handleSubmitPost} 
                className={`post-submit-button ${postHeader.trim() && postContent.trim() ? 'active' : ''}`} 
                disabled={!(postHeader.trim() && postContent.trim())}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
