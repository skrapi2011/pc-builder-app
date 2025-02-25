import React, {useEffect, useState} from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import '../css/Manage.css';


const ManagePanel = () => {
    const [newComponent, setNewComponent] = useState({ name: '', description: '', price: '', cat_id: '' });
    const [editComponent, setEditComponent] = useState({ component_id: '', name: '', description: '', price: '', cat_id: '' });
    const [addMessage, setAddMessage] = useState('');
    const [editMessage, setEditMessage] = useState('');
    const [categories, setCategories] = useState([]);


    // Adding component
    const handleAddComponent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComponent),
            });

            if (response.ok) {

                setAddMessage('Dodano komponent!');
            } else {
                setAddMessage('Nie udało się dodać komponentu');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania', error);
            setAddMessage('Wystąpił błąd dodawania');
        }
    };

    // Fetching categories
    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error:', error));
    }, []);
    // Categories panel
    const CategoriesPanel = () => (
        <div className="categories-panel">
            <h2>Kategorie</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category.cat_id}: {category.cat_name}</li>
                ))}
            </ul>
        </div>
    );

    // Component edit
    const handleEditComponent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editComponent),
            });

            if (response.ok) {
                const responseData = await response.json();
                setEditMessage(responseData.message);

            } else {
                throw new Error('Błąd serwera');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas edycji', error);
            setEditMessage('Wystąpił błąd podczas edycji');
        }
    };

    const handleComponentIdChange = async (e) => {
        const componentId = e.target.value;
        setEditComponent({ ...editComponent, component_id: componentId });

        if (componentId) {
            try {
                const response = await fetch(`http://localhost:5000/component/${componentId}`);
                const data = await response.json();
                if (data) {
                    setEditComponent({ ...data });
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych komponentu', error);
            }
        }
    };


    return (
        <div className="manage-panel">
            <div className="add-component">
                <h2>Dodaj nowy komponent</h2>
                <form onSubmit={handleAddComponent}>
                    <input type="text" placeholder="Nazwa komponentu" required maxLength="25"
                           onChange={(e) => setNewComponent( {...newComponent, name: e.target.value} )} />
                    <textarea placeholder="Opis komponentu" maxLength="250" required
                           onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}/>
                    <input type="number" placeholder="Cena" required
                           onChange={(e) => setNewComponent({ ...newComponent, price: e.target.value })}/>
                    <input type="number" placeholder="ID kategorii" required
                           onChange={(e) => setNewComponent({ ...newComponent, cat_id: e.target.value })}/>
                    <button type="submit">Dodaj komponent</button>
                </form>
                {addMessage && <div className="manage-message">{addMessage}</div>}
            </div>
            <CategoriesPanel />
            <div className="edit-component">
                <h2>Edytuj komponent</h2>
                <form onSubmit={handleEditComponent}>
                    <input type="number" placeholder="ID komponentu do edycji" value={editComponent.component_id || ''}
                        onChange={handleComponentIdChange} required
                    />
                    <input type="text" placeholder="Nowa nazwa komponentu" value={editComponent.name || ''}
                        onChange={(e) => setEditComponent({ ...editComponent, name: e.target.value })}
                    />
                    <textarea placeholder="Nowy opis komponentu" value={editComponent.description || ''} maxLength="250"
                        onChange={(e) => setEditComponent({ ...editComponent, description: e.target.value })}
                    />
                    <input type="number" placeholder="Nowa cena" value={editComponent.price || ''}
                        onChange={(e) => setEditComponent({ ...editComponent, price: e.target.value })}
                    />
                    <input type="number" placeholder="Nowe ID kategorii" value={editComponent.cat_id || ''}
                        onChange={(e) => setEditComponent({ ...editComponent, cat_id: e.target.value })}
                    />
                    <button type="submit">Edytuj komponent</button>
                </form>
                {editMessage && <div className="manage-message">{editMessage}</div>}
            </div>
        </div>
    );
};

const Manage = () => {

    return (
        <div>
            <TopBar />
            <ManagePanel />
            <Footer />
        </div>
    );

}

export default Manage;