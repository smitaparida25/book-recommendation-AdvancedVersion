import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('wishlist');
  const [wishlist, setWishlist] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', priority: 'High' },
    { id: 2, title: '1984', author: 'George Orwell', priority: 'Medium' },
  ]);
  const [groups, setGroups] = useState([
    { id: 1, name: 'Mystery Lovers', members: 45, lastActivity: '2 hours ago' },
    { id: 2, name: 'Sci-Fi Enthusiasts', members: 78, lastActivity: '1 day ago' },
  ]);
  const [newBook, setNewBook] = useState({ title: '', author: '', priority: 'Medium' });
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });

  // Sample reading data
  const readingStats = {
    booksRead: 24,
    pagesRead: 6840,
    averagePages: 285,
    readingStreak: 7,
    favoriteGenre: 'Fiction',
    monthlyGoal: 4,
    monthlyProgress: 3
  };

  const badges = [
    { id: 1, name: 'Book Worm', description: 'Read 10 books', earned: true, icon: '📚' },
    { id: 2, name: 'Speed Reader', description: 'Read 1000 pages in a week', earned: true, icon: '⚡' },
    { id: 3, name: 'Social Reader', description: 'Join 5 reading groups', earned: false, icon: '👥' },
    { id: 4, name: 'Consistent Reader', description: 'Read for 30 days straight', earned: false, icon: '🔥' },
    { id: 5, name: 'Genre Explorer', description: 'Read books from 10 different genres', earned: true, icon: '🌟' },
    { id: 6, name: 'Review Master', description: 'Write 50 book reviews', earned: false, icon: '✍️' },
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    sidebar: {
      width: '280px',
      backgroundColor: 'white',
      boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      position: 'relative'
    },
    sidebarHeader: {
      padding: '24px',
      borderBottom: '1px solid #e5e5e5'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: 0
    },
    subtitle: {
      fontSize: '14px',
      color: '#666',
      margin: '4px 0 0 0'
    },
    nav: {
      marginTop: '24px'
    },
    navButton: {
      width: '100%',
      textAlign: 'left',
      padding: '12px 24px',
      border: 'none',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.2s'
    },
    navButtonActive: {
      backgroundColor: '#e3f2fd',
      borderRight: '4px solid #2196f3',
      color: '#1976d2'
    },
    navButtonHover: {
      backgroundColor: '#f5f5f5'
    },
    goalCard: {
      position: 'absolute',
      bottom: '24px',
      left: '24px',
      right: '24px',
      background: 'linear-gradient(135deg, #2196f3, #9c27b0)',
      color: 'white',
      padding: '16px',
      borderRadius: '8px'
    },
    goalTitle: {
      fontWeight: 'bold',
      margin: '0 0 4px 0'
    },
    goalSubtitle: {
      fontSize: '14px',
      opacity: 0.9,
      margin: 0
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: '4px',
      marginTop: '8px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: 'white',
      width: '75%',
      borderRadius: '4px'
    },
    mainContent: {
      flex: 1,
      padding: '32px',
      paddingBottom: '100px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '24px'
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0 0 16px 0'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '16px'
    },
    input: {
      padding: '12px 16px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      outline: 'none'
    },
    button: {
      padding: '12px 24px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.2s'
    },
    buttonPrimary: {
      backgroundColor: '#2196f3',
      color: 'white'
    },
    buttonSuccess: {
      backgroundColor: '#4caf50',
      color: 'white'
    },
    buttonDanger: {
      backgroundColor: 'transparent',
      color: '#f44336',
      border: '1px solid #f44336'
    },
    grid: {
      display: 'grid',
      gap: '16px'
    },
    gridCols2: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    },
    gridCols3: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    },
    gridCols4: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
    },
    bookItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f9f9f9',
      borderRadius: '6px',
      marginBottom: '12px'
    },
    bookInfo: {
      flex: 1
    },
    bookTitle: {
      fontWeight: 'bold',
      color: '#333',
      margin: '0 0 4px 0'
    },
    bookAuthor: {
      color: '#666',
      margin: '0 0 8px 0'
    },
    priorityBadge: {
      display: 'inline-block',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: 'bold',
      borderRadius: '12px'
    },
    priorityHigh: {
      backgroundColor: '#ffebee',
      color: '#c62828'
    },
    priorityMedium: {
      backgroundColor: '#fff3e0',
      color: '#ef6c00'
    },
    priorityLow: {
      backgroundColor: '#e8f5e8',
      color: '#2e7d32'
    },
    statCard: {
      textAlign: 'center',
      padding: '24px',
      borderRadius: '8px'
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '0 0 8px 0'
    },
    statLabel: {
      color: '#666',
      margin: 0
    },
    badgeCard: {
      padding: '16px',
      borderRadius: '8px',
      border: '2px solid',
      textAlign: 'center',
      transition: 'all 0.2s'
    },
    badgeEarned: {
      borderColor: '#ffc107',
      backgroundColor: '#fff8e1',
      boxShadow: '0 4px 12px rgba(255,193,7,0.3)'
    },
    badgeNotEarned: {
      borderColor: '#e0e0e0',
      backgroundColor: '#f5f5f5',
      opacity: 0.6
    },
    badgeIcon: {
      fontSize: '48px',
      marginBottom: '8px'
    },
    badgeName: {
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    badgeDescription: {
      fontSize: '14px',
      marginBottom: '12px'
    },
    earnedBadge: {
      backgroundColor: '#ffc107',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    }
  };

  const addToWishlist = () => {
    if (newBook.title && newBook.author) {
      setWishlist([...wishlist, {
        id: Date.now(),
        ...newBook
      }]);
      setNewBook({ title: '', author: '', priority: 'Medium' });
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(book => book.id !== id));
  };

  const createGroup = () => {
    if (newGroup.name) {
      setGroups([...groups, {
        id: Date.now(),
        name: newGroup.name,
        members: 1,
        lastActivity: 'Just now'
      }]);
      setNewGroup({ name: '', description: '' });
    }
  };

  const sidebarItems = [
    { id: 'wishlist', name: 'Wishlist', icon: '❤️' },
    { id: 'groups', name: 'Groups', icon: '👥' },
    { id: 'analytics', name: 'Reading Analytics', icon: '📊' },
    { id: 'badges', name: 'Badges', icon: '🏆' },
  ];

  const renderWishlist = () => (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Add to Wishlist</h2>
        <div style={styles.formGrid}>
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({...newBook, author: e.target.value})}
            style={styles.input}
          />
          <select
            value={newBook.priority}
            onChange={(e) => setNewBook({...newBook, priority: e.target.value})}
            style={styles.input}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>
        <button
          onClick={addToWishlist}
          style={{...styles.button, ...styles.buttonPrimary}}
        >
          Add to Wishlist
        </button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>My Wishlist ({wishlist.length} books)</h3>
        <div>
          {wishlist.map(book => (
            <div key={book.id} style={styles.bookItem}>
              <div style={styles.bookInfo}>
                <h4 style={styles.bookTitle}>{book.title}</h4>
                <p style={styles.bookAuthor}>by {book.author}</p>
                <span style={{
                  ...styles.priorityBadge,
                  ...(book.priority === 'High' ? styles.priorityHigh :
                      book.priority === 'Medium' ? styles.priorityMedium :
                      styles.priorityLow)
                }}>
                  {book.priority} Priority
                </span>
              </div>
              <button
                onClick={() => removeFromWishlist(book.id)}
                style={{...styles.button, ...styles.buttonDanger}}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGroups = () => (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Create New Group</h2>
        <div style={{...styles.grid, marginBottom: '16px'}}>
          <input
            type="text"
            placeholder="Group Name"
            value={newGroup.name}
            onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
            style={styles.input}
          />
          <textarea
            placeholder="Group Description"
            value={newGroup.description}
            onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
            rows="3"
            style={styles.input}
          />
        </div>
        <button
          onClick={createGroup}
          style={{...styles.button, ...styles.buttonSuccess}}
        >
          Create Group
        </button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>My Groups</h3>
        <div style={{...styles.grid, ...styles.gridCols2}}>
          {groups.map(group => (
            <div key={group.id} style={{
              padding: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#fafafa'
            }}>
              <h4 style={{fontWeight: 'bold', marginBottom: '8px'}}>{group.name}</h4>
              <div style={{fontSize: '14px', color: '#666'}}>
                <p>👥 {group.members} members</p>
                <p>🕒 Last activity: {group.lastActivity}</p>
              </div>
              <button style={{
                marginTop: '12px',
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                View Group
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Reading Analytics</h2>
        
        <div style={{...styles.grid, ...styles.gridCols4, marginBottom: '32px'}}>
          <div style={{...styles.statCard, backgroundColor: '#e3f2fd'}}>
            <div style={{...styles.statNumber, color: '#1976d2'}}>{readingStats.booksRead}</div>
            <div style={styles.statLabel}>Books Read</div>
          </div>
          <div style={{...styles.statCard, backgroundColor: '#e8f5e8'}}>
            <div style={{...styles.statNumber, color: '#2e7d32'}}>{readingStats.pagesRead.toLocaleString()}</div>
            <div style={styles.statLabel}>Pages Read</div>
          </div>
          <div style={{...styles.statCard, backgroundColor: '#f3e5f5'}}>
            <div style={{...styles.statNumber, color: '#7b1fa2'}}>{readingStats.averagePages}</div>
            <div style={styles.statLabel}>Avg Pages/Book</div>
          </div>
          <div style={{...styles.statCard, backgroundColor: '#fff3e0'}}>
            <div style={{...styles.statNumber, color: '#ef6c00'}}>{readingStats.readingStreak}</div>
            <div style={styles.statLabel}>Day Streak</div>
          </div>
        </div>

        <div style={{...styles.grid, ...styles.gridCols2}}>
          <div style={{backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '8px'}}>
            <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '16px'}}>Monthly Goal Progress</h3>
            <div style={{marginBottom: '8px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666'}}>
                <span>{readingStats.monthlyProgress} of {readingStats.monthlyGoal} books</span>
                <span>{Math.round((readingStats.monthlyProgress / readingStats.monthlyGoal) * 100)}%</span>
              </div>
              <div style={{...styles.progressBar, backgroundColor: '#e0e0e0', marginTop: '8px'}}>
                <div style={{
                  ...styles.progressFill,
                  backgroundColor: '#2196f3',
                  width: `${(readingStats.monthlyProgress / readingStats.monthlyGoal) * 100}%`
                }}></div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '8px'}}>
            <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '16px'}}>Reading Insights</h3>
            <div style={{fontSize: '14px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
                <span style={{color: '#666'}}>Favorite Genre:</span>
                <span style={{fontWeight: 'bold'}}>{readingStats.favoriteGenre}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
                <span style={{color: '#666'}}>Reading Speed:</span>
                <span style={{fontWeight: 'bold'}}>45 pages/day</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#666'}}>Most Active Day:</span>
                <span style={{fontWeight: 'bold'}}>Sunday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBadges = () => (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>My Badges</h2>
        
        <div style={{marginBottom: '24px', fontSize: '14px', color: '#666'}}>
          <span style={{marginRight: '16px'}}>🏆 {badges.filter(b => b.earned).length} earned</span>
          <span>⏳ {badges.filter(b => !b.earned).length} in progress</span>
        </div>

        <div style={{...styles.grid, ...styles.gridCols3}}>
          {badges.map(badge => (
            <div 
              key={badge.id} 
              style={{
                ...styles.badgeCard,
                ...(badge.earned ? styles.badgeEarned : styles.badgeNotEarned)
              }}
            >
              <div style={styles.badgeIcon}>{badge.icon}</div>
              <h3 style={{
                ...styles.badgeName,
                color: badge.earned ? '#f57c00' : '#666'
              }}>
                {badge.name}
              </h3>
              <p style={{
                ...styles.badgeDescription,
                color: badge.earned ? '#f57c00' : '#999'
              }}>
                {badge.description}
              </p>
              {badge.earned && (
                <div>
                  <span style={styles.earnedBadge}>
                    ✓ Earned
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'wishlist':
        return renderWishlist();
      case 'groups':
        return renderGroups();
      case 'analytics':
        return renderAnalytics();
      case 'badges':
        return renderBadges();
      default:
        return renderWishlist();
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.title}>📖 BookHub</h1>
          <p style={styles.subtitle}>Welcome back, Reader!</p>
        </div>
        
        <nav style={styles.nav}>
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.navButton,
                ...(activeTab === item.id ? styles.navButtonActive : {})
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.backgroundColor = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{fontSize: '20px'}}>{item.icon}</span>
              <span style={{fontWeight: '500'}}>{item.name}</span>
            </button>
          ))}
        </nav>

        <div style={styles.goalCard}>
          <h3 style={styles.goalTitle}>Reading Goal</h3>
          <p style={styles.goalSubtitle}>3 of 4 books this month</p>
          <div style={styles.progressBar}>
            <div style={styles.progressFill}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;