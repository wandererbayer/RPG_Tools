import { useEffect, useState } from "react"
import axios from 'axios'

export default function NewPlayers() {
    const [id, setId] = useState(0)
    const [nome, setNome] = useState("")
    const [classe, setClasse] = useState("")
    const [level, setLevel] = useState(0)
    const [armorClass, setArmorClass] = useState(0)
    const [hitPoints, setHitPoints] = useState(0)
    const [xp, setXp] = useState(0)
    const [dados, setDados] = useState([])

    useEffect(() => {
        console.log(id, nome, classe, level, armorClass, hitPoints, xp)
    }, [id, nome, classe, level, armorClass, hitPoints, xp])

    //POST
    async function novoPlayer(){
        await axios.post('http://localhost:3000/insertPlayer', {
            nome_player: nome,
            classe_player: classe,
            level_player: level,
            ac_player: armorClass,
            hp_player: hitPoints,
            xp_player: xp
        })
    }

    //PUT
    async function updatePlayer(){
        await axios.put(`http://localhost:3000/update/${id}`, {
            nome_player: nome,
            classe_player: classe,
            level_player: level,
            ac_player: armorClass,
            hp_player: hitPoints,
            xp_player: xp
        })
    }

    //GET
    async function getPlayers(){
        const response = await axios.get('http://localhost:3000/selectall')
        setDados(response.data)
    }

    //DELETE
    async function deletePlayer(){
        if(!id){
            console.log('Por favor, insira um ID para deletar')
            return
        }
        await axios.delete(`http://localhost:3000/deleteByID/${id}`)  
    }

    //REGISTRAR
    function handleSubmit(e){
        e.preventDefault()
        novoPlayer()
    }

    //ATUALIZAR
    function handleUpdate(e){
        e.preventDefault()
        updatePlayer()
    }

    //DELETAR
    function handleDelete(e){
        e.preventDefault()
        deletePlayer()
    }

    //BUSCAR
    function handleGet(e){
        e.preventDefault()
        getPlayers()
    }

    return (
        <>
            <div className="playerBox">
                <div className="titulo">
                    <h1>Player</h1>
                </div>
                <form className="formNewPlayer flex flex-col w-52">
                    <label htmlFor="id">ID:</label><br />
                    <input type="text" id="id" placeholder=" ID" value={id} onChange={(e) => setId(e.target.value)} /><br />
                    <label htmlFor="name">Name:</label><br />
                    <input type="text" id="name" placeholder=" Name" value={nome} onChange={(e) => setNome(e.target.value)} /><br />
                    <label htmlFor="class">Class:</label><br />
                    <input type="text" id="class" placeholder=" Class" value={classe} onChange={(e) => setClasse(e.target.value)} /><br />
                    <label htmlFor="level">Level:</label><br />
                    <input type="number" id="level" placeholder=" Level" value={level} onChange={(e) => setLevel(e.target.value)} /><br />
                    <label htmlFor="armorClass">Armor Class:</label><br />
                    <input type="number" id="armorClass" placeholder=" AC" value={armorClass} onChange={(e) => setArmorClass(e.target.value)} /><br />
                    <label htmlFor="hitPoints">Hit Points:</label><br />
                    <input type="number" id="hitPoints" placeholder=" HP" value={hitPoints} onChange={(e) => setHitPoints(e.target.value)} /><br />
                    <label htmlFor="xp">XP:</label><br />
                    <input type="number" id="xp" placeholder=" XP" value={xp} onChange={(e) => setXp(e.target.value)} /><br />
                    <br />
                    <button type="submit" className="btn" onClick={handleSubmit}>Add Player</button><br />
                    <button type="submit" className="btn" onClick={handleUpdate}>Update Player</button><br />
                    <button type="submit" className="btn" onClick={handleDelete}>Delete Player</button><br />
                </form>
            </div>
        </>
    )
}
