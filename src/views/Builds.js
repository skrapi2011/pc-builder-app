import React, { useState, useEffect } from 'react';
import '../css/Builds.css';
import TopBar from './TopBar';
import Footer from './Footer';
import { apiService } from '../services/api';

const BuildsPanel = () => {
    const [builds, setBuilds] = useState([]);
    const [newBuildName, setNewBuildName] = useState('');

    // Data fetching
    useEffect(() => {
        fetchBuilds();
    }, []);

    const fetchBuilds = () => {
        const username = localStorage.getItem('username');
        apiService.getBuilds(username)
            .then(response => response.json())
            .then(data => {
                setBuilds(data);
            })
            .catch(error => console.error('Error:', error));
    };


    const handleAddBuild = async () => {
        try {
            const response = await apiService.addBuild({
                name: newBuildName,
                username: localStorage.getItem('username')
            });

            if (response.ok) {
                fetchBuilds();
                setNewBuildName('');
            } else {
                console.error('Błąd podczas dodawania builda');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania builda', error);
        }
    };

    const handleEditBuild = (buildId) => {
        // TODO: Edytowanie buildu
    };

    const handleDeleteBuild = async (buildId) => {
        try {
            const response = await apiService.deleteBuild(buildId);
            if (response.ok) {
                fetchBuilds();
            } else {
                console.error('Błąd podczas usuwania builda');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania builda', error);
        }
    };

    return (
        <main className="builds-container">
            <div className="add-build-section">
                <input type="text" placeholder="Nazwa nowego zestawu" value={newBuildName} required
                    onChange={(e) => setNewBuildName(e.target.value)}/>
                <button onClick={handleAddBuild} className="add-build-button">
                    Utwórz nowy zestaw
                </button>
            </div>
            {builds.map(build => (
                <div className="build" key={build.build_id}>
                    <h2>{build.build_name}</h2>
                    <ul>
                        {build.components.map(component => (
                            <li key={component.component_id}>
                                {`${component.component_name} (x${component.quantity}) - ${component.price.toFixed(2)} zł`}
                            </li>
                        ))}
                    </ul>
                    <h2>Cena: {build.components.reduce((acc, {price, quantity}) => acc + price * quantity, 0).toFixed(2)} zł</h2>
                    <button onClick={() => handleEditBuild(build.build_id)}>Edytuj</button>
                    <button onClick={() => handleDeleteBuild(build.build_id)}>Usuń</button>
                </div>
            ))}
        </main>
    );
};

const Builds = () => {
    return (
        <div>
            <TopBar />
            <BuildsPanel />
            <Footer />
        </div>
    );
};

export default Builds;
