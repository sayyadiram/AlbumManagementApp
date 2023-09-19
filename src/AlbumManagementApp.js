import React, { useState, useEffect } from 'react';
import './AlbumManagementApp.css';

const API_URL = 'https://jsonplaceholder.typicode.com/albums';

function AlbumManagementApp() {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ userId: '', title: '' });
  const [updateAlbum, setUpdateAlbum] = useState({ id: '', userId: '', title: '' });
  const [deleteAlbumId, setDeleteAlbumId] = useState('');

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleAddAlbum = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newAlbum),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setAlbums([...albums, data]);
      setNewAlbum({ userId: '', title: '' });
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const handleUpdateAlbum = async () => {
    try {
      const response = await fetch(`${API_URL}/${updateAlbum.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateAlbum),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedAlbums = albums.map((album) =>
          album.id === updateAlbum.id ? { ...album, userId: updateAlbum.userId, title: updateAlbum.title } : album
        );
        setAlbums(updatedAlbums);
        setUpdateAlbum({ id: '', userId: '', title: '' });
      }
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const handleDeleteAlbum = async () => {
    try {
      const response = await fetch(`${API_URL}/${deleteAlbumId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedAlbums = albums.filter((album) => album.id !== deleteAlbumId);
        setAlbums(updatedAlbums);
        setDeleteAlbumId('');
      }
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div className="AlbumManagementApp">
      <header className="AppHeader">
        <h1>Album Management App</h1>
      </header>
      <div className="AppContainer">
        <section className="ActionsSection">
          <h2>Update Album</h2>
          <div className="ActionItem">
            <label>ID:</label>
            <input
              type="text"
              value={updateAlbum.id}
              onChange={(e) => setUpdateAlbum({ ...updateAlbum, id: e.target.value })}
            />
          </div>
          <div className="ActionItem">
            <label>User ID:</label>
            <input
              type="text"
              value={updateAlbum.userId}
              onChange={(e) => setUpdateAlbum({ ...updateAlbum, userId: e.target.value })}
            />
          </div>
          <div className="ActionItem">
            <label>Title:</label>
            <input
              type="text"
              value={updateAlbum.title}
              onChange={(e) => setUpdateAlbum({ ...updateAlbum, title: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateAlbum} className="GreenButton">
            Update
          </button>
          <hr />
          <h2>Delete Album</h2>
          <div className="ActionItem">
            <label>ID:</label>
            <input
              type="text"
              value={deleteAlbumId}
              onChange={(e) => setDeleteAlbumId(e.target.value)}
            />
          </div>
          <button onClick={handleDeleteAlbum} className="RedButton">
            Delete
          </button>
        </section>
        <aside className="AlbumListAside">
          <h2>Album List</h2>
          <table className="AlbumTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album) => (
                <tr key={album.id}>
                  <td>{album.id}</td>
                  <td>{album.userId}</td>
                  <td>{album.title}</td>
                  <td>
                    <button
                      onClick={() => setUpdateAlbum({ id: album.id, userId: album.userId, title: album.title })}
                      className="GreenButton"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteAlbumId(album.id)}
                      className="RedButton"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </div>
    </div>
  );
}

export default AlbumManagementApp;
