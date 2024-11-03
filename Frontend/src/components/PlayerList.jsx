import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PlayerList() {
    const [dados, setDados] = useState([]);

    // Função para buscar os dados dos jogadores
    async function getPlayers() {
        try {
            const response = await axios.get('http://localhost:3000/selectall');
            if (Array.isArray(response.data)) {
                setDados(response.data);
            } else {
                console.error("Os dados recebidos não são uma lista:", response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados dos jogadores:', error);
        }
    }

    // useEffect para chamar a função getPlayers ao montar o componente
    useEffect(() => {
        getPlayers();
    }, []);

    return (
        <>
            <div className="playerList">
                <ul>
                    {dados.length > 0 ? (
                        dados.map((player) => (
                            <li key={player.id}>
                                {`ID: ${player.id_player}, 
                                Nome: ${player.nome_player}, 
                                Classe: ${player.classe_player}, 
                                Level: ${player.level_player}, 
                                AC: ${player.ac_player}, 
                                HP: ${player.hp_player}, 
                                XP: ${player.xp_player}`}
                            </li>
                        ))
                    ) : (
                        <li>Nenhum jogador encontrado.</li>
                    )}
                </ul>
            </div>
        </>
    );
}
