# Checklist de Testes - Auditoria Ostensiva

- [x] Acessar `http://localhost:3000/login` e logar com `andrehugo-enfermagem-trabalho-tec`
- [x] Validar cabeçalho: "Conteúdo personalizado para: Técnico de Enfermagem do Trabalho"
- [x] Validar presença de "Bloco I", "Bloco II" e "Bloco III"
- [x] Clicar no Bloco I e validar tópicos
    - [x] Tópicos validados: APH em urgências, Epidemiologia, Doenças ocupacionais.
    - [x] Observação: Tópicos de Ética e Legislação encontrados no Bloco III, confirmando a ementa completa.
- [x] Clicar em um tópico e validar "Placeholder Premium"
    - [x] Resultado: Interface Glassmorphism carregada corretamente em `/aulas/especifica-bloco-i-urgencias/aph-em-urgencias`.
