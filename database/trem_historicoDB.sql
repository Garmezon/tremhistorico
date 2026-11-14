drop database if exists trem_historico;
create database trem_historico; 
use trem_historico;

-- =========================================
    -- CRIAÇÃO DAS TABELAS
 -- =========================================

CREATE TABLE usuario (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    nome           VARCHAR(100) NOT NULL,
    cpf            CHAR(11)     NOT NULL UNIQUE,
    email          VARCHAR(100) NOT NULL UNIQUE,
    numero_celular VARCHAR(15),
    senha          VARCHAR(255) NOT NULL
);

CREATE TABLE maquinario (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    modelo     VARCHAR(100) NOT NULL
);

CREATE TABLE vagao (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    quantidade_assentos INT NOT NULL
);

CREATE TABLE estacao(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome varchar(50) NOT NULL
);

CREATE TABLE rota(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_entrada INT NOT NULL,
    id_saida INT NOT NULL,
  	FOREIGN KEY (id_saida) REFERENCES estacao(id),
    FOREIGN KEY (id_entrada) REFERENCES estacao(id)
);

CREATE TABLE trem (
    id INT AUTO_INCREMENT  PRIMARY KEY,
   	nome varchar(30) NOT NULL,
    url varchar(255) NOT NULL
);

CREATE TABLE trem_vagao(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_vagao INT NOT NULL,
    id_trem INT NOT NULL,
    FOREIGN KEY (id_vagao) REFERENCES vagao(id),
    FOREIGN KEY (id_trem) REFERENCES trem(id)
);

CREATE TABLE trem_maquinario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_maquinario INT NOT NULL,
    id_trem INT NOT NULL,
    FOREIGN KEY (id_maquinario) REFERENCES maquinario(id),
    FOREIGN KEY (id_trem) REFERENCES trem(id)
);



CREATE TABLE viagem (
    id         INT AUTO_INCREMENT PRIMARY KEY,
	id_rota INT NOT NULL,	
    data_time  DATETIME     NOT NULL,
    valor      DECIMAL(10,2) NOT NULL,
    id_trem    INT NOT NULL,
    FOREIGN KEY (id_rota) REFERENCES rota(id)
);

CREATE TABLE viagem_usuario (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario  INT NOT NULL UNIQUE,
    id_viagem   INT NOT NULL
);

-- =========================================
-- CHAVES ESTRANGEIRAS
-- =========================================

ALTER TABLE viagem
    ADD CONSTRAINT fk_viagem_trem
    FOREIGN KEY (id_trem) REFERENCES trem(id);

ALTER TABLE viagem_usuario
    ADD CONSTRAINT fk_vu_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    ADD CONSTRAINT fk_vu_viagem
    FOREIGN KEY (id_viagem) REFERENCES viagem(id);

ALTER TABLE usuario ADD CONSTRAINT chk_tamanho_cpf CHECK (LENGTH(cpf) = 11);

ALTER TABLE usuario
ADD CONSTRAINT chk_tamanho_celular CHECK (LENGTH(numero_celular) = 11);



CREATE VIEW trem_informacoes AS(
SELECT trem.id, trem.nome, sum(v.quantidade_assentos) as quantidade_pessoas FROM trem 
inner join trem_maquinario as tm
on tm.id_trem = trem.id
inner join trem_vagao as tv
on tv.id_trem = trem.id
inner join vagao as v
on v.id = tv.id_vagao
GROUP BY trem.id
);



