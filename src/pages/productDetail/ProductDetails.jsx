import React, { useState } from 'react';
import './ProductDetails.css';
import { Icon } from '@iconify/react';

const ProductDetails = () => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const product = {
        name: "Brown Floral Printed Kurti",
        price: "2145",
        pattern: "Lucknowi",
        fabric: "Italian Liner",
        fit: "Regular Fit",
        colors: ["Peach", "White", "Blue", "Green"],
        description1: `This elegant white kurti features intricate embroidery, a round neckline, and three-quarter sleeves. styled with a pair of gold flared palazzos, it's perfect for festive or semi-formal occasions. Comfortable and stylish, it's ideal for effortless`,
        description: `This elegant white kurti features intricate embroidery, a round neckline, and three-quarter sleeves. 
        
        Paired with a gold flared palazzo, it's perfect for festive or semi-formal occasions. Comfortable and stylish, it's ideal for effortless ethnic charm.

        Paired with a flowy gold-toned flared palazzo, the combination brings a regal charm to your blending contemporary style with traditional elements. The lightweight fabric ensures all-day comfort while keeping you effortlessly stylish.`,
        sizes: ["M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "IXE", "8XL", "9XL", "10XL"],
        images: [
            "https://i.pinimg.com/236x/4f/f0/31/4ff031439117c510107b7fd608cf67e4.jpg",
            "https://images.meesho.com/images/products/402439361/dqg7t_1200.jpg"
        ]
    };
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
                    <div className="product-details-image" style={{ backgroundImage: `url(${product.images[0]})` }}></div>
                    <div className="product-details-image" style={{ backgroundImage: `url(${product.images[1]})` }}></div>
                </div>
                <div className="product-details-description">
                    <div className='product-details-dis'>Product Description</div>
                    <p style={{ textAlign: "justify", color: "#212529d5", margin: "0px" }}>{product.description}</p>
                    <p style={{ textAlign: "justify", color: "#212529d5", margiTop: "10px" }}>{product.description1}</p>
              
                </div>
            </div>

            <div className="product-details-right">
                <div className="product-details-info">
                    <h1 className="product-details-name">{product.name}</h1>

                    <div className='product-details-price-parent'>
                        <div className="product-details-price">{product.price}₹</div>
                        <div className="product-details-tax">Incl. of all Taxes</div>
                    </div>

                    <div className="product-details-details">
                        <div><strong>Pattern</strong> - {product.pattern}</div>
                        <div><strong>Fabric</strong> - {product.fabric}</div>
                        <div><strong>Fit</strong> - {product.fit}</div>
                        <div className="product-details-color-selection">
                            <label><strong>Colour</strong></label>
                            <select 
    onChange={handleColorChange} 
    value={selectedColor || ''}
    className="product-details-color-select"
>
    <option className="product-details-option" value="">Select Color</option>
    {product.colors.map((color) => (
        <option key={color} value={color} className="product-details-option">
            {color}
        </option>
    ))}
</select>
                        </div>
                    </div>

                    <div className="product-details-size-selection">
                        <p style={{textAlign:"justify"}}><strong>Size</strong></p>
                        <div className="product-details-sizes">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`product-details-size-button ${selectedSize === size ? 'product-details-selected' : ''}`}
                                    onClick={() => handleSizeClick(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* <a href="#" className="product-details-size-chart-link">Size Chart</a> */}

                    <div className="product-details-actions">
                        <button className="product-details-add-to-cart">Add to Cart</button>
                        <button className="product-details-buy-now">Buy Now</button>
                        <div className="product-details-add-to-wishlist">
                            <Icon icon="mdi:heart-outline" /> Add to Wishlist
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;