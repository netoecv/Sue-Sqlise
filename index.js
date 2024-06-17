const express = require("express");
const app = express();
const port = 3500;

app.set("view engine", "ejs");

const connection = require("./database/database");
/////////TELASSS
const Disciplina = require("./database/disciplinas"); 
const Curso = require("./database/curso");
const Professor = require("./database/professor");
const Coordenador = require("./database/coordenador");
const Aluno = require("./database/aluno");
const Turma = require("./database/turma");
const Pagamento = require("./database/pagamento");
const Avaliacao = require("./database/avaliacao");
const CoordenadorCurso = require("./database/coordenadorcurso");
const CoordenadorCursoVW = require("./database/coordenadorcursoVW");
const PagamentoAluno = require("./database/pagamentoaluno");
const PagamentoAlunoVW = require("./database/pagamentoalunoVW");
const TurmaCurso = require("./database/turmacurso");
const TurmaCursoVW = require("./database/turmacursoVW");
const ProfessorDisciplina = require("./database/professordisciplina");
const ProfessorDisciplinaVW = require("./database/professordisciplinaVW");
const DisciplinaCurso = require("./database/disciplinacurso");
const DisciplinaCursoVW = require("./database/disciplinacurso.VW");
const AvaliacaoAluno = require("./database/avaliacaoaluno");
const AvaliacaoAlunoVW = require("./database/AvaliacaoAlunoVW");
//Sem rotas
const Aluno_has_Curso = require("./database/Aluno_has_Curso");
const Professor_has_Disciplina = require("./database/Professor_has_Disciplina");
const Curso_has_Disciplina = require("./database/Curso_has_Disciplina");
const Aluno_has_Turma = require("./database/Aluno_has_Turma");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para listar disciplinas
app.get("/disciplinas", (req, res) => {
  Disciplina.findAll({
    raw: true, 
    order: [["id_disciplina", "DESC"]], 
  }).then((disciplinas) => {
    res.render("cad_disciplinas", {
      disciplinas: disciplinas,
    });
  });
});

app.post("/editar_disciplina", async (req, res) => {
  const { nome_disciplina, carga_horaria, descricao_disciplina, action } =
    req.body; 
  if (action === "incluir") {
    try {
      await Disciplina.create({
        nome_disciplina,
        carga_horaria,
        descricao_disciplina,
      });
      res.status(201).redirect("/disciplinas");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA A DISCIPLINA: /editardisciplina",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA A DISCIPLINA. /editardisciplina",
      });
    }
  }

  if (action === "alterar") {
    try {
      const {
        nome_disciplina,
        carga_horaria,
        descricao_disciplina,
        id_disciplina,
      } = req.body; 
      const id = id_disciplina;

      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({
          error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
        });
      }

      disciplina.nome_disciplina = nome_disciplina;
      disciplina.carga_horaria = carga_horaria;
      disciplina.descricao_disciplina = descricao_disciplina;
      await disciplina.save(); // Salva as alterações

      res.status(201).redirect("/disciplinas");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA A DISCIPLINA: /editardisciplina ${nome_disciplina}`,
        error
      );
      res.status(500).json({
        error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editardisciplina ${nome_disciplina}`,
      });
    }
  }
});

app.post("/excluir_disciplina/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    const disciplina = await Disciplina.findByPk(id); 
    if (!disciplina) {
      return res.status(404).json({ error: "Disciplina não encontrada." });
    }

    await Disciplina.destroy({
      where: {
        id_disciplina: id,
      },
    });

    res.redirect("/disciplinas");
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de disciplina." });
  }
});
////////////////////CURSOOOOO////////////////////////

app.get("/curso", (req, res) => {
  Curso.findAll({
    raw: true, 
    order: [["id_Curso", "DESC"]], 
  }).then((curso) => {
    res.render("cad_curso", {
      curso: curso,
    });
  });
});

