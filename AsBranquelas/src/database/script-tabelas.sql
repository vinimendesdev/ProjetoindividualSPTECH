-- Execute este script no MySQL Workbench antes de rodar o site.

CREATE DATABASE IF NOT EXISTS as_branquelas;
USE as_branquelas;

CREATE TABLE IF NOT EXISTS usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	senha VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS questao (
	id INT PRIMARY KEY AUTO_INCREMENT,
	enunciado VARCHAR(200) NOT NULL,
	alternativa_a VARCHAR(200) NOT NULL,
	alternativa_b VARCHAR(200) NOT NULL,
	alternativa_c VARCHAR(200) NOT NULL,
	alternativa_d VARCHAR(200) NOT NULL,
	resposta CHAR(1) NOT NULL,
	CONSTRAINT chk_correta CHECK (resposta IN ('A', 'B', 'C', 'D'))
);

CREATE TABLE IF NOT EXISTS tentativa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT NOT NULL,
	acertos INT NOT NULL,
	erros INT NOT NULL,
	momento DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS resposta (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_tentativa INT NOT NULL,
	fk_questao INT NOT NULL,
	alternativa_escolhida CHAR(1) NOT NULL,
	acertou TINYINT(1) NOT NULL,
	FOREIGN KEY (fk_tentativa) REFERENCES tentativa(id),
	FOREIGN KEY (fk_questao) REFERENCES questao(id),
	CONSTRAINT chk_escolhida CHECK (alternativa_escolhida IN ('A', 'B', 'C', 'D'))
);

-- Questões de exemplo (as mesmas do simulador.html; você pode trocar pelas perguntas do filme depois)
INSERT INTO questao (enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, resposta) VALUES
('Qual mês tem 30 dias?', 'Janeiro', 'Dezembro', 'Junho', 'Agosto', 'C'),
('Quantas horas tem em um dia?', '30 horas', '38 horas', '48 horas', '24 horas', 'D'),
('Qual destes números é ímpar?', 'Dez', 'Doze', 'Oito', 'Onze', 'D');
