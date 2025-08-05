import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axiosInstance from '../utils/axiosInstance';

const FrozenFoodDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchRecentOrders();
    fetchWishlist();
    fetchAddresses();
    fetchPaymentMethods();
    fetchNotifications();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axiosInstance.get('/user/profile');
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/orders/recent');
      setRecentOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const { data } = await axiosInstance.get('/wishlist');
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const { data } = await axiosInstance.get('/addresses');
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const { data } = await axiosInstance.get('/payment-methods');
      setPaymentMethods(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await axiosInstance.get('/notifications');
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>User Profile | Frozen Fresh</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

        {!userData ? (
          <p>Loading profile...</p>
        ) : (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p>{userData.email}</p>
            <p>Member since: {new Date(userData.createdAt).toLocaleDateString()}</p>
          </div>
        )}

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
          <ul className="list-disc list-inside space-y-1">
            {recentOrders.length === 0 ? (
              <p>No recent orders found.</p>
            ) : (
              recentOrders.map((order) => (
                <li key={order.id}>
                  Order ID: {order.id} - Status: {order.status}
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Wishlist</h3>
          <ul className="list-disc list-inside space-y-1">
            {wishlist.length === 0 ? (
              <p>No items in wishlist.</p>
            ) : (
              wishlist.map((item) => (
                <li key={item._id}>{item.name}</li>
              ))
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Saved Addresses</h3>
          <ul className="list-disc list-inside space-y-1">
            {addresses.length === 0 ? (
              <p>No saved addresses.</p>
            ) : (
              addresses.map((address, index) => (
                <li key={index}>
                  {address.street}, {address.city}, {address.zip}
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
          <ul className="list-disc list-inside space-y-1">
            {paymentMethods.length === 0 ? (
              <p>No saved payment methods.</p>
            ) : (
              paymentMethods.map((method, index) => (
                <li key={index}>
                  {method.cardType} ending in {method.last4}
                </li>
              ))
            )}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <ul className="list-disc list-inside space-y-1">
            {notifications.length === 0 ? (
              <p>No new notifications.</p>
            ) : (
              notifications.map((notification, index) => (
                <li key={index}>{notification.message}</li>
              ))
            )}
          </ul>
        </section>
      </div>
    </>
  );
};

export default FrozenFoodDashboard;
