import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // You'll need to create this file

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [myAuctions, setMyAuctions] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
          throw new Error('User not logged in');
        }
        
        setUser(userData);
        
        // Fetch auctions (we'll filter for user's own auctions)
        const auctionsResponse = await axios.get('http://localhost:5001/auctions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filter for auctions created by this user
        const userAuctions = auctionsResponse.data.filter(
          auction => auction.seller._id === userData._id
        );
        setMyAuctions(userAuctions);
        
        // For bids, you would need a backend endpoint that returns auctions a user has bid on
        // This is a placeholder - you'll need to implement the endpoint
        // const bidsResponse = await axios.get('http://localhost:5001/auctions/mybids', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // setMyBids(bidsResponse.data);
        
        // For now, let's just set an empty array
        setMyBids([]);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-container">
      <section className="dashboard-welcome">
        <h1>Welcome, {user.username}!</h1>
        <p>Here's an overview of your auction activity</p>
      </section>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>My Auctions</h3>
          <p className="stat-number">{myAuctions.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Bids</h3>
          <p className="stat-number">{myBids.length}</p>
        </div>
        {/* Add more stat cards as needed */}
      </div>
      
      <section className="dashboard-my-auctions">
        <h2>My Auctions</h2>
        {myAuctions.length === 0 ? (
          <p className="empty-state">You haven't created any auctions yet.</p>
        ) : (
          <ul className="auctions-list">
            {myAuctions.map(auction => (
              <li key={auction._id} className="auction-item">
                <h3>{auction.itemName}</h3>
                <p className="auction-desc">{auction.description}</p>
                <div className="auction-bid-info">
                  <p>Starting bid: ${auction.startingBid}</p>
                  <p>Current bid: ${auction.currentBid || auction.startingBid}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      
      <section className="dashboard-my-bids">
        <h2>My Bids</h2>
        {myBids.length === 0 ? (
          <p className="empty-state">You haven't placed any bids yet.</p>
        ) : (
          <ul className="bids-list">
            {myBids.map(bid => (
              <li key={bid._id} className="bid-item">
                <h3>{bid.auction.itemName}</h3>
                <p>Your bid: ${bid.amount}</p>
                <p className="bid-status">
                  Status: {bid.isHighestBid ? 'Highest Bid' : 'Outbid'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
