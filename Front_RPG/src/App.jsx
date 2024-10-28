import { useState } from 'react';
import './App.css';

function App() {
    const [players, setPlayers] = useState([]);
    const [form, setForm] = useState({
        name: '',
        class: '',
        level: '',
        armorClass: '',
        hitPoints: '',
        totalXp: 0,
    });
    const [enemies, setEnemies] = useState([]);
    const [formEnemy, setFormEnemy] = useState({
        name: '',
        armorClass: '',
        hitPoints: '',
        xp: '',
        quantity: 1,
    });
    const [initiativeOrder, setInitiativeOrder] = useState([]);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);
    const [hpValue, setHpValue] = useState('');
    const [totalXp, setTotalXp] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlayers([...players, { ...form, id: players.length }]);
        setForm({
            name: '',
            class: '',
            level: '',
            armorClass: '',
            hitPoints: '',
            totalXp: 0,
        });
    };

    const updateHitPoints = (id, newHp) => {
        setPlayers(
            players.map((player) =>
                player.id === id ? { ...player, hitPoints: newHp } : player
            )
        );
    };

    const handleEnemyChange = (e) => {
        const { name, value } = e.target;
        setFormEnemy({
            ...formEnemy,
            [name]: value,
        });
    };

    const handleEnemySubmit = (e) => {
        e.preventDefault();
        const newEnemies = Array.from({ length: parseInt(formEnemy.quantity) }, (_, index) => ({
            ...formEnemy,
            name: `${formEnemy.name} ${index + 1}`, // Adiciona um número ao nome do inimigo
            id: enemies.length + index,
        }));
        setEnemies([...enemies, ...newEnemies]);
        setFormEnemy({
            name: '',
            armorClass: '',
            hitPoints: '',
            xp: '',
            quantity: 1,
        });
    };

    const updateEnemyHitPoints = (id, newHp) => {
        setEnemies(
            enemies.map((enemy) =>
                enemy.id === id ? { ...enemy, hitPoints: newHp } : enemy
            )
        );
    };

    const handleAddToInitiative = (participant) => {
        setInitiativeOrder((prevOrder) => [...prevOrder, participant]);
    };

    const rollInitiative = (participant) => {
        const initiative = Math.floor(Math.random() * 20) + 1; // Simulação de um dado D20
        const updatedParticipant = { ...participant, initiative };
        handleAddToInitiative(updatedParticipant);
    };

    const sortInitiativeOrder = () => {
        const sortedOrder = [...initiativeOrder].sort((a, b) => b.initiative - a.initiative);
        setInitiativeOrder(sortedOrder);
    };

    const nextTurn = () => {
        setCurrentTurn((prevTurn) => {
            if (prevTurn + 1 < initiativeOrder.length) {
                return prevTurn + 1; // Avança para o próximo turno
            } else {
                setCurrentRound(currentRound + 1); // Avança para o próximo round
                return 0; // Reinicia o turno para o novo round
            }
        });
    };

    const handleHpChange = (e) => {
        setHpValue(e.target.value);
    };

    const healParticipant = (id, type) => {
        if (type === 'player') {
            setPlayers(
                players.map((player) =>
                    player.id === id ? { ...player, hitPoints: Math.max(0, player.hitPoints + parseInt(hpValue)) } : player
                )
            );
        } else if (type === 'enemy') {
            setEnemies(
                enemies.map((enemy) =>
                    enemy.id === id ? { ...enemy, hitPoints: Math.max(0, enemy.hitPoints + parseInt(hpValue)) } : enemy
                )
            );
        }
        setHpValue(''); // Limpa o input
    };

    const damageParticipant = (id, type) => {
        if (type === 'player') {
            setPlayers(
                players.map((player) =>
                    player.id === id ? { ...player, hitPoints: Math.max(0, player.hitPoints - parseInt(hpValue)) } : player
                )
            );
        } else if (type === 'enemy') {
            setEnemies(
                enemies.map((enemy) =>
                    enemy.id === id ? { ...enemy, hitPoints: Math.max(0, enemy.hitPoints - parseInt(hpValue)) } : enemy
                )
            );
        }
        setHpValue(''); // Limpa o input
    };

    const markEnemyAsDefeated = (enemyId) => {
        const defeatedEnemy = enemies.find((enemy) => enemy.id === enemyId);
        if (defeatedEnemy) {
            setTotalXp((prevXp) => Number(prevXp + defeatedEnemy.xp));
            setEnemies(enemies.filter((enemy) => enemy.id !== enemyId));
        }
    };

    const distributeXpToPlayers = () => {
        // Calcula o total de XP dos inimigos derrotados
        const totalXpFromEnemies = enemies.reduce((total, enemy) => {
            if (!enemy.isDefeated) return total; // Ignora inimigos não derrotados
            return total + (Number(enemy.xp) || 0); // Garante que o XP seja um número
        }, 0);
    
        // Verifica se há XP para distribuir
        if (totalXpFromEnemies === 0) {
            alert("Não há XP para distribuir.");
            return;
        }
    
        // Divide o XP total entre os jogadores
        const xpPerPlayer = Math.floor(totalXpFromEnemies / players.length);
    
        // Atualiza o XP de cada jogador
        const updatedPlayers = players.map(player => ({
            ...player,
            totalXp: player.totalXp + xpPerPlayer, // Adiciona a XP do jogador
        }));
    
        // Atualiza o estado com os jogadores modificados
        setPlayers(updatedPlayers);
    };

    const clearEnemies = () => {
        setEnemies([]); // Limpa a lista de inimigos
    };

    const clearPlayers = () => {
        setPlayers([]); // Limpa a lista de jogadores
    };

    const clearInitiativeOrder = () => {
        setInitiativeOrder([]); // Limpa a ordem de iniciativa
        setCurrentTurn(0); // Reinicia o turno
        setCurrentRound(1); // Reinicia o round
    };

    return (
        <>
            <h3>RPG TOOLS v.0.0.1</h3>
            <div className='BIG_BOX'>
                {/* Player and Enemy Small Sheets */}
                <div className='Player_Characters far-left'>
                    <h4>Players</h4>
                    {/* Formulário para adicionar novos jogadores */}
                    <form onSubmit={handleSubmit} className="player-form">
                        <input
                            type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                        <input
                            type="text" name="class" placeholder="Class" value={form.class} onChange={handleChange} required />
                        <input
                            type="number" name="level" placeholder="Level" value={form.level} onChange={handleChange} required />
                        <input
                            type="number" name="armorClass" placeholder="Armor Class" value={form.armorClass} onChange={handleChange} required />
                        <input
                            type="number" name="hitPoints" placeholder="Hit Points" value={form.hitPoints} onChange={handleChange} required />
                        <input 
                            type="number" name="totalXp" placeholder="XP" value={form.totalXp} onChange={handleChange} required />
                        <br /><br />
                        <button type="submit">Add Player</button>
                    </form>
                    <br />
                    <h4>Enemies</h4>
                    {/* Formulário para adicionar novos inimigos */}
                    <form onSubmit={handleEnemySubmit} className="enemy-form">
                        <input
                            type="text" name="name" placeholder="Name" value={formEnemy.name} onChange={handleEnemyChange} required />
                        <input
                            type="number" name="armorClass" placeholder="Armor Class" value={formEnemy.armorClass} onChange={handleEnemyChange} required />
                        <input
                            type="number" name="hitPoints" placeholder="Hit Points" value={formEnemy.hitPoints} onChange={handleEnemyChange} required />
                        <input
                            type="number" name="xp" placeholder="XP" value={formEnemy.xp} onChange={handleEnemyChange} required />
                        <input
                            type="number" name="quantity" placeholder="Quantity" value={formEnemy.quantity} onChange={handleEnemyChange} min="1" required />
                        <br /><br />
                        <button type="submit">Add Enemy</button>
                    </form>

                </div>

                {/* Players Small Sheets */}
                <div className='left'>
                    <div className="players-list">
                        <button onClick={clearPlayers}>Clear Players</button>
                        {players.map((player) => (
                            <div key={player.id} className="player-card">
                                <h4>{player.name}</h4>
                                <p>Class: {player.class}</p>
                                <p>Level: {player.level}</p>
                                <p>Armor Class: {player.armorClass}</p>
                                <p>Hit Points: {player.hitPoints}</p>
                                <p>Total XP: {player.totalXp}</p>
                                <input
                                    type="number" placeholder="Update HP" onChange={(e) => updateHitPoints(player.id, e.target.value)} />
                                <input
                                    type="number" placeholder="Heal" onChange={handleHpChange} />
                                <br />
                                <button onClick={() => healParticipant(player.id, 'player')}>Heal</button>
                                <br />
                                <input
                                    type="number" placeholder="Damage" onChange={handleHpChange} />
                                <button onClick={() => damageParticipant(player.id, 'player')}>Damage</button>
                                <button onClick={() => rollInitiative(player)}>Roll Initiative</button> {/* Botão para rolar iniciativa */}
                            </div>
                        ))}
                    </div>

                    {/* Enemies Small Sheets */}
                    <div className="enemies-list">
                        <button onClick={clearEnemies}>Clear Enemies</button>
                        {enemies.map((enemy) => (
                            <div key={enemy.id} className="enemy-card">
                                <h4>{enemy.name}</h4>
                                <p>Armor Class: {enemy.armorClass}</p>
                                <p>Hit Points: {enemy.hitPoints}</p>
                                <p>XP: {enemy.xp}</p>
                                <input
                                    type="number" placeholder="Update HP" onChange={(e) => updateEnemyHitPoints(enemy.id, e.target.value)} />
                                <input
                                    type="number" placeholder="Heal" onChange={handleHpChange} />
                                <br />
                                <button onClick={() => healParticipant(enemy.id, 'enemy')}>Heal</button>
                                <br />
                                <input
                                    type="number" placeholder="Damage" onChange={handleHpChange} />
                                <button onClick={() => damageParticipant(enemy.id, 'enemy')}>Damage</button>
                                <button onClick={() => markEnemyAsDefeated(enemy.id)}>Defeat Enemy</button>
                                <button onClick={() => rollInitiative(enemy)}>Roll Initiative</button> {/* Botão para rolar iniciativa */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Initiative Tracker and XP Distribution */}
                <div className='initiative right'>
                    <h4>Initiative Order</h4>
                    <button onClick={clearInitiativeOrder}>Clear Initiative Order</button>
                    <h4>Current Turn: {initiativeOrder[currentTurn]?.name || "None"}</h4>
                    <h4>Round: {currentRound}</h4>
                    <button onClick={sortInitiativeOrder}>Sort Initiative</button>
                    <br />
                    <div>
                        {initiativeOrder.map((participant, index) => (
                            <div key={index}>
                                <p>
                                    {participant.name} (Initiative: {participant.initiative})
                                </p>
                            </div>
                        ))}
                    </div>
                    <button onClick={nextTurn}>Next Turn</button>
                </div>

                <div className='right'>
                    <div className='xp-distribution'>
                        <h4>Distribute XP</h4>
                        <p>Total XP: {totalXp}</p>
                        <button onClick={distributeXpToPlayers}>Distribute</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
