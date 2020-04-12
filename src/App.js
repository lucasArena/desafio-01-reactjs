import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    setRepositories(oldRepositories => [...oldRepositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const filteredRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(filteredRepositories);
  }

  useEffect(() => {
    async function loadRepositories() {
      const { data } = await api.get('/repositories');
      setRepositories(data);
    }

    loadRepositories();
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <div key={repository.id}>
            <li>{repository.title}</li>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
        ))}       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
