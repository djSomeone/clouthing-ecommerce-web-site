import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './exchangeForm.css'; // Import your CSS file
import { domain } from '../../../../../../api.service';
import { useAlert } from '../../../../../../component/alert_popup/AlertContext';
const ExchangeForm = ({ onClose, product, orderDetail,fetchOrders }) => {
  const showAlert=useAlert().showAlert;
  const navigate = useNavigate();
  // const [reason, setReason] = useState('');
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!product?.productId?._id) return;

      try {
        const response = await axios.get(`${domain}/product/getProductDetail/${product.productId._id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        });

        if (response.data.status === 200) {
          const productData = response.data.data;

          // Extract available colors and sizes
          setAvailableColors(productData.colors || []);
          setAvailableSizes(productData.sizes?.filter(sizeObj => sizeObj.quantity > 0).map(sizeObj => sizeObj.size) || []);
        } else {
          setErrorMessage('Failed to fetch product details.');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setErrorMessage('Error fetching product details.');
      }
    };

    fetchProductDetails();
  }, [product]);

  const handleProblemChange = (event) => {
    setProblem(event.target.value);
  };

  const getProblemOptions = () => {
    return ['Product Damaged', 'Color Mismatch', 'Size Issue', 'Material Defect', 'Other'];
  };

  const getColorOptions = () => {
    if (problem === 'Color Mismatch') {
      return availableColors; // Example colors
    }
    return [];
  };

  const getSizeOptions = () => {
    if (problem === 'Size Issue' ) {
      return availableSizes; // Example sizes
    }
    return [];
  };

  const handleSubmit = async () => {
    if (!problem || !description) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
  console.log('orderDetail:', orderDetail); 
    const payload = {
      orderId: orderDetail?._id,
      productId: product?.productId._id,
      reasonForExchange: problem,
      problem: description,
     
    };
    if (color) {
      payload.color = color;
    }
    if (size) {
      payload.size = size;
    }
    console.log('Payload:', payload);
  
    // const userData = JSON.parse(sessionStorage.getItem("userData"));
    const token = sessionStorage.getItem("authToken");
  
    try {
      const response = await axios.post(`${domain}/user/addExchange`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      showAlert('Exchange request submitted successfully!');
      // fetchOrders();
      navigate('/sucess-return');
      // onClose();
    } catch (error) {
      setErrorMessage('Failed to submit exchange request. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="exchange-form">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-group">
        <label htmlFor="problem">Reason for exchanging the product?</label>
        <select id="problem" value={problem} onChange={handleProblemChange}>
          <option value="">Select a Problem</option>
          {getProblemOptions().map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Describe the Problem (required)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Comment here..."
        />
      </div>

      {getColorOptions().length > 0 && (
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <select id="color" value={color} onChange={e => setColor(e.target.value)}>
            <option value="">Select a Color</option>
            {getColorOptions().map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      {getSizeOptions().length > 0 && (
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select id="size" value={size} onChange={e => setSize(e.target.value)}>
            <option value="">Select a Size</option>
            {getSizeOptions().map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className='exchange-form-buttons'>
        <button type="button" className="continue-button-exchange" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Continue'}
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ExchangeForm;