app.post("/editar_curso", async (req, res) => {
  const { nome_curso, duracao, valor,nome_coordenador,id_Coordenador, action } = 
  req.body; 

  if (action === "incluir") {
    try {
      await Curso.create({
        nome_curso,
        nome_coordenador,
        duracao,
        valor,
        id_Coordenador,
      });
      res.status(201).redirect("/curso");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA O CURSO: /editarcurso",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA O CURSO. /editarcurso",
      });
    }
  }

  if (action === "alterar") {
    try {
      const {
        nome_curso,
        nome_coordenador,
        duracao,
        valor,
        id_Curso,
        id_Coordenador,
      } = req.body; 
      const id = id_Curso;

      const curso = await Curso.findByPk(id);
      if (!curso) {
        return res.status(404).json({
          error: `Curso NÃO FOI encontrado - NA TABELA DE CURSOS - ID: ${id}.`,
        });
      }
      curso.nome_curso = nome_curso;
      curso.duracao = duracao;
      curso.valor = valor;
      curso.nome_coordenador = nome_coordenador;
      curso.id_Coordenador = id_Coordenador;
      await curso.save(); 

      res.status(201).redirect("/curso");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA O CURSO: /editarcurso ${nome_curso}`,
        error
      );
      res.status(500).json({
        error: `Erro ao ALTERAR dados PARA O CURSO. /editarcurso ${nome_curso}`,
      });
    }
  }
});


app.post("/excluir_curso/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    const curso = await Curso.findByPk(id); 

    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado." });
    }

    await Curso.destroy({
      where: {
        id_Curso: id,
      },
    });

    res.redirect("/curso");
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de curso." });
  }
});




///////////////////////COORDENADORR///////////
app.get("/coordenador", (req, res) => {
  Coordenador.findAll({
    raw: true,
    order: [
      ["id_Coordenador", "DESC"]],
  }).then((coordenador) => {
    res.render("cad_coordenadores", {
      coordenador: coordenador,
    });
  });
});


app.post("/editar_coordenador", async (req, res) => {
  const { nome_coordenador,email,action } = req.body;
  
  if (action === "incluir") {
    try {
      await Coordenador.create({
        nome_coordenador,
        email,
      });
      res.status(201).redirect("/coordenador");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA A Curso: /editarcurso",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA A DISCIPLINA. /editarcurso",
      });
    }
  }
  if (action === "alterar") {
    try {
      const {
        nome_coordenador,
        email,
        id_Coordenador,
      } = req.body;
      const id = id_Coordenador;
      const coordenador = await Coordenador.findByPk(id);
      if (!coordenador) {
        return res.status(404).json({
          error: `Curso NÃO FOI encontrada - NA TABELA DE Curso - ID: ${id_Coordenador}.`,
        });
      }
      coordenador.nome_coordenador = nome_coordenador;
      coordenador.email= email;
     
      await coordenador.save();
      res.status(201).redirect("/coordenador");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA O CURSO: /editarcurso ${nome}`,
        error
      );
      res.status(500).json({
        error: `Erro ao ALTERAR dados PARA O CURSO. /editarcurso ${nome}`,
      });
    }
  }
});



app.post("/excluir_coordenador/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const coordenador = await Coordenador.findByPk(id);
    
    if (!coordenador) {
      return res.status(404).json({ error: "Curso não encontrado." });
    }
    await Coordenador.destroy({
      where: {
        id_Coordenador: id,
      },
    });
    res.redirect("/Coordenador");
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de curso." });
  }
}); 



//////////ALUNOOO

app.get("/aluno", (req, res) => {
  Aluno.findAll({
    raw: true,
    order: [["id_Aluno", "DESC"]],
  }).then((aluno) => {
    res.render("cad_aluno", {
      aluno: aluno,
    });
  });
});

app.post("/editar_aluno", async (req, res) => {
  const { nome_aluno, Num_Matricula , Estado_Matricula, action } =
    req.body;
  
  if (action === "incluir") {
    try {
   
      await Aluno.create({
        nome_aluno,
        Num_Matricula,
        Estado_Matricula,

      });
      res.status(201).redirect("/aluno");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA A ALUNO: /editaraluno",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA ALUNO. /editaraluno",
      });
    }
  }
  if (action === "alterar") {
    try {
      const {
        nome_aluno,
        Num_Matricula,
        Estado_Matricula,  
        id_Aluno
      } = req.body;
      const id = id_Aluno;
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(404).json({
          error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
        });
      }
      aluno.nome_aluno = nome_aluno;
      aluno.Num_Matricula = Num_Matricula;
      aluno.Estado_Matricula = Estado_Matricula;
      await aluno.save();
  
      res.status(201).redirect("/Aluno");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA A DISCIPLINA: /editaraluno ${nome}`,
        error
      );
      res.status(500).json({
        error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editaraluno ${nome}`,
      });
    }
  }
});

