import React, { useState } from 'react';
import './categories.css';
import { Link } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import { Icon } from '@iconify/react';
import arrowUp from '@iconify/icons-mdi/chevron-up';
import arrowDown from '@iconify/icons-mdi/chevron-down';
import closeCircle from '@iconify/icons-mdi/close';
import Product from '../../component/product/product';
const productImages = [
    'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
    'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
];
const Categories = () => {
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
    const [isDrawerOpen, setIsDrawerOpen]=useState(false);

    const toggleDrawer=()=>{
        setIsDrawerOpen(!isDrawerOpen);
    }

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

    

    const getFilterElements = () => {
        const elements = [];

        for (const filterType in filters) {
            if (filters[filterType].length > 0) {
                filters[filterType].forEach(filterValue => {
                    elements.push({
                        name: filterValue,
                        filterType, // Store the filter type for handling removal
                    });
                });
            }
        }

        return elements;
    };
    const filterSection=(name)=>{
        console.log(name)
        return (<div className={`ProductListing-filter-section ${name || ""}`}>
            <div className="ProductListing-filter-group">
                <div className='ProductListing-filter-title'>Categories</div>
                {availableCategories.map((category) => (
                    <div key={category} >
                        <label className="ProductListing-category-item" onClick={() => handleCategoryClick(category)}>
                            <div className='ProductListing-category-name'>{category}</div>
                            <span className="ProductListing-category-arrow">
                                <Icon
                                    icon={selectedCategory === category ? arrowUp : arrowDown}
                                    width="20"
                                    height="20"
                                />
                            </span>
                        </label>
                        {selectedCategory === category && (
                            <div className="ProductListing-sub-categories">
                                {availableSubCategories.map((subCategory) => (
                                    <label key={subCategory}>
                                        <input
                                            type="checkbox"
                                            value={subCategory}
                                            
                                            checked={filters.subCategories.includes(subCategory)}
                                            onChange={(e) =>
                                                handleFilterChange("subCategories", e.target.value)
                                            }
                                        />
                                        {subCategory}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <hr color='#D9D9D9'/>
            <FilterGroup title="Colour"
                options={availableColors}
                selected={filters.colors}
                onChange={(val) => handleFilterChange("colors", val)}
                isColorFilter
            />
            <hr color='#D9D9D9'/>
            <FilterGroup
                title="Sizes"
                options={availableSizes}
                selected={filters.sizes}
                onChange={(val) => handleFilterChange("sizes", val)}
            />
            <hr color='#D9D9D9'/>
            <div className="ProductListing-filter-group">
          <div style={{textAlign:"justify",padding:"10px 0px", fontWeight:"600"}}>Price Range</div> 
          <input 
            type="range" 
            min="900" 
            max="4600" 
            value={filters.priceRange[1]} 
            onChange={handlePriceRangeChange} 
            id="price-range"
            style={{ accentColor: '#DA231D' }} 
          />
          <br/>
          <label style={{textAlign:"justify",marginTop:"10px"}}>
          900₹ - {filters.priceRange[1]}₹
          </label>
        </div>
        </div>)
    }
    const sortBysection=(name)=>{
        return (<div className={`${name ||  ""}`}>
            
            <select className='ProductListing-sort-by ProductListing-sort-by-box' id="sort" value={sortBy} onChange={(e) => handleSortByChange(e.target.value)}>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
            </select>
        </div>);
    }

    return (
        <div className='ProductListing-root'>
            <Drawer
                open={isDrawerOpen}
                onClose={toggleDrawer}
                zIndex={10000}
                direction="left" // Open from the right
                className="profile-drawer-content"
                overlayClassName="drawer-overlay"
            >
                {
                    filterSection("")
                }
            </Drawer>
           <div className="breadcrumb">
        <Link to="/" style={{textDecoration:"none",color:"black"}}>Home</Link> 
        <Icon icon={chevronRight} style={{fontSize:"20px"}}/> 
        <span style={{ color: '#DA231D' }}>Categories</span> 
      </div>

            <div className="ProductListing-all-product-count">All Items - {products.length}</div>
            <div className='ProductListing-filter-button-sortby'>
            <div className="ProductListing-filter-button" onClick={toggleDrawer}>Filter</div>
            {sortBysection()}
            </div>
            <div className='ProductListing-filter-bar-root'>
                <div className="ProductListing-filter-text" style={{minWidth:"270px",textAlign:"justify"}}> Filters</div>
                <div className="ProductListing-filter-bar" style={{ width:"100%", overflowX: 'auto' }}>
                    {getFilterElements().map((filterItem, index) => (
                        <div
                            key={index}
                            className={`ProductListing-filter-item ${filterItem.isSelected ? 'active' : ''}`}
                            onClick={() => handleFilterChange(filterItem.filterType, filterItem.name)}
                        >
                            <div className="ProductListing-filter-item-text">
                                
                                {filterItem.name}
                                <Icon icon={closeCircle} width="20" height="20" />
                            </div>
                        </div>
                    ))}
                </div>
               
                {sortBysection("inMobile")}
                </div>
                <hr color='#ccc' width="100%"/>
        <div className="ProductListing-container">
            
        {filterSection("inMobile")}
    
            <div className="ProductListing-product-list">
                
                <div className="ProductListing-products">
      {sortedProducts.map((product) => (
        <Product product={product}/>
        
      ))}
    </div>
            </div>
        </div>
        </div>
    );
};

const FilterGroup = ({ title, options, selected, onChange, isColorFilter }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const itemsToShow = showAll ? options : options.slice(0, 5); // Show limited items initially

    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleShowAll = () => setShowAll(!showAll);

    return (
        <div className="ProductListing-filter-group">
            <h3
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={toggleOpen}
            >
                {title}
                <Icon icon={isOpen ? arrowUp : arrowDown} width={20} height={20} />
            </h3>
            {isOpen && (
                <>
                    {itemsToShow.map(option => (
                        <label key={option} className={isColorFilter ? 'ProductListing-color-filter-label' : ''}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={selected.includes(option)}
                                onChange={(e) => onChange(e.target.value)}
                            />
                            {isColorFilter ? (
                                <span className="ProductListing-color-box" style={{ backgroundColor: option }}></span>
                            ) : null}
                            {option}
                        </label>
                    ))}
                    {options.length > 5 && (
                        <button
                            onClick={toggleShowAll}
                            style={{
                                marginTop: "10px",
                                cursor: "pointer",
                                color: "#007BFF",
                                background: "none",
                                border: "none",
                                fontSize: "14px",
                                color:"#DA231D"
                                // textDecoration: "underline",
                            }}
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Categories;