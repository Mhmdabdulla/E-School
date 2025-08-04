// src/pages/PaymentSuccess.tsx

const PaymentSuccess = () => {
  return (
    <div className="success-page">
      <h1> Payment Successful!</h1>
      <p>Thank you for your purchase. You can now access your course.</p>
      
      <a onClick={()=>window.location.href = `http://localhost:5173`}>Go to My Courses</a>
    </div>
  );
};

export default PaymentSuccess;