app.post("/excluir_aluno/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const aluno = await Aluno.findByPk(id);
    
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrada." });
    } 

    await Aluno.destroy({
      where: {
        id_Aluno: id,
      },
    });
    res.redirect("/Aluno");
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de disciplina." });
  }
}); 
////////////////////////TURMAAAAAAAAA


app.get("/turma", (req, res) => {
  Turma.findAll({
    raw: true,
    order: [
      ["id_Turma", "DESC"]],
  }).then((turma) => {
    res.render("cad_turma", {
      turma: turma,
    });
  });
});


app.post("/editar_turma", async (req, res) => {
  const { ano, nome_turma, semestre , action } = 
  req.body;
  

  if (action === "incluir") {
    try {
      await Turma.create({
        ano,
        semestre,
        nome_turma
      });
     
      res.status(201).redirect("/turma");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA A DISCIPLINA: /editar_turma",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA A DISCIPLINA. /editar_turma",
      });
    }
  }
 
  if (action === "alterar") {
    try {
      const {
        ano,
        semestre,
        nome_turma,
        id_Turma,
      } = req.body;
      const id = id_Turma;
     
      const turma = await Turma.findByPk(id);
      if (!turma) {
        return res.status(404).json({
          error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id_Turma}.`,
        });
      }
      turma.ano = nome_turma;
      turma.ano = ano;
      turma.semestre = semestre;
      await turma.save();
     
      res.status(201).redirect("/Turma");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA A DISCIPLINA: /editaraluno ${ano}`,
        error
      );
      res.status(500).json({
        error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editaraluno ${semestre}`,
      });
    }
  }
});


app.post("/excluir_turma/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const turma = await Turma.findByPk(id);
    if (!turma) {
      return res.status(404).json({ error: "Aluno não encontrada." });
    }
    await Turma.destroy({
      where: {
        id_Turma: id,
      },
    });
    res.redirect("/turma");
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de disciplina." });
  }
}); 



////////////////////////PROFESSORRRRR


app.get("/professor", (req, res) => {
 Professor.findAll({
    raw: true,
    order: [
      ["id_professor", "DESC"]],
  }).then((Professor) => {
    res.render("cad_professor", {
      Professor: Professor,
    });
  });
});

app.post("/editar_professor", async (req, res) => {
  const { nome_professor ,especialidade,action } =
    req.body;

  if (action === "incluir") {
    try {
      
      await Professor.create({
        nome_professor,
        especialidade,
      });
      res.status(201).redirect("/professor");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA A DISCIPLINA: /editar_turma",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA A DISCIPLINA. /editar_turma",
      });
    }
  }
  if (action === "alterar") {
    try {
      const {
        nome_professor,
        especialidade,
        id_professor,
      } = req.body;
      const id = id_professor;
      const professor = await Professor.findByPk(id);
      if (!professor) {
        return res.status(404).json({
          error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id_professor}.`,
        });
      }
      professor.nome_professor = nome_professor;
      professor.especialidade= especialidade;
      professor.id_professor = id_professor;
      await professor.save();
     
      res.status(201).redirect("/professor");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA A DISCIPLINA: /editaraluno ${nome}`,
        error
      );
    
    }
  }
});


app.post("/excluir_professor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ error: "Aluno não encontrada." });
    }
    await Professor.destroy({
      where: {
        id_professor: id,
      },
    });
    res.redirect("/professor");
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de disciplina." });
  }
}); 


////////////////////////PAGAMENTO


app.get("/pagamento", (req, res) => {
  Pagamento.findAll({
    raw: true, 
    order: [["id_Pagamento", "DESC"]], 
  }).then((pagamento) => {
    res.render("cad_pagamento", {
      pagamento: pagamento,
    });
  });
});

app.post("/editar_pagamento", async (req, res) => {
  const { nome_pagamento, valor, data, taxa,desconto,Valor_Total, action } =
    req.body; 
 
    
  if (action === "incluir") {
    try {
      const id = req.params.id;
      await Pagamento.create({
        nome_pagamento,
        valor,
         data,
          taxa,
          desconto,
          Valor_Total,
      });
      res.status(201).redirect("/pagamento");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA A DISCIPLINA: /editardisciplina",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA A DISCIPLINA. /editardisciplina",
      });
    }
  }

  if (action === "alterar") {
    try {
      const {
        nome_pagamento,
        valor,
         data,
          taxa,
          desconto,
          Valor_Total,
          id_Pagamento,
      } = req.body;
      const id = id_Pagamento;

      const pagamento = await Pagamento.findByPk(id);
      if (!pagamento) {
        return res.status(404).json({
          error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
        });
      }
      pagamento.nome_pagamento = nome_pagamento;
      pagamento.valor = valor;
      pagamento.data = data;
      pagamento.taxa =taxa;
      pagamento.desconto = desconto;
      pagamento.Valor_Total = Valor_Total;
      await pagamento.save();
      

      res.status(201).redirect("/pagamento");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA pagamento: /editardisciplina ${valor}`,
        error
      );
      res.status(500).json({
        error: `Erro ao ALTERAR dados PARA pagamento. /editardisciplina ${valor}`,
      });
    }
  }
});

