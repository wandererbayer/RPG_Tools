CREATE DATABASE RPG_tools;
USE RPG_Tools;

CREATE TABLE Players
(
	id_player INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_player VARCHAR(60) NOT NULL,
    classe_player VARCHAR(60) NOT NULL, 
    level_player INT NOT NULL,
    ac_player INT NOT NULL,
    hp_player INT NOT NULL,
    xp_player INT NOT NULL
);

CREATE TABLE Enemy
(
	id_enemy INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_enemy VARCHAR(60) NOT NULL,
    ac_enemy INT NOT NULL,
    hp_enemy INT NOT NULL,
    xp_enemy INT NOT NULL
);

SELECT * FROM Players;
SELECT * FROM Enemy;