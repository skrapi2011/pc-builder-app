import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import '../css/Home.css';
import { apiService } from '../services/api';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleCategory = (categoryName) => {
        if (activeCategory === categoryName) {
            setActiveCategory(null);
        } else {
            setActiveCategory(categoryName);
        }
    };

    return (
        <div className="app-container">
            <TopBar />
            <main className="main-container">
                <Categories activeCategory={activeCategory} toggleCategory={toggleCategory} />
                <Products activeCategory={activeCategory} />
            </main>
            <Footer />
        </div>
    );
};

const Categories = ({ activeCategory, toggleCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        apiService.getCategories()
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <aside className="categories-container">
            <h1>Kategorie</h1>
            <ul className="categories-list">
                {categories.length > 0 ? (
                    categories.map(category => (
                        <li
                            key={category.cat_id}
                            className={activeCategory === category.cat_name ? 'active' : ''}
                            onClick={() => toggleCategory(category.cat_name)}
                        >
                            {category.cat_name}
                        </li>
                    ))
                ) : (
                    <li>Ładowanie danych...</li>
                )}
            </ul>
        </aside>
    );
};

const Products = ({ activeCategory }) => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        apiService.getComponents()
            .then(response => response.json())
            .then(data => {
                setAllProducts(data);
                setProducts(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        if (!activeCategory) {
            setProducts(allProducts);
            return;
        }

        const filteredProducts = allProducts.filter(
            product => product.cat_name === activeCategory
        );
        setProducts(filteredProducts);
    }, [activeCategory, allProducts]);

    return (
        <div className="products-container">
            {products.length > 0 ? (
                products.map(product => (
                    <Link to={`/component/${product.component_id}`} key={product.component_id} className="product">
                        <p>{product.cat_name}</p>
                        <h3>{product.name}</h3>
                    </Link>
                ))
            ) : (
                <div>Brak produktów w tej kategorii</div>
            )}
        </div>
    );
};

export default Home;