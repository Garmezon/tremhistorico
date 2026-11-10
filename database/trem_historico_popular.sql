ALTER TABLE estacao AUTO_INCREMENT = 1;
ALTER TABLE maquinario AUTO_INCREMENT = 1;
ALTER TABLE rota AUTO_INCREMENT = 1;
ALTER TABLE trem AUTO_INCREMENT = 1;
ALTER TABLE trem_maquinario AUTO_INCREMENT = 1;
ALTER TABLE trem_vagao AUTO_INCREMENT = 1;
ALTER TABLE usuario AUTO_INCREMENT = 1;
ALTER TABLE vagao AUTO_INCREMENT = 1;
ALTER TABLE viagem AUTO_INCREMENT = 1;
ALTER TABLE viagem_usuario AUTO_INCREMENT = 1;

-- ID DE TODAS RETORNAM A 1, ISSO EH APENAS PARA EVITAR QUE O POPULAMENTO AQUI FIQUE INVALIDO POR CAUSA DE TESTES ANTERIORES NO DB.

INSERT INTO estacao (nome)
VALUES 
("CURITIBA"), 
("MARUMBI"),
("MORRETES"),
("ANTONINA");

INSERT INTO rota (id_entrada, id_saida)
VALUES 
(1,2), 
(1,3),
(2,3),
(3,4);

INSERT INTO maquinario (modelo)
VALUES
('MARIA FUMACA 310'),
('MOGUL 11');

INSERT INTO vagao (quantidade_assentos)
VALUES
(23),
(30),
(50);

INSERT INTO trem (nome)
VALUES
("composicao.ferroviariaA"),
("composicao.ferroviariaB"),
("composicao.ferroviariaC");

-- =========== INICIO TREM ============= --

INSERT INTO trem_maquinario (id_trem,id_maquinario)
VALUES 
ALTER TABLE estacao AUTO_INCREMENT = 1;
ALTER TABLE maquinario AUTO_INCREMENT = 1;
ALTER TABLE rota AUTO_INCREMENT = 1;
ALTER TABLE trem AUTO_INCREMENT = 1;
ALTER TABLE trem_maquinario AUTO_INCREMENT = 1;
ALTER TABLE trem_vagao AUTO_INCREMENT = 1;
ALTER TABLE usuario AUTO_INCREMENT = 1;
ALTER TABLE vagao AUTO_INCREMENT = 1;
ALTER TABLE viagem AUTO_INCREMENT = 1;
ALTER TABLE viagem_usuario AUTO_INCREMENT = 1;

-- ID DE TODAS RETORNAM A 1, ISSO EH APENAS PARA EVITAR QUE O POPULAMENTO AQUI FIQUE INVALIDO POR CAUSA DE TESTES ANTERIORES NO DB.

INSERT INTO estacao (nome)
VALUES 
("CURITIBA"), 
("MARUMBI"),
("MORRETES"),
("ANTONINA");

INSERT INTO rota (id_entrada, id_saida)
VALUES 
(1,2), 
(1,3),
(2,3),
(3,4);

INSERT INTO maquinario (modelo)
VALUES
('MARIA FUMACA 310'),
('MOGUL 11');

INSERT INTO vagao (quantidade_assentos)
VALUES
(23),
(30),
(50);

INSERT INTO trem (nome)
VALUES
("composicao.ferroviariaA"),
("composicao.ferroviariaB"),
("composicao.ferroviariaC");

-- =========== INICIO TREM ============= --

INSERT INTO trem_maquinario (id_trem,id_maquinario)
VALUES 
(1,2),
(2,1),
(3,1);


INSERT INTO trem_vagao (id_trem,id_vagao)
VALUES 
(1,1),
(1,1),
(1,1),
(1,1),
(1,1),

(2,1),
(2,1),
(2,2),
(2,3),
(2,3),

(3,3),
(3,3),
(3,3);

-- =========== FIM TREM ============= --

INSERT INTO viagem (data_time, id_rota, id_trem, valor)
VALUES 
('2026-11-07 07:30', 2, 1, 200.0),
('2026-11-07 10:30', 1, 2, 70),
('2026-11-14 07:30', 3, 2, 40),
('2026-11-28 09:00', 4, 3, 30),
('2026-12-19 09:30', 2, 1, 200.0);
INSERT INTO trem_vagao (id_trem,id_vagao)
VALUES 
(1,1),
(1,1),
(1,1),
(1,1),
(1,1),

(2,1),
(2,1),
(2,2),
(2,3),
(2,3),

(3,3),
(3,3),
(3,3);

-- =========== FIM TREM ============= --

INSERT INTO viagem (data_time, id_rota, id_trem, valor)
VALUES 
('2026-11-07 07:30', 2, 1, 200.0),
('2026-11-07 10:30', 1, 2, 70),
('2026-11-14 07:30', 3, 2, 40),
('2026-11-28 09:00', 4, 3, 30),
('2026-12-19 09:30', 2, 1, 200.0);
