# Fluxo simples (sem branches)

> Todo mundo vai trabalhar direto na `main` para evitar trabalho desnecessário.  
> **Risco:** mais chance de conflito. **Como evitar?** Puxar antes de começar, commits pequenos, combinar quem edita qual arquivo.

---

## Fluxo principal

1) Edite arquivos diferentes quando possível
Ex.: alguém cuida do index.html, outra pessoa do css/style.css, outra do js/game.js.

2) Commits pequenos + push frequente.
Não é bom guardar mudanças grandes por muito tempo só na sua máquina.

## Ciclo básico (sempre que for mexer)

1) Atualize sua cópia local

```bash
git pull
```
2) Veja o status

```bash
git status
```
3) Faça suas mudanças nos arquivos

4) Adicione os arquivos alterados
```bash
git add .
```
5) Faça o commit (mensagem curta e intuitiva)
```bash
git commit -m "Adicionando cronômetro básico de 60s"
```
6) Envie para o GitHub
```bash
git push
```

Pronto. Recomece o ciclo quando for editar de novo.


## Caso haja conflito (alguém alterou depois do seu git pull)

```bash
# Traga as mudanças que estão no GitHub para sua máquina
git pull
# Se não houver conflito, teste e depois:
git push
```

### Se ainda mantiver o conflito
1. Abra os arquivos marcados com ```<<<<<<<, =======, >>>>>>>.```

2. Escolha as linhas corretas (pode juntar as duas versões), remova os marcadores.

3. Salve o arquivo e rode:
```bash
git add <arquivo_que_tinha_conflito>
git commit   # conclui o merge
git push
```

## Checklist antes do push

 Executei o git pull?

 O projeto ainda abre/roda ok?

Se sim, só mandar. Quaisquer eventuais erros com o git o chat é bom em resolver também.