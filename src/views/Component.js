import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Footer from "./Footer";
import '../css/Component.css';
import TopBar from "./TopBar";
import { apiService } from '../services/api';

const CompInfo = () => {
    const [componentDetails, setComponentDetails] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        apiService.getComponent(id)
            .then(response => response.json())
            .then(data => {
                setComponentDetails(data);
                setIsAdmin(localStorage.getItem('role') === 'Admin');
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleDelete = async () => {
        await apiService.removeComponent(componentDetails.component_id)
            .then(response => {
                if (response.ok) {
                    setMessage('Komponent został usunięty.');
                } else {
                    setMessage('Wystąpił problem z usuwaniem komponentu.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setMessage('Wystąpił błąd podczas usuwania.');
            });
    };

    if (!componentDetails) {
        return <div>Loading component details...</div>;
    }

    return (
        <div className="product-container" data-component-id={componentDetails.component_id}>
            <h1 className="product-name">{componentDetails.name}</h1>
            <p className="product-type"><span>Kategoria:</span> {componentDetails.cat_name}</p>
            <p className="product-description"><span>Opis produktu:</span> {componentDetails.description}</p>
            <p className="product-price"><span>Cena:</span> {componentDetails.price} zł</p>
            <button className="add-button">Dodaj do zestawu</button>
            <p className="product-id">ID: {componentDetails.component_id}
                {isAdmin && <button onClick={handleDelete} className="delete-button">Usuń produkt</button>}
                {message && <p className="message">{message}</p>}
            </p>

        </div>
    );
};

const Component = () => {
    return (
        <div>
            <TopBar />
            <CompInfo />
            <Footer />
        </div>
    );
};

export default Component;