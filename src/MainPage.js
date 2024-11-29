import React, { useState, useEffect } from 'react';
import './main.css';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postHeader, setPostHeader] = useState('');
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const username = localStorage.getItem('username');

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which post's dropdown is open

  // Load posts from localStorage on initial load
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }, [posts]);

  // Open/close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setPostHeader('');
    setPostContent('');
    setEditingPost(null);
  };

  // Handle input changes
  const handleHeaderChange = (e) => setPostHeader(e.target.value);
  const handleContentChange = (e) => setPostContent(e.target.value);

  // Submit a new post
  const handleSubmitPost = () => {
    if (postHeader.trim() && postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        header: postHeader,
        content: postContent,
        author: username || 'Anonymous',
        likes: 0,
        likedBy: [],
        isPublic: true,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      closeModal();
    }
  };

  // Handle "Enter" key to submit the post
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && postHeader.trim() && postContent.trim()) {
      handleSubmitPost();
    }
  };

  // Edit existing post
  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostHeader(post.header);
    setPostContent(post.content);
    openModal();
  };

  // Update post content after editing
  const handleUpdatePost = () => {
    if (postHeader.trim() && postContent.trim()) {
      const updatedPosts = posts.map(post =>
        post.id === editingPost.id
          ? { ...post, header: postHeader, content: postContent, isPublic: true }
          : post
      );
      setPosts(updatedPosts);
      closeModal();
    }
  };

  // Handle delete post
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Handle like/unlike toggle
  const handleLikeToggle = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const likedIndex = post.likedBy.indexOf(username);
        if (likedIndex !== -1) {
          post.likedBy.splice(likedIndex, 1);
          post.likes -= 1;
        } else {
          post.likedBy.push(username);
          post.likes += 1;
        }
      }
      return post;
    });
    setPosts([...updatedPosts]);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  // Toggle dropdown menu
  const toggleDropdown = (postId) => {
    setDropdownOpen(dropdownOpen === postId ? null : postId); // Toggle dropdown for the selected post
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">NotAFacebook</a>
        </div>
        <div className="navbar-search">
          <input type="text" className="search-bar" placeholder="WIP" />
        </div>
        <div className="navbar-right">
          <ul className="navbar-links">
            {isAuthenticated ? (
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            ) : (
              <li><a href="/login">Login</a></li>
            )}
          </ul>
        </div>
      </nav>

      {isAuthenticated && username && (
        <div className="username-display">
          <span>Welcome, {username}!</span>
        </div>
      )}

      {/* Post creation section */}
      {isAuthenticated ? (
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
      ) : (
        <div className="logged-out-message">
          <h2>Please log in to view posts or create content.</h2>
        </div>
      )}

      {/* Modal Popup for creating posts */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeModal}>✕</button>
            <div className="modal-header">
              <h2>{editingPost ? 'Edit Post' : 'Create Post'}</h2>
              <hr />
            </div>
            <input
              type="text"
              className="post-header"
              placeholder="Write a header here!"
              value={postHeader}
              onChange={handleHeaderChange}
              onKeyDown={handleKeyDown}
            />
            <textarea
              className="post-textarea"
              placeholder="Write your post..."
              value={postContent}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
            />
            <div className="modal-buttons">
              <button
                onClick={editingPost ? handleUpdatePost : handleSubmitPost}
                className={`post-submit-button ${postHeader.trim() && postContent.trim() ? 'active' : ''}`}
                disabled={!(postHeader.trim() && postContent.trim())}
              >
                {editingPost ? 'Update Post' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Posts */}
      <div className="posts-section">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <p className="post-card-author">{post.author}</p>
            <h3 className="post-card-header">{post.header}</h3>
            <p className="post-card-content">{post.content}</p>
            <div className="post-card-actions">
              <button
                className={`like-button ${post.likedBy.includes(username) ? 'liked' : ''}`}
                onClick={() => handleLikeToggle(post.id)}
              >
                {post.likedBy.includes(username) ? 'Unlike' : 'Like'} ({post.likes})
              </button>

              {/* Edit and Delete dropdown outside of modal */}
              {post.author === username && (
                <div className="post-actions">
                  <button className="dropdown-toggle" onClick={() => toggleDropdown(post.id)}>
                    ⋮
                  </button>
                  {dropdownOpen === post.id && (
                    <div className="dropdown-menu">
                      <button className="edit-button" onClick={() => handleEditPost(post)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
