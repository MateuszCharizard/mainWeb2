import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FaHeart, FaRetweet, FaComment, FaShare, FaBookmark, FaUser, FaCog, FaSignOutAlt, FaBell, FaPlus, FaEnvelope, FaSearch } from "react-icons/fa";
import { FiImage, FiVideo, FiBarChart, FiEdit, FiTrash } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

// Define defaultUser outside the component
const defaultUser = {
  id: "guest",
  username: "Guest",
  handle: "@guest",
  avatar: "https://via.placeholder.com/50",
  bio: "Exploring XSphere!",
  followers: [],
  following: [],
  isVerified: false,
  joined: new Date().toLocaleDateString(),
  posts: [],
};

// Default initial state for SSR
const initialUsers = { [defaultUser.id]: defaultUser };

export default function XSphere() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [activeTab, setActiveTab] = useState("forYou");
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [viewingProfile, setViewingProfile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  // Load data from localStorage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || initialUsers;
      const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];

      setUsers(storedUsers);
      setPosts(storedPosts.map(post => ({
        ...post,
        user: storedUsers[post.userId] || defaultUser,
        reactions: post.reactions || { likes: [], retweets: [], comments: 0, shares: 0, bookmarks: [] },
        trendingScore: post.trendingScore || 0,
        comments: post.comments || [],
      })));
      setMessages(storedMessages);
      setNotifications(storedNotifications);
    }
  }, []);

  // Save data to localStorage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timeout = setTimeout(() => {
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("posts", JSON.stringify(posts));
        localStorage.setItem("messages", JSON.stringify(messages));
        localStorage.setItem("notifications", JSON.stringify(notifications));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [users, posts, messages, notifications]);

  // Authentication
  const handleLogin = (username, password) => {
    const user = Object.values(users).find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUserId(user.id);
      setIsLoginOpen(false);
      addNotification("Logged in successfully!");
    } else {
      addNotification("Invalid credentials!");
    }
  };

  const handleSignup = (username, handle, password) => {
    const id = Date.now().toString();
    const newUser = { ...defaultUser, id, username, handle: `@${handle}`, password, posts: [] };
    setUsers(prev => ({ ...prev, [id]: newUser }));
    setCurrentUserId(id);
    setIsLoginOpen(false);
    addNotification("Account created!");
  };

  const currentUser = users[currentUserId] || defaultUser;

  // Post handling
  const handlePost = (e, isRetweet = false, originalPost = null) => {
    e.preventDefault();
    if (newPost.trim() || fileInputRef.current?.files[0] || isRetweet) {
      setIsPosting(true);
      setTimeout(() => {
        const post = {
          id: Date.now(),
          userId: currentUserId,
          content: isRetweet ? (newPost || "Retweeted") : newPost,
          reactions: { likes: [], retweets: [], comments: 0, shares: 0, bookmarks: [] },
          timestamp: new Date().toLocaleString(),
          media: fileInputRef.current?.files[0] ? URL.createObjectURL(fileInputRef.current.files[0]) : null,
          trendingScore: 0,
          comments: [],
          retweetOf: isRetweet ? originalPost.id : null,
        };
        setPosts(prev => [post, ...prev]);
        setUsers(prev => ({
          ...prev,
          [currentUserId]: { ...prev[currentUserId], posts: [post.id, ...prev[currentUserId].posts] },
        }));
        setNewPost("");
        fileInputRef.current && (fileInputRef.current.value = null);
        setIsPosting(false);
        addNotification(`${currentUser.username} ${isRetweet ? "retweeted" : "posted"}!`);
      }, 800);
    }
  };

  // Reaction handling
  const handleReaction = (postId, reaction) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        if (reaction === "comments" || reaction === "shares") {
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [reaction]: post.reactions[reaction] + 1,
            },
            trendingScore: post.trendingScore + 1,
          };
        }
        const userList = post.reactions[reaction];
        const hasReacted = userList.includes(currentUserId);
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reaction]: hasReacted
              ? userList.filter(id => id !== currentUserId)
              : [...userList, currentUserId],
          },
          trendingScore: post.trendingScore + (reaction === "likes" ? (hasReacted ? -2 : 2) : (hasReacted ? -1 : 1)),
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    addNotification(`${currentUser.username} ${reaction === "likes" ? "liked" : reaction === "retweets" ? "retweeted" : "reacted to"} a post!`);
  };

  // Comment handling
  const handleComment = (postId, comment) => {
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, { id: Date.now(), text: comment, user: currentUser }],
            reactions: { ...post.reactions, comments: post.reactions.comments + 1 },
          }
        : post
    );
    setPosts(updatedPosts);
    addNotification(`${currentUser.username} commented!`);
  };

  // Delete post
  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    setUsers(prev => ({
      ...prev,
      [currentUserId]: { ...prev[currentUserId], posts: prev[currentUserId].posts.filter(id => id !== postId) },
    }));
    addNotification("Post deleted!");
  };

  // Follow/Unfollow
  const handleFollow = (userId) => {
    const isFollowing = currentUser.following.includes(userId);
    setUsers(prev => ({
      ...prev,
      [currentUserId]: {
        ...prev[currentUserId],
        following: isFollowing
          ? prev[currentUserId].following.filter(id => id !== userId)
          : [...prev[currentUserId].following, userId],
      },
      [userId]: {
        ...prev[userId],
        followers: isFollowing
          ? prev[userId].followers.filter(id => id !== currentUserId)
          : [...prev[userId].followers, currentUserId],
      },
    }));
    addNotification(`${currentUser.username} ${isFollowing ? "unfollowed" : "followed"} ${users[userId].username}!`);
  };

  // Messaging
  const handleSendMessage = (toUserId, content) => {
    const message = {
      id: Date.now(),
      from: currentUserId,
      to: toUserId,
      content,
      timestamp: new Date().toLocaleString(),
    };
    setMessages(prev => [...prev, message]);
    addNotification(`Message sent to ${users[toUserId].username}!`);
  };

  // Filter posts
  const getFilteredPosts = () => {
    let filtered = posts.filter(post =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      users[post.userId]?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.includes(`#${searchQuery.toLowerCase()}`)
    );
    return activeTab === "trending"
      ? filtered.sort((a, b) => b.trendingScore - a.trendingScore)
      : activeTab === "following"
      ? filtered.filter(post => currentUser.following.includes(post.userId) || post.userId === currentUserId)
      : filtered;
  };

  // Notifications
  const addNotification = (message) => {
    setNotifications(prev => [...prev, { id: Date.now(), message, timestamp: new Date().toLocaleTimeString() }].slice(-10));
  };

  // Theme toggle
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150 } } };
  const modalVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } }, exit: { opacity: 0, scale: 0.8 } };

  if (!currentUserId) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} flex items-center justify-center`}>
        <motion.div variants={modalVariants} initial="hidden" animate="visible" className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-8 rounded-3xl shadow-2xl w-full max-w-md`}>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome to XSphere</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(e.target.username.value, e.target.password.value); }} className="space-y-4">
            <input name="username" placeholder="Username" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            <input name="password" type="password" placeholder="Password" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            <motion.button whileHover={{ scale: 1.05 }} type="submit" className="w-full p-3 bg-blue-600 text-white rounded-xl">Login</motion.button>
          </form>
          <form onSubmit={(e) => { e.preventDefault(); handleSignup(e.target.username.value, e.target.handle.value, e.target.password.value); }} className="space-y-4 mt-6">
            <input name="username" placeholder="New Username" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            <input name="handle" placeholder="Handle (without @)" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            <input name="password" type="password" placeholder="Password" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            <motion.button whileHover={{ scale: 1.05 }} type="submit" className="w-full p-3 bg-purple-600 text-white rounded-xl">Sign Up</motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} transition-all duration-500 font-sans antialiased`}>
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 z-50 shadow-md" style={{ scaleX }} />

      {/* Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 150 }} className={`sticky top-0 z-40 ${theme === "dark" ? "bg-gray-900" : "bg-white"} border-b shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">XSphere</h1>
          <div className="flex items-center space-x-6">
            <motion.div whileHover={{ scale: 1.1 }} className="relative cursor-pointer" onClick={() => setActiveTab("notifications")}>
              <FaBell className="text-xl" />
              {notifications.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{notifications.length}</span>}
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="relative cursor-pointer" onClick={() => setIsMessagesOpen(true)}>
              <FaEnvelope className="text-xl" />
              {messages.filter(m => m.to === currentUserId).length > 0 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{messages.filter(m => m.to === currentUserId).length}</span>}
            </motion.div>
            <motion.button whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} p-2 rounded-full shadow-sm`}>
              {theme === "dark" ? "☀️" : "🌙"}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsProfileOpen(true)} className="flex items-center space-x-2">
              <img src={currentUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-blue-500" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex space-x-8">
        {/* Left Sidebar */}
        <motion.aside initial={{ x: -400 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120 }} className="w-80 hidden lg:block sticky top-20 h-[calc(100vh-96px)]">
          <div className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-6 rounded-3xl shadow-xl`}>
            <div className="flex items-center space-x-4 mb-6" onClick={() => setViewingProfile(currentUserId)}>
              <motion.img whileHover={{ scale: 1.1, rotate: 5 }} src={currentUser.avatar} alt="Avatar" className="w-14 h-14 rounded-full border-2 border-blue-500 cursor-pointer" />
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-xl">{currentUser.username}</p>
                  {currentUser.isVerified && <MdVerified className="text-blue-500" />}
                </div>
                <p className="text-gray-500 text-sm">{currentUser.handle}</p>
              </div>
            </div>
            <nav className="space-y-3">
              {["For You", "Following", "Trending", "Notifications"].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ x: 8, backgroundColor: theme === "dark" ? "#4B5563" : "#E5E7EB" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
                  className={`w-full text-left p-3 rounded-xl flex items-center space-x-3 ${activeTab === tab.toLowerCase().replace(" ", "") ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" : ""}`}
                >
                  <FaPlus /> <span>{tab}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl">
          {activeTab !== "notifications" && !viewingProfile && (
            <>
              {/* New Post */}
              <motion.div variants={itemVariants} className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-6 rounded-3xl shadow-xl mb-8`}>
                <form onSubmit={handlePost} className="flex space-x-4">
                  <img src={currentUser.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder={`What's on your mind, ${currentUser.username}?`}
                      className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm`}
                      rows="3"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-4 text-blue-500">
                        <motion.label whileHover={{ scale: 1.2 }} className="cursor-pointer">
                          <FiImage />
                          <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" />
                        </motion.label>
                        <motion.button whileHover={{ scale: 1.2 }}><FiVideo /></motion.button>
                        <motion.button whileHover={{ scale: 1.2 }}><FiBarChart /></motion.button>
                      </div>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={isPosting} className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-md">
                        {isPosting ? <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⏳</motion.span> : "Post"}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </motion.div>

              {/* Search Bar */}
              <motion.div variants={itemVariants} className="mb-8 relative">
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts, users, or #hashtags..."
                  className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} w-full pl-12 p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </motion.div>
            </>
          )}

          {/* Profile Page */}
          {viewingProfile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-6 rounded-3xl shadow-xl mb-8`}>
              <div className="flex items-center space-x-4 mb-6">
                <img src={users[viewingProfile].avatar} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-blue-500" />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-2xl">{users[viewingProfile].username}</p>
                    {users[viewingProfile].isVerified && <MdVerified className="text-blue-500" />}
                  </div>
                  <p className="text-gray-500">{users[viewingProfile].handle}</p>
                  <p className="text-gray-400 mt-2">{users[viewingProfile].bio}</p>
                  <div className="flex space-x-6 mt-2 text-sm text-gray-500">
                    <p>Followers: <span className="font-semibold">{users[viewingProfile].followers.length}</span></p>
                    <p>Following: <span className="font-semibold">{users[viewingProfile].following.length}</span></p>
                    <p>Joined: <span className="font-semibold">{users[viewingProfile].joined}</span></p>
                  </div>
                  {viewingProfile !== currentUserId && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleFollow(viewingProfile)}
                      className={`mt-4 px-6 py-2 ${currentUser.following.includes(viewingProfile) ? "bg-gray-600" : "bg-blue-600"} text-white rounded-full`}
                    >
                      {currentUser.following.includes(viewingProfile) ? "Unfollow" : "Follow"}
                    </motion.button>
                  )}
                </div>
              </div>
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {posts.filter(post => post.userId === viewingProfile).map(post => (
                  <Post key={post.id} post={post} currentUserId={currentUserId} handleReaction={handleReaction} handleComment={handleComment} handleDeletePost={handleDeletePost} handlePost={handlePost} users={users} setViewingProfile={setViewingProfile} />
                ))}
              </motion.div>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setViewingProfile(null)} className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-full">Back to Feed</motion.button>
            </motion.div>
          )}

          {/* Posts Feed or Notifications */}
          {!viewingProfile && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {activeTab === "notifications" ? (
                notifications.length === 0 ? (
                  <p className="text-gray-500 text-center">No new notifications</p>
                ) : (
                  notifications.map(notif => (
                    <motion.div key={notif.id} variants={itemVariants} className="p-4 bg-gray-800 rounded-xl mb-4">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-gray-500">{notif.timestamp}</p>
                    </motion.div>
                  ))
                )
              ) : (
                <AnimatePresence>
                  {getFilteredPosts().map(post => (
                    <Post key={post.id} post={post} currentUserId={currentUserId} handleReaction={handleReaction} handleComment={handleComment} handleDeletePost={handleDeletePost} handlePost={handlePost} users={users} setViewingProfile={setViewingProfile} />
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </main>

        {/* Right Sidebar */}
        <motion.aside initial={{ x: 400 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120 }} className="w-96 hidden xl:block sticky top-20 h-[calc(100vh-96px)]">
          <div className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-6 rounded-3xl shadow-xl mb-6`}>
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trends</h2>
            {["#XSphere", "#ReactJS", "#AI", "#WebDev"].map((trend, i) => (
              <motion.div
                key={trend}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: theme === "dark" ? "#4B5563" : "#E5E7EB", scale: 1.02 }}
                className="p-3 rounded-xl cursor-pointer"
                onClick={() => setSearchQuery(trend.slice(1))}
              >
                <p className="font-semibold">{trend}</p>
                <p className="text-sm text-gray-500">{Math.floor(Math.random() * 100)}K posts</p>
              </motion.div>
            ))}
          </div>
          <div className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-6 rounded-3xl shadow-xl`}>
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Who to Follow</h2>
            {Object.values(users).filter(u => u.id !== currentUserId && !currentUser.following.includes(u.id)).slice(0, 3).map(user => (
              <motion.div 
                key={user.id} 
                whileHover={{ backgroundColor: theme === "dark" ? "#4B5563" : "#E5E7EB" }} 
                className="p-3 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" onClick={() => setViewingProfile(user.id)} />
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.handle}</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  onClick={() => handleFollow(user.id)} 
                  className="px-4 py-1 bg-blue-600 text-white rounded-full"
                >
                  Follow
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <motion.div variants={modalVariants} className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-8 rounded-3xl shadow-2xl w-full max-w-lg`}>
              <div className="flex items-center space-x-4 mb-6">
                <img src={currentUser.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-blue-500" />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-2xl">{currentUser.username}</p>
                    {currentUser.isVerified && <MdVerified className="text-blue-500" />}
                  </div>
                  <p className="text-gray-500">{currentUser.handle}</p>
                  <p className="text-gray-400 mt-2">{currentUser.bio}</p>
                  <div className="flex space-x-6 mt-2 text-sm text-gray-500">
                    <p>Followers: <span className="font-semibold">{currentUser.followers.length}</span></p>
                    <p>Following: <span className="font-semibold">{currentUser.following.length}</span></p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => { setIsProfileOpen(false); setViewingProfile(currentUserId); }} className="w-full p-3 bg-blue-600 text-white rounded-xl">View Profile</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setCurrentUserId(null)} className="w-full p-3 bg-red-600 text-white rounded-xl">Log Out</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setIsProfileOpen(false)} className="w-full p-3 bg-gray-600 text-white rounded-xl">Close</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Modal */}
      <AnimatePresence>
        {isMessagesOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <motion.div variants={modalVariants} className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-8 rounded-3xl shadow-2xl w-full max-w-lg`}>
              <h2 className="text-2xl font-bold mb-4">Messages</h2>
              <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
                {messages.filter(m => m.from === currentUserId || m.to === currentUserId).map(msg => (
                  <div key={msg.id} className={`p-3 rounded-xl ${msg.from === currentUserId ? "bg-blue-600 text-white" : "bg-gray-800"}`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-gray-400">{msg.timestamp} - To: {users[msg.to].username}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(e.target.to.value, e.target.content.value); e.target.reset(); }} className="space-y-4">
                <select name="to" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                  {Object.values(users).filter(u => u.id !== currentUserId).map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
                </select>
                <input name="content" placeholder="Type a message..." className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                <motion.button whileHover={{ scale: 1.05 }} type="submit" className="w-full p-3 bg-blue-600 text-white rounded-xl">Send</motion.button>
              </form>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setIsMessagesOpen(false)} className="w-full p-3 bg-gray-600 text-white rounded-xl mt-4">Close</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button whileHover={{ scale: 1.15, rotate: 360 }} whileTap={{ scale: 0.95 }} className="fixed bottom-8 right-8 p-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl text-white" onClick={() => textareaRef.current?.focus()}>
        <FaPlus className="text-xl" />
      </motion.button>
    </div>
  );
}

function Post({ post, currentUserId, handleReaction, handleComment, handleDeletePost, handlePost, users, setViewingProfile }) {
  const [comment, setComment] = useState("");
  const [isRetweeting, setIsRetweeting] = useState(false);
  const theme = typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark";

  const itemVariants = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150 } } };

  return (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }} className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-6 rounded-3xl mb-6 shadow-lg`}>
      <div className="flex space-x-4">
        <img src={users[post.userId]?.avatar || defaultUser.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-gray-700 cursor-pointer" onClick={() => setViewingProfile(post.userId)} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg cursor-pointer" onClick={() => setViewingProfile(post.userId)}>{users[post.userId]?.username || "Unknown"}</span>
              {users[post.userId]?.isVerified && <MdVerified className="text-blue-500" />}
              <span className="text-gray-500 text-sm">{users[post.userId]?.handle || "@unknown"}</span>
            </div>
            <div className="flex space-x-2">
              {post.userId === currentUserId && (
                <motion.button whileHover={{ scale: 1.2 }} onClick={() => handleDeletePost(post.id)} className="text-red-500"><FiTrash /></motion.button>
              )}
              <span className="text-sm text-gray-500">{post.timestamp}</span>
            </div>
          </div>
          {post.retweetOf && <p className="text-gray-500 text-sm mb-2">Retweeted from {users[posts.find(p => p.id === post.retweetOf)?.userId]?.username}</p>}
          <p className="mt-2 text-gray-200 leading-relaxed">{post.content}</p>
          {post.media && <motion.img initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} src={post.media} alt="Post media" className="mt-4 rounded-xl max-w-full h-auto" />}
          <div className="flex justify-between mt-4 text-gray-500">
            {[
              { icon: FaHeart, key: "likes", color: "text-red-500" },
              { icon: FaRetweet, key: "retweets", color: "text-green-500", action: () => setIsRetweeting(true) },
              { icon: FaComment, key: "comments", color: "text-blue-500" },
              { icon: FaShare, key: "shares", color: "text-purple-500" },
              { icon: FaBookmark, key: "bookmarks", color: "text-yellow-500" },
            ].map(({ icon: Icon, key, color, action }) => {
              const isArray = Array.isArray(post.reactions[key]);
              const isActive = isArray && post.reactions[key].includes(currentUserId);
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.3, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={action || (() => handleReaction(post.id, key))}
                  className={`flex items-center space-x-2 hover:${color} transition-all ${isActive ? color : ""}`}
                >
                  <Icon />
                  <span>{isArray ? post.reactions[key].length : post.reactions[key]}</span>
                </motion.button>
              );
            })}
          </div>
          {isRetweeting && (
            <form onSubmit={(e) => { handlePost(e, true, post); setIsRetweeting(false); }} className="mt-4 flex space-x-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment to retweet..."
                className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <motion.button whileHover={{ scale: 1.05 }} type="submit" className="px-4 py-2 bg-green-600 text-white rounded-xl">Retweet</motion.button>
            </form>
          )}
          {post.comments.length > 0 && (
            <div className="mt-4">
              {post.comments.map(c => (
                <div key={c.id} className="flex space-x-2 mt-2">
                  <img src={c.user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-semibold">{c.user.username}</p>
                    <p className="text-gray-400 text-sm">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); handleComment(post.id, e.target.comment.value); e.target.reset(); }} className="mt-4 flex space-x-2">
            <input name="comment" placeholder="Add a comment..." className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} w-full p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`} />
            <motion.button whileHover={{ scale: 1.05 }} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl">Reply</motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}