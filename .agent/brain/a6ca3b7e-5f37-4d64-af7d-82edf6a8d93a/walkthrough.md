# Walkthrough: Otimização das Músicas do Suno AI

## Resumo das Alterações

Atendendo à necessidade de ter áudios mais curtos (em torno de 1 minuto em vez de quase 3 minutos), refatoramos todo o sistema de geração de músicas para a disciplina de Português - Interpretação de Texto.

### Mudanças no PROMPT_MUSICA_SUNO.md (Template Pai)

- **Estrutura Reduzida:** Modificada de `Intro → Verse 1 → Pre-Chorus → Chorus → Verse 2 → Chorus → Bridge → Chorus → Outro` para **`Intro → Verse → Pre-Chorus → Chorus → Outro`**.
- **Novo Ponto Ótimo de Tempo:** Alterado de 2:00 a 3:00 para 0:45 a 1:15 minutos.
- **Ajuste de Prompts:** Incluímos as marcações `"versão curta"` e `"fast paced"` como injetores padrão no Metaprompt do Suno para forçar uma geração musical curta.

### Mudanças nos Arquivos Individuais (Módulo 1 ao 10)

Aplicamos a nova estrutura simplificada nos seguintes arquivos:

- `musica-modulo-nº1.md`
- `musica-modulo-nº2.md`
- `musica-modulo-nº3.md`
- `musica-modulo-nº4.md`
- `musica-modulo-nº5.md`
- `musica-modulo-nº6.md`
- `musica-modulo-nº7.md`
- `musica-modulo-nº8.md`
- `musica-modulo-nº9.md`
- `musica-modulo-nº10.md`

Em todos eles:

1. Validamos cada arquivo individual removendo blocos textuais secundários.
2. Atualizamos seus cabeçalhos `ESTRUTURA`.
3. Adicionamos a recomendação de tempo otimizado no bloco `PROMPT ADICIONAL SUNO`.
4. Asseguramos que em nenhum arquivo sobrou a presença de "[Verse 2]" com as ferramentas de busca de texto.

## Verificação

✔️ A validação com busca regex provou que não há instâncias residuais de `[Verse 2]`, `[Bridge]` repetitivos ou refrões dobrados que estendiam indevidamente as antigas músicas.

## Próximo Passo

Recomendamos gerar uma nova track no serviço Suno usando os parâmetros de um desses arquivos recém-editados para conferir na prática o resultado alcançado com as restrições adicionadas de tempo.
