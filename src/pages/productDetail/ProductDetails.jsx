import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { Icon } from '@iconify/react';
import { domain } from '../../api.service';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom'; // Assuming you are using React Router

const ProductDetails = ({ match }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {productId} = useParams(); // Get product ID from URL params

    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = sessionStorage.getItem('authToken');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${domain}/product/getProductDetail/${productId}?viewProduct=true`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        navigate('/login'); // Redirect to login if unauthorized
                    } else {
                        throw new Error('Failed to fetch product details');
                    }
                }

                const data = await response.json();

                if (data.status === 200) {
                    const productData = data.data;
                    console.log(productData);
                    setProduct(data.data);
                     if (productData.sizes && productData.sizes.length > 0) {
                    setSelectedSize(productData.sizes[0].size);  // Set the first size as default
                }

                if (productData.colors && productData.colors.length > 0) {
                    setSelectedColor(productData.colors[0]);  // Set the first color as default
                }
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProductDetails();
    }, [productId, navigate]);

    async function handleAddToCart(path) {
        // Retrieve userId from sessionStorage
        alert("Please wait...")
        const userData = sessionStorage.getItem('userData');
        if (!userData) {
            navigate('/login');  // Redirect to login if user data is not found
            alert('User not logged in');
            return;
        }
    
        const { id: userId } = JSON.parse(userData);  // Extract userId from stored data
    
        if (!userId || !selectedColor || !selectedSize || !product) {
            alert('Please select a color, size, and ensure the product details are loaded.');
            return;
        }
    
        try {
            const response = await axios.post(
                `${domain}${path}`,  // Use the API endpoint for adding to cart
                {
                    userId: userId,  // Use the userId retrieved from sessionStorage
                    productId: product._id,  // Get productId from the fetched product details
                    quantity: 1,
                    color: selectedColor,
                    size: selectedSize
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                    }
                }
            );
    
            // Update the cart state based on the API response
         
            alert(response.data.message);  // Show success message
        } catch (error) {
            navigate('/login');  // Redirect to login if unauthorized
            console.error("Error adding to cart:", error);
            alert('There was an issue adding the item to your cart. Please try again.');
        }
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    return (
        <div className="product-details-container">
            <div className="product-details-left">
                <div className="product-details-images">
                    {product.images.map((image, index) => (
                        <div
                            key={index}
                            className="product-details-image"
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ))}
                </div>
                <div className="product-details-description">
                    <div className="product-details-dis">Product Description</div>
                    <p style={{ textAlign: "justify", color: "#212529d5", marginTop: "10px" }}>
                        {product.description}
                    </p>
                </div>
            </div>

            <div className="product-details-right">
                <div className="product-details-info">
                    <h1 className="product-details-name">{product.name}</h1>

                    <div className="product-details-price-parent">
                        <div className="product-details-price">{product.price}₹</div>
                        <div className="product-details-tax">Incl. of all Taxes</div>
                    </div>

                    <div className="product-details-details">
                        <div><strong>Pattern</strong> - {product.pattern}</div>
                        <div><strong>Fabric</strong> - {product.fabric}</div>
                        <div><strong>Fit</strong> - {product.fit}</div>
                        <div className="product-details-color-selection">
                            <label><strong>Colour</strong></label>
                            <select onChange={handleColorChange} value={selectedColor || ''} className="product-details-color-select">
                                <option value="">Select Color</option>
                                {product.colors.map((color) => (
                                    <option key={color} value={color} className="product-details-option">
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="product-details-size-selection">
                        <p style={{ textAlign: "justify" }}><strong>Size</strong></p>
                        <div className="product-details-sizes">
                            {product.sizes.map((sizeObj) => (
                                <button
                                    key={sizeObj._id}
                                    className={`product-details-size-button ${selectedSize === sizeObj.size ? 'product-details-selected' : ''}`}
                                    onClick={() => handleSizeClick(sizeObj.size)}
                                >
                                    {sizeObj.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="product-details-actions">
                        <button className="product-details-add-to-cart" onClick={()=>handleAddToCart("/user/addToCart")}>Add to Cart</button>
                        {/* <button className="product-details-buy-now">Buy Now</button> */}
                        <div className="product-details-add-to-wishlist" onClick={()=>handleAddToCart("/user/addToWishlist")}>
                            <Icon icon="mdi:heart-outline" /> Add to Wishlist
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
