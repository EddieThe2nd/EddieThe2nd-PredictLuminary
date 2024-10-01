import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Subscriptions/subscription.css';

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [subscription, setSubscription] = useState(null); // Add useState for subscription
  const navigate = useNavigate();

  const publicKey = "pk_test_a193ab544d60f7b9ff589742b7cac1ab75961a37";
  const entityNumber = localStorage.getItem('entityNumber');

  const subscriptionPlans = [
    {
      id: 2,
      name: '1-Month Basic Plan',
      description: 'Get 1 month of Basic Support for only R299.99. Ideal for short-term needs.',
      price: 299.99,
      duration: '1 Month',
      planID: 'basic_sub',
      planName: 'Basic Support',
      days: 30
    },
    {
      id: 3,
      name: '3-Month Standard Plan',
      description: 'Enjoy 3 months of Standard Support for just R599.99. A great value for medium-term support.',
      price: 599.99,
      duration: '3 Months',
      planID: 'standard_sub',
      planName: 'Standard Support',
      days: 90
    },
    {
      id: 4,
      name: '1-Year Premium Plan',
      description: 'Get 1 year of Premium Support for R14,999.99. Perfect for long-term, comprehensive support.',
      price: 14999.99,
      duration: '1 Year',
      planID: 'premium_sub',
      planName: 'Premium Support',
      days: 365
    },
  ];

  useEffect(() => {
    const fetchSubscription = async () => {
      const entityNumber = localStorage.getItem('entityNumber');

      if (entityNumber) {
        try {
          const response = await axios.get(`http://localhost:3002/subscription/${entityNumber}`);
          const subscriptionPlan = response.data.subscription;

          setSubscription(subscriptionPlan); // Update the subscription state

          if (subscriptionPlan === 'Inactive Subscription') {
            setHasActiveSubscription(false);
          } else {
            setHasActiveSubscription(true);
          }
        } catch (error) {
          console.error('Error fetching subscription status:', error);
          setHasActiveSubscription(false); // Handle error by assuming no active subscription
        }
      }
    };

    fetchSubscription();
  }, []);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const getSelectedPlan = () => {
    return subscriptionPlans.find(plan => plan.id === selectedPlan);
  };

  const handleSuccess = async (response) => {
    console.log('Payment successful:', response);

    const planDetails = getSelectedPlan();
    if (!planDetails) return;

    const { planID, planName, days } = planDetails;
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(new Date().setDate(new Date().getDate() + days)).toISOString().split('T')[0];

    try {
      await axios.post('http://localhost:3002/update-subscription', {
        entityNumber,
        subscription_planID: planID,
        subscription_plan: planName,
        start_date: startDate,
        end_date: endDate
      });

      alert('Payment successful! Your subscription has been activated.');
      navigate('/user-page');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Payment successful, but there was an issue updating your subscription.');
    }
  };

  const handleClose = () => {
    console.log('Payment closed');
  };

  const selectedPlanDetails = getSelectedPlan();
  const amount = selectedPlanDetails ? selectedPlanDetails.price * 100 : 0;
  const email = "user@example.com";
  const planName = selectedPlanDetails ? selectedPlanDetails.name : "";

  const paystackConfig = {
    email,
    amount,
    publicKey,
    currency: "ZAR",
    onSuccess: handleSuccess,
    onClose: handleClose,
  };

  return (
    <div className="sub-container">
      {hasActiveSubscription && (
        <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>
          You currently have an active subscription and cannot purchase a new one until it expires.
        </p>
      )}

      <h2>Select a Subscription Plan</h2>
      <p>Please choose one of the subscription plans below:</p>

      {subscriptionPlans.map((plan) => (
        <div key={plan.id} className="subscription-plan">
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
          <p>Price: R{plan.price.toFixed(2)}</p>
          <button
            className={`select-plan-btn ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
            disabled={hasActiveSubscription}
          >
            {selectedPlan === plan.id ? 'Selected' : 'Select'}
          </button>
        </div>
      ))}

      {selectedPlan && !hasActiveSubscription && (
        <PaystackButton
          className="submit-btn"
          {...paystackConfig}
          text={`Pay for ${planName}`}
        />
      )}
    </div>
  );
};

export default Subscriptions;