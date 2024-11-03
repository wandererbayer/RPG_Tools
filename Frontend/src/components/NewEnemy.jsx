export default function NewEnemy() {
    return (
        <>
            <div className="enemyBox">
                <div className="titulo">
                    <h1>Enemy</h1>
                </div>
                <form className="formNewPlayer flex flex-col w-52">
                    <label htmlFor="name">Name:</label><br />
                    <input type="text" id="name" placeholder=" Name" /><br />
                    <label htmlFor="armorClass">Amor Class:</label><br />
                    <input type="number" id="armorClass" placeholder=" AC" /><br />
                    <label htmlFor="hitPoints">Hit Points:</label><br />
                    <input type="number" id="hitPoints" placeholder=" HP" /><br />
                    <label htmlFor="xp">XP:</label><br />
                    <input type="number" id="xp" placeholder=" XP" /><br />
                    <br />
                    <button type="submit" className="btn">Add Player</button>
                </form>
            </div>
        </>
    )
}