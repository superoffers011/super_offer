/**
 * Load Razorpay script dynamically if not present
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Trigger Razorpay Payment Checkout Flow
 * @param {Object} orderData Response from /api/payment/create-order
 * @param {Function} onSuccess Callback on successful verification
 * @param {Function} onError Callback on failure or dismissal
 */
export const launchRazorpayCheckout = async ({
  orderData,
  onSuccess,
  onError,
}) => {
  const isLoaded = await loadRazorpayScript();

  // If Razorpay SDK is loaded and we have standard order
  if (isLoaded && window.Razorpay && !orderData.isMock) {
    try {
      const options = {
        key: orderData.keyId,
        amount: orderData.amount, // in paise
        currency: orderData.currency || 'INR',
        name: 'DiwaliDhamaka11',
        description: `Festive ₹11 Pass: ${orderData.offer?.title?.substring(0, 35)}...`,
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=120&q=80',
        order_id: orderData.orderId,
        prefill: {
          name: orderData.user?.name || '',
          email: orderData.user?.email || '',
          contact: orderData.user?.phone || '',
        },
        theme: {
          color: '#8C1020',
          backdrop_color: 'rgba(31, 4, 8, 0.9)',
        },
        handler: async function (response) {
          try {
            onSuccess({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              offerId: orderData.offer?._id,
            });
          } catch (err) {
            onError(err.message || 'Payment verification failed');
          }
        },
        modal: {
          ondismiss: function () {
            onError('Payment window closed by user.');
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (response) {
        onError(response.error.description || 'Payment Failed');
      });
      razorpayInstance.open();
      return;
    } catch (err) {
      console.warn('Falling back to Instant Festive Simulation:', err);
    }
  }

  // Fallback / Instant Festive Simulation Mode:
  // Allows testing ₹11 orders instantly without external gateway dependencies
  return {
    isSimulation: true,
    orderId: orderData.orderId,
    amount: orderData.amountInRupees || 11,
    offerId: orderData.offer?._id,
  };
};
