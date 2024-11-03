const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin: '*'
}))

const port = 3000

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})

//POST
app.post('/insertPlayer', (req,res)=>{
    const {nome_player, classe_player, level_player, ac_player, hp_player, xp_player} = req.body

    db.query(
        `INSERT INTO Players (nome_player, classe_player, level_player, ac_player, hp_player, xp_player) VALUES (?, ?, ?, ?, ?, ?)`,
        [nome_player, classe_player, Number(level_player), Number(ac_player), Number(hp_player), Number(xp_player)],
        function(err, results, fields){
            if(err){
                console.error('Erro na inserção', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    res.send(`Jogador inserido: \n\nNome: ${nome_player} \nLevel: ${level_player} \nXP: ${xp_player}`)
})

//GET ALL
app.get('/selectall', (req, res) =>{
    db.query(
        `SELECT * FROM Players`,
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar jogadores'});
            }
            return res.json(results);
        }
    );
})

//PUT - UPDATE BY ID
app.put('/update/:id', (req, res) => {
    const { id } = req.params;  // Alteração aqui
    const { nome_player, classe_player, level_player, ac_player, hp_player, xp_player } = req.body;

    db.query(
        `UPDATE Players SET nome_player = ?, classe_player = ?, level_player = ?, ac_player = ?, hp_player = ?, xp_player = ? WHERE id_player = ?`,
        [nome_player, classe_player, Number(level_player), Number(ac_player), Number(hp_player), Number(xp_player), id],
        function(err, results, fields) {
            if (err) {
                console.error('Erro ao atualizar', err);
                return res.status(500).json({ error: 'Erro ao atualizar o jogador' });
            }
            console.log(results);
            console.log(fields);
            res.send(`Jogador atualizado: \n\nNome: ${nome_player} \nLevel: ${level_player} \nXP: ${xp_player}`);
        }
    );
});

//DELETE BY ID
app.delete('/deleteByID/:id', (req, res) =>{
    const id = req.params.id
    db.query(
        `DELETE FROM Players WHERE id_player = ?`,
        [id],
        function(err, results, fields){
            if(err){
                console.error('Erro ao excluir', err);
                return res.status(500).json({error: 'Erro ao excluir jogador'});
            }
            return res.json({message: 'Jogador excluído com sucesso', results});
        }
    );
})
