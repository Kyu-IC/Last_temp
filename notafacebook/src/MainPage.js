import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

function MainPage() {
  // State for dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // State to manage posts (array of posts)
  const [posts, setPosts] = useState([
    { id: 1, username: 'username', content: 'bla bla bla', likes: [] }, // Initial posts with empty likes array
  ]);

  // State to manage new post content
  const [newPost, setNewPost] = useState('');

  // Function to handle dropdown toggle
  const handleMenuClick = () => {
    setDropdownVisible(prevState => !prevState);
  };

  // Function to handle creating a new post
  const handleCreatePost = (e) => {
    e.preventDefault(); // Prevent page reload

    if (newPost.trim()) { // Ensure the input is not empty
      const newPostObj = {
        id: Date.now(), // Unique ID based on current time
        username: 'username', // Replace with actual username if using authentication
        content: newPost,
        likes: [], // Initialize likes as an empty array
      };
      setPosts(prevPosts => [newPostObj, ...prevPosts]); // Add new post to the top of the array
      setNewPost(''); // Clear the input field
    }
  };

  // Function to handle liking or unliking a post
  const handleLike = (postId, username) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(username)
                ? post.likes.filter(user => user !== username) // Unlike if the user has already liked
                : [...post.likes, username], // Like if the user hasn't liked yet
            }
          : post
      )
    );
  };

  return (
    <div className="main-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <div className="branding-section">
            <div className="logo">
              <span className="highlight">N</span>otA<span>Facebook</span>
            </div>
          </div>
        </div>
        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="#999" viewBox="0 0 24 24">
                <path d="M10 2a8 8 0 105.29 14.71l4.29 4.3 1.41-1.42-4.3-4.29A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
              </svg>
            </span>
            <input type="text" className="search-bar" placeholder="Search..." />
          </div>
        </div>
        {/* Menu Icon */}
        <div className="menu-icon" onClick={handleMenuClick}>
          ☰
          {dropdownVisible && (
            <div className="dropdown-menu">
              <ul>
                <li className="profile-item">
                  <img src="path_to_user_image.jpg" alt="User Profile" className="profile-img" />
                  <span className="profile-name">Username</span>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
                <li>
                  <button onClick={() => { /* handle logout logic here */ }}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Section */}
      <main className="main">
        <aside className="sidebar">
          <div className="profile">
            <div className="profile-pic"></div>
            <p className="username">username</p>
          </div>
          <nav className="navigation">
            <ul>
              <li>Friends</li>
              <li>Memories</li>
              <li>Group</li>
              <li>Events</li>
            </ul>
          </nav>
          <div className="shortcut-space">Shortcut Space</div>
        </aside>

        <section className="content">
          {/* Create Post Form */}
          <div className="create-post-container">
            <form onSubmit={handleCreatePost} className="create-post-form">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="create-post-input"
              />
              <button type="submit" className="post-button">Post</button>
            </form>
          </div>

          {/* Posts Feed */}
          <div className="feed">
            {posts.map((post) => (
              <div className="post-container" key={post.id}>
                <div className="post">
                  <div className="profile-pic"></div>
                  <p className="username">{post.username}</p>
                  <p>{post.content}</p>
                  <div className="actions">
                    <button 
                      onClick={() => handleLike(post.id, 'currentUsername')}
                      className={post.likes.includes('currentUsername') ? 'liked' : ''}>
                      {post.likes.includes('currentUsername') ? 'Unlike' : 'Like'} 
                      ({post.likes.length})
                    </button>
                    <button>Comment</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="friends-space">
          <p>Friends Space</p>
        </aside>
      </main>
    </div>
  );
}

export default MainPage;
