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
    const [showBuildPopup, setShowBuildPopup] = useState(false);
    const [builds, setBuilds] = useState([]);
    const [selectedBuildId, setSelectedBuildId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        apiService.getComponent(id)
            .then(response => response.json())
            .then(data => {
                setComponentDetails(data);
                setIsAdmin(localStorage.getItem('role') === 'Admin');
            })
            .catch(error => console.error('Error:', error));

        const username = localStorage.getItem('username');
        if (username) {
            apiService.getBuilds(username)
                .then(response => response.json())
                .then(data => setBuilds(data))
                .catch(error => console.error('Error:', error));
        }
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

    const handleAddToBuild = async () => {
        if (!selectedBuildId) {
            setMessage('Wybierz zestaw!');
            return;
        }

        try {
            const response = await apiService.addComponentToBuild({
                buildId: selectedBuildId,
                componentId: componentDetails.component_id,
                quantity: quantity
            });

            if (response.ok) {
                setMessage('Komponent został dodany do zestawu!');
                setShowBuildPopup(false);
                setSelectedBuildId('');
                setQuantity(1);
            } else {
                setMessage('Wystąpił błąd podczas dodawania komponentu do zestawu.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Wystąpił błąd podczas dodawania do zestawu.');
        }
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
            <button 
                className="add-button" 
                onClick={() => setShowBuildPopup(true)}
            >
                Dodaj do zestawu
            </button>
            <p className="product-id">ID: {componentDetails.component_id}
                {isAdmin && <button onClick={handleDelete} className="delete-button">Usuń produkt</button>}
                {message && <p className="message">{message}</p>}
            </p>

            {showBuildPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Wybierz zestaw</h3>
                        <select 
                            value={selectedBuildId} 
                            onChange={(e) => setSelectedBuildId(e.target.value)}
                        >
                            <option value="">Wybierz zestaw...</option>
                            {builds.map(build => (
                                <option key={build.build_id} value={build.build_id}>
                                    {build.build_name}
                                </option>
                            ))}
                        </select>
                        <div className="quantity-selector">
                            <label>Ilość:</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="popup-buttons">
                            <button onClick={handleAddToBuild}>Dodaj</button>
                            <button onClick={() => setShowBuildPopup(false)}>Anuluj</button>
                        </div>
                        {message && <p className="message">{message}</p>}
                    </div>
                </div>
            )}
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