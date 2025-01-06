import React, { useState } from 'react';
import './ProductListing.css';
const productImages = [
    'https://images.meesho.com/images/products/402439361/dqg7t_1200.jpg',
    'https://i.pinimg.com/236x/4f/f0/31/4ff031439117c510107b7fd608cf67e4.jpg',
];
const ProductListing = () => {
    const [products, setProducts] = useState(() => {
        return [
            { id: 1, name: 'Floral Print Kurti', category: 'Wardrobe', subCategory: 'Kurtis', color: 'Red', price: 1200, image: productImages[0], sizes: ['S', 'M', 'L'] },
            { id: 2, name: 'Striped Co-ord Set', category: 'Wardrobe', subCategory: 'Co-ord Sets', color: 'Blue', price: 1800, image: productImages[1], sizes: ['M', 'L', 'XL'] },
            { id: 3, name: 'Denim Jacket', category: 'Casual Wear', subCategory: 'Jackets', color: 'Blue', price: 2500, image: productImages[0], sizes: ['S', 'M', 'L', 'XL'] },
            { id: 4, name: 'Embroidered Gown', category: 'Occasion Wear', subCategory: 'Gowns', color: 'Pink', price: 3000, image: productImages[1], sizes: ['M', 'L'] },
            { id: 5, name: 'Printed T-shirt', category: 'Casual Wear', subCategory: 'T-shirts', color: 'White', price: 800, image: productImages[0], sizes: ['S', 'M', 'L', 'XL'] },
            { id: 6, name: 'Silk Saree', category: 'Occasion Wear', subCategory: 'Sarees', color: 'Green', price: 4000, image: productImages[1], sizes: ['One Size'] },
            { id: 7, name: 'Cotton Kurti', category: 'Wardrobe', subCategory: 'Kurtis', color: 'Blue', price: 1000, image: productImages[0], sizes: ['S', 'M'] },
            { id: 8, name: 'Checkered Shirt', category: 'Casual Wear', subCategory: 'Shirts', color: 'Red', price: 1500, image: productImages[1], sizes: ['M', 'L', 'XL'] },
            { id: 9, name: 'Party Dress', category: 'Occasion Wear', subCategory: 'Dresses', color: 'Black', price: 2800, image: productImages[0], sizes: ['S', 'M', 'L'] },
            { id: 10, name: 'Graphic Tee', category: 'Casual Wear', subCategory: 'T-shirts', color: 'Black', price: 900, image: productImages[1], sizes: ['M', 'XL'] },
            { id: 11, name: 'Banarasi Saree', category: 'Occasion Wear', subCategory: 'Sarees', color: 'Gold', price: 5000, image: productImages[0], sizes: ['One Size'] },
            { id: 12, name: 'Long Kurti', category: 'Wardrobe', subCategory: 'Kurtis', color: 'Green', price: 1300, image: productImages[1], sizes: ['L', 'XL'] },
            { id: 13, name: 'Hoodie', category: 'Casual Wear', subCategory: 'Hoodies', color: 'Grey', price: 2000, image: productImages[0], sizes: ['S', 'M', 'L', 'XL'] },
            { id: 14, name: 'Anarkali Suit', category: 'Occasion Wear', subCategory: 'Suits', color: 'Maroon', price: 3500, image: productImages[1], sizes: ['M', 'L'] },
        ];
    });

    const [filters, setFilters] = useState({
        categories: [],
        subCategories: [],
        colors: [],
        priceRange: [900, 4600],
        sizes: [],
    });

    const [sortBy, setSortBy] = useState('lowToHigh');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType].includes(value)
                ? prevFilters[filterType].filter(item => item !== value)
                : [...prevFilters[filterType], value],
        }));
    };

    const handlePriceRangeChange = (e) => {
        setFilters(prev => ({ ...prev, priceRange: [900, parseInt(e.target.value)] }));
    };

    const handleSortByChange = (value) => setSortBy(value);

    const handleCategoryClick = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    const filteredProducts = products.filter(product => {
        if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
        if (filters.subCategories.length > 0 && !filters.subCategories.includes(product.subCategory)) return false;
        if (filters.colors.length > 0 && !filters.colors.includes(product.color)) return false;
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
        if (filters.sizes.length > 0 && !product.sizes.some(size => filters.sizes.includes(size))) return false;
        return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => sortBy === 'lowToHigh' ? a.price - b.price : b.price - a.price);

    const availableCategories = [...new Set(products.map(p => p.category))];
    const availableSubCategories = selectedCategory
        ? [...new Set(products.filter(p => p.category === selectedCategory).map(p => p.subCategory))]
        : [];
    const availableColors = [...new Set(products.map(p => p.color))];
    const availableSizes = [...new Set(products.map(p => p.sizes).flat())];

    return (
        <div className="ProductListing-container">
            <div className="ProductListing-filter-section">
                <h2>Filters</h2>
                <div className="ProductListing-filter-group">
                    <h3>Categories</h3>
                    {availableCategories.map(category => (
                        <div key={category}>
                            <label onClick={() => handleCategoryClick(category)}>
                                {category}
                            </label>
                            {selectedCategory === category && (
                                <div className="ProductListing-sub-categories">
                                    {availableSubCategories.map(subCategory => (
                                        <label key={subCategory}>
                                            <input
                                                type="checkbox"
                                                value={subCategory}
                                                checked={filters.subCategories.includes(subCategory)}
                                                onChange={(e) => handleFilterChange('subCategories', e.target.value)}
                                            />
                                            {subCategory}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <FilterGroup title="Colour" options={availableColors} selected={filters.colors} onChange={(val) => handleFilterChange('colors', val)} isColorFilter />
                <FilterGroup title="Sizes" options={availableSizes} selected={filters.sizes} onChange={(val) => handleFilterChange('sizes', val)} />
                <div className="ProductListing-filter-group">
                    <h3>Price Range</h3>
                    <input type="range" min="900" max="4600" value={filters.priceRange[1]} onChange={handlePriceRangeChange} />
                    <span>900 - {filters.priceRange[1]}</span>
                </div>
            </div>
            <div className="ProductListing-product-list">
                <div className="ProductListing-sort-by">
                    <label htmlFor="sort">Sort by:</label>
                    <select id="sort" value={sortBy} onChange={(e) => handleSortByChange(e.target.value)}>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                </div>
                <div className="ProductListing-products">
                    {sortedProducts.map(product => (
                        <div key={product.id} className="ProductListing-product">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h3>
                            <p className="ProductListing-price">₹{product.price} <span className="ProductListing-multiplier">24.45x</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FilterGroup = ({ title, options, selected, onChange, isColorFilter }) => (
    <div className="ProductListing-filter-group">
        <h3>{title}</h3>
        {options.map(option => (
            <label key={option} className={isColorFilter ? 'ProductListing-color-filter-label' : ''}>
                <input
                    type="checkbox"
                    value={option}
                    checked={selected.includes(option)}
                    onChange={(e) => onChange(e.target.value)}
                />
                {isColorFilter ? <span className="ProductListing-color-box" style={{ backgroundColor: option }}></span> : null}
                {option}
            </label>
        ))}
    </div>
);

export default ProductListing;