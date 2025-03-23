import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../productItem/productItem';
import "../prooductList/productList.css";
import { domain } from '../../../../../../api.service';
import { useAlert } from '../../../../../../component/alert_popup/AlertContext';

function ExchangeProductList({ orderDetail, handleExchange }) {
    const showAlert=useAlert().showAlert;
    const navigate = useNavigate();
    const statusImages = {
        ordered: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/placed_onpma9.png',
        packaging: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/packaging_v3qn3q.png',
        ontheway: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/ontheway_yq9a2v.png',
        delivered: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853904/delivered_jlxmmi.png',
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = sessionStorage.getItem("authToken");

    // Get exchange product IDs and map exchanges for easy lookup
    const exchangeProductIds = new Set(orderDetail.exchanges.map(item => item.productId));
    const exchangesMap = orderDetail.exchanges.reduce((map, exchange) => {
        map[exchange.productId] = exchange;
        return map;
    }, {});

    // Filter the products only for exchange based on exchangeProductIds
    const exchangeProducts = orderDetail.productDetails.filter(
        product => exchangeProductIds.has(product.productId._id)
    );

    const handleCancel = async (orderId, exchangeId) => {
        // Show confirmation dialog before proceeding with cancellation
        const confirmCancel = window.confirm('Are you sure you want to cancel this exchange?');

        if (!confirmCancel) {
            // If the user cancels, do nothing and return early
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${domain}/user/cancelProductExchange`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderId,
                    exchangeId,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                showAlert(data.message); // Show success message
            } else {
                setError(data.message || 'Something went wrong.'); // Show error message if the API call fails
            }
            navigate('/', { replace: true });
        } catch (error) {
            setError('An error occurred while cancelling the exchange.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="product-list">
            {/* Render only if there are exchange products */}
            {exchangeProducts.length > 0 && (
                <>
                    <div className="product-list-header">
                        <div className="product-header">Product</div>
                        <div className="quantity-header">Quantity</div>
                        <div className="price-header">Price</div>
                        <div className="subtotal-header">Subtotal</div>
                    </div>

                    <hr color='#ccc' />

                    <h5 style={{ textAlign: "justify" }}>Return Initiated</h5>

                    {exchangeProducts.map((product) => {
                        const exchange = exchangesMap[product.productId._id];
                        if (!exchange) return null; // Skip if no corresponding exchange found

                        return (
                            <div key={product._id} style={{ textAlign: "justify" }}>
                                <ProductItem
                                    product={product}
                                    orderdDetail={orderDetail}
                                    showExchange={false}
                                    handleExchange={handleExchange}
                                />
                                {!exchange.isCancelled &&
                                    (<><p style={{ textAlign: "justify" }}>
                                        <strong>Return expected arrival: </strong>{exchange.arrivalDate}
                                    </p>
                                        <div
                                            key={exchange._id}
                                            style={{
                                                backgroundImage: `url(${statusImages[exchange.exchangeStatus]})`,
                                            }}
                                            className="exchanghe-status"
                                        ></div>
                                    </>
                                    )}

                                {exchange.exchangeStatus==="delivered" && (
                                    <p style={{ color: 'green', fontWeight: 'bold', }}>
                                        This return has been Delivered.
                                    </p>
                                )}
                                {/* Show Cancelled Return message if exchange is cancelled */}
                                {exchange.isCancelled && (
                                    <p style={{ color: 'red', fontWeight: 'bold', }}>
                                        This return has been cancelled.
                                    </p>
                                )}
                                {/* Cancel Button - Only show if not cancelled and status is not 'delivered' */}
                                {exchange.exchangeStatus !== 'delivered' && exchange.isCancelled === false && (
                                    <button

                                        onClick={() => handleCancel(orderDetail._id, exchange._id)}
                                        disabled={loading}
                                        className="cancel-exchange-button"
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'red',
                                            padding: '8px 16px',
                                            border: '1px solid red',
                                            borderRadius: '4px',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                        }}
                                    >
                                        {loading ? 'Cancelling...' : 'Cancel Exchange'}
                                    </button>
                                )}

                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                <hr color='#ccc' />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default ExchangeProductList;