app.post("/excluir_pagamento/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    const pagamento = await Pagamento.findByPk(id); 

    if (!pagamento) {
      return res.status(404).json({ error: "Disciplina não encontrada." });
    }

    await Pagamento.destroy({
      where: {
        id_Pagamento: id,
      },
    });

    res.redirect("/pagamento");
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de disciplina." });
  }
});

//////////////AVALIACAAAAO

app.get("/avaliacao", (req, res) => {
  Avaliacao.findAll({
     raw: true,
     order: [
       ["id_Avaliacao", "DESC"]],
   }).then((avaliacao) => {
     res.render("cad_avaliacao", {
       avaliacao: avaliacao,
     });
   });
 });
 
 app.post("/editar_avaliacao", async (req, res) => {
   const { nome_avaliacao, valor,data,action } =
     req.body;
 
   if (action === "incluir") {
     try {
       
       await Avaliacao.create({
        nome_avaliacao,
         valor,
         data,
       });
       res.status(201).redirect("/avaliacao");
     } catch (error) {
       console.error(
         "Erro ao inserir dados PARA Avaliacao: /editar_avaliacao",
         error
       );
       res.status(500).json({
         error: "Erro ao inserir dados PARA Avaliacao. /editar_avaliacao",
       });
     }
   }
   if (action === "alterar") {
     try {
       const {
        nome_avaliacao,
         valor,
         data,
         id_Avaliacao,
       } = req.body;
       const id = id_Avaliacao;
       const avaliacao = await Avaliacao.findByPk(id);
       if (!avaliacao) {
         return res.status(404).json({
           error: `Avaliacao NÃO FOI encontrada - NA TABELA DE Avaliacoes - ID: ${id_Avaliacao}.`,
         });
       }
       avaliacao.nome_avaliacao;
       avaliacao.valor = valor;
       avaliacao.data = data;
       await avaliacao.save();
      
       res.status(201).redirect("/avaliacao");
     } catch (error) {
       console.error(
         `Erro ao ALTERAR dados PARA Avaliacao.`,
         error
       );
     
     }
   }
 });
 
 

 app.post("/excluir_avaliacao/:id", async (req, res) => {
   try {
     const id = req.params.id;
     const avaliacao = await Avaliacao.findByPk(id);
     if (!avaliacao) {
       return res.status(404).json({ error: "Alvaliacao não encontrada." });
     }
     await Avaliacao.destroy({
       where: {
         id_Avaliacao: id,
       },
     });
     res.redirect("/avaliacao");
   } catch (error) {
     console.error("Erro ao excluir dados:", error);
     res
       .status(500)
       .json({ error: "Erro ao excluir dados da tabela de disciplina." });
   }
 }); 
 ///////////RELACIONAMENTOS
 ////Coordenador - Curso

 app.get("/coordenadorcurso", async (req, res) => {
  try {
    const curso = await Curso.findAll();
    const coordenador = await Coordenador.findAll();
    const coordenadorcurso = await CoordenadorCurso.findAll();
    const coordenadorcursoVW = await CoordenadorCursoVW.findAll();
    res.render("cad_coordcurso.ejs", {
      coordenadorcurso,
      coordenador,
      curso,
      coordenadorcursoVW,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de Coordenador e cursos:", error);
    res.status(500).send("Erro ao buscar associações de Coordenador e cursos.");
  }
});

// Rota para inserir ou editar uma associação entre disciplina e curso
app.post("/editar_coordenadorcurso", async (req, res) => {
  try {
    const { coordenador, curso, action } = req.body;

    if (action === "incluir") {
      await CoordenadorCurso.create({
        id_Coordenador: coordenador,
        id_Curso: curso,
      });
      res.redirect("/coordenadorcurso");
    } 
    
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre Coordenador e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre Coordenador e curso.");
  }
});

app.post("/excluir_coordenadorcurso/:id_Coordenador/:id_Curso", async (req, res) => {
  try {
    const id_Coordenador = req.params.id_Coordenador;
    const id_Curso = req.params.id_Curso;
    await CoordenadorCurso.destroy({ where: { id_Coordenador: id_Coordenador, id_Curso: id_Curso } });
    res.redirect("/coordenadorcurso");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre disciplina e curso:",
      error
    );
    res 
      .status(500)
      .send("Erro ao excluir associação entre disciplina e curso.");
  }
});
 

////////////PAGAMENTO - ALUNO 

app.get("/pagamentoaluno", async (req, res) => {
  try {PagamentoAluno
    const pagamento = await Pagamento.findAll();
    const aluno = await Aluno.findAll();
    const pagamentoaluno = await PagamentoAluno.findAll();
    const pagamentoalunoVW = await PagamentoAlunoVW.findAll();

    res.render("cad_pagamentoaluno.ejs", {
      pagamento,
      aluno,
      pagamentoaluno,
      pagamentoalunoVW,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de aluno e pagamento:", error);
    res.status(500).send("Erro ao buscar associações de alunos e pagamento.");
  }
});

app.post("/editar_pagamentoaluno", async (req, res) => {
  try {
    const { pagamento,aluno, action } = req.body;

    if (action === "incluir") {
      await PagamentoAluno.create({
       id_Pagamento: pagamento, 
       id_Aluno: aluno,
      });
      res.redirect("/pagamentoaluno");
    }
    
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre alunos e pagamento:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre alunos e pagamento.");
  }
});

app.post("/excluir_pagamentoaluno/:id_Aluno/:id_Pagamento", async (req, res) => {
  try {
    const id_Pagamento = req.params.id_Pagamento;
    const id_Aluno = req.params.id_Aluno;
    await PagamentoAluno.destroy({ 
      where: { id_Pagamento: id_Pagamento, id_Aluno: id_Aluno }
     });
    res.redirect("/pagamentoaluno");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre aluno e pagamento:",
      error
    );
    res 
      .status(500)
      .send("Erro ao excluir associação entre aluno e pagamento.");
  }
  
});



//TURMA CURSO////

  
app.get("/turmacurso", async (req, res) => {
  try {
    const turma = await Turma.findAll();
    const curso = await Curso.findAll();
    const turmacurso = await TurmaCurso.findAll();
    const turmacursoVW = await TurmaCursoVW.findAll();
    res.render("cad_turmacurso.ejs", {
      turmacurso,
      turma,
      curso,
      turmacursoVW,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de curso e turma:", error);
    res.status(500).send("Erro ao buscar associações de turma e curso.");
  }
});

app.post("/editar_turmacurso", async (req, res) => {
  try {
    const { turma, curso, action } = req.body;
    if (action === "incluir") {
      await TurmaCurso.create({
        id_Turma: turma,
        id_Curso: curso,
      });
      res.redirect("/turmacurso");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre turma  e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre  turma e curso.");
  }
});

app.post("/excluir_turmacurso/:id_Turma/:id_Curso",
   async (req, res) => {
  try {
    const id_Turma = req.params.id_Turma;
    const id_Curso = req.params.id_Curso;
    await TurmaCurso.destroy({ 
      where: { id_Turma: id_Turma,id_Curso: id_Curso },
    });
    res.redirect("/turmacurso");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre Turma e Curso:",
      error
    );
    res 
      .status(500)
      .send("Erro ao excluir associação entre Turma e Curso.");
  }
});

///////////PROFESSOR DISCIPLINA


app.get("/professordisciplina", async (req, res) => {
  try {
    const professor = await Professor.findAll();
    const disciplinas = await Disciplina.findAll();
    const professordisciplina = await ProfessorDisciplina.findAll();
    const professordisciplinaVW = await ProfessorDisciplinaVW.findAll();
    res.render("cad_professordisciplina.ejs", {
      professordisciplina,
      professor,
      disciplinas,
      professordisciplinaVW,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de disciplinas e professor:", error);
    res.status(500).send("Erro ao buscar associações de disciplinas e professor.");
  }
});
app.post("/editar_professordisciplina", async (req, res) => {
  try {
    const { professor, disciplina, action } = req.body;

    if (action === "incluir") {
      await ProfessorDisciplina.create({
        id_professor: professor,
        id_disciplina: disciplina,
      });

      res.redirect("/professordisciplina");
    } else {
      // Trate outras ações, se necessário
    }
  } catch (error) {
    console.error("Erro ao inserir ou editar associação entre disciplina e professor:", error);
    res.status(500).send("Erro ao inserir ou editar associação entre disciplina e professor.");
  }
});
app.post("/excluir_professordisciplina/:id_professor/:id_disciplina",
  async (req, res) => {
    try {
       const id_professor = req.params.id_professor;
       const id_disciplina = req.params.id_disciplina;
      await ProfessorDisciplina.destroy({ where: {id_professor: id_professor, id_disciplina: id_disciplina }});
      res.redirect("/professordisciplina");
    } catch (error) {
      console.error(
        "Erro ao excluir associação entre disciplina e professor:",
        error
      );
      res
        .status(500)
        .send("Erro ao excluir associação entre disciplina e professor.");
    }
  }
);

//////DISCIPLINA - CURSO
app.get("/disciplinacurso", async (req, res) => {
  try {
    const curso = await Curso.findAll();
    const disciplinas = await Disciplina.findAll();
    const disciplinacurso = await DisciplinaCurso.findAll();
    const disciplinacursoVW = await DisciplinaCursoVW.findAll();
    res.render("cad_disciplinacurso.ejs", {
      disciplinacurso,
      curso,
      disciplinas,
      disciplinacursoVW,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de disciplinas e cursos:", error);
    res.status(500).send("Erro ao buscar associações de disciplinas e cursos.");
  }
});

app.post("/editar_disciplinacurso", async (req, res) => {
  try {
    const { curso, disciplina, action } = req.body;

    if (action === "incluir") {
      await DisciplinaCurso.create({
        id_Curso: curso,
        id_disciplina: disciplina,
      });
      res.redirect("/disciplinacurso");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre disciplina e curso.");
  }
});

app.post(
  "/excluir_disciplinacurso/:id_Curso/:id_disciplina",
  async (req, res) => {
    try {
      const id_Curso = req.params.id_Curso;
      const id_disciplina = req.params.id_disciplina;
      await DisciplinaCurso.destroy({
        where: { id_Curso: id_Curso, id_disciplina: id_disciplina },
      });
      res.redirect("/disciplinacurso");
    } catch (error) {
      console.error(
        "Erro ao excluir associação entre disciplina e curso:",
        error
      );
      res
        .status(500)
        .send("Erro ao excluir associação entre disciplina e curso.");
    }
  }
);   

////////////AVALIACAO - ALUNO 

app.get("/avaliacaoaluno", async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findAll();
    const aluno = await Aluno.findAll();
    const avaliacaoaluno = await AvaliacaoAluno.findAll();
    const avaliacaoalunoVW = await AvaliacaoAlunoVW.findAll();

    res.render("cad_avaliacaoaluno", {
      avaliacao,
      aluno,
      avaliacaoaluno,
      avaliacaoalunoVW,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de avaliação e aluno:", error);
    res.status(500).send("Erro ao buscar associações de avaliação e aluno.");
  }
});

app.post("/editar_avaliacaoaluno", async (req, res) => {
  try {
    const { avaliacao,aluno, action } = req.body;

    if (action === "incluir") {
      await AvaliacaoAluno.create({
        id_Avaliacao: avaliacao,
        id_Aluno: aluno,
     
      });
      res.redirect("/avaliacaoaluno");
    } 
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre alunos e avaliação:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre alunos e avaliação.");
  }
});

app.post("/excluir_avaliacaoaluno/:id_Avaliacao/:id_Aluno", async (req, res) => {
  try {
    const id_Avaliacao = req.params.id_Avaliacao;
    const id_Aluno = req.params.id_Aluno;
    await AvaliacaoAluno.destroy({ where: { id_Avaliacao: id_Avaliacao, id_Aluno: id_Aluno } });
    res.redirect("/avaliacaoaluno");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre aluno e avaliacao:",
      error
    );
    res 
      .status(500)
      .send("Erro ao excluir associação entre aluno e avaliacao.");
  }
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  });

