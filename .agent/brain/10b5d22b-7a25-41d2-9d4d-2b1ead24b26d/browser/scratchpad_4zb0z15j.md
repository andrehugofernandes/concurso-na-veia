# Plano de Investigação - BairroAutocomplete

## Checklist

- [x] Navegar para http://localhost:3000/pmavv
- [x] Realizar login (se necessário) - Já estava logado
- [x] Ir para 'Nova Denúncia'
- [x] Preencher Passo 1 e clicar em 'Prosseguir'
- [x] Localizar 'Selecione um bairro...'
- [x] Capturar logs iniciais
- [x] Clicar no combobox
- [x] Esperar 2 segundos
- [x] Capturar logs finais
- [x] Verificar DOM (PopoverContent/CommandItem)
- [x] Tirar screenshot
- [x] Analisar e reportar descobertas

## Descobertas

- **Logs do Console**: Confirmam que o estado interno muda para `open: true` e que `filteredBairros` tem 3 itens.
- **DOM**: Os nomes dos bairros ("Centro", "Regional 1 - Benfica", etc.) aparecem no final do DOM, sugerindo que o Portal está funcionando, mas os elementos não têm coordenadas (x,y) atribuídas pelo navegador na área visível.
- **UI**: O screenshot mostra que nada é renderizado visualmente abaixo do combobox.
- **Conclusão**: O componente está "abrindo" e "renderizando" os dados, mas eles não estão visíveis. Provável problema de `z-index` (ficando atrás do modal) ou de posicionamento (Coordenadas 0,0 ou fora da viewport).

## Notas

- Credenciais: andre.hugo / Mvvas@18261405
- Focar em logs do prefixo `[BairroAutocomplete]`
