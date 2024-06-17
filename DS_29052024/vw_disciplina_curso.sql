CREATE VIEW `vw_disciplina_curso` AS
 select dc.id_curso, c.nome_curso, dc.id_disciplina, d.nome_disciplina from
	curso as c, disciplina as d, disciplina_curso as dc
    where c.id_curso = dc.id_curso and d.id_disciplina = dc.id_disciplina;