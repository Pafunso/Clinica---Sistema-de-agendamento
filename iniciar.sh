#!/usr/bin/env bash
# Inicia o sistema de agendamento (Linux e Mac).
# Primeira vez: se o arquivo não abrir com duplo clique, rode no terminal:  chmod +x iniciar.sh

cd "$(dirname "$0")" || exit 1

esperar() {
  echo
  read -r -p "  Pressione Enter para fechar..." _
}

if ! command -v node >/dev/null 2>&1; then
  echo
  echo "  O Node.js não está instalado neste computador."
  echo "  1. Abra https://nodejs.org e baixe a versão \"LTS\"."
  echo "  2. Instale e depois abra este arquivo novamente."
  esperar
  exit 1
fi

# Confere a versão, cria o .env, instala o que faltar e compila o front-end.
if ! node scripts/preparar.mjs; then
  echo
  echo "  Não foi possível preparar o sistema. Leia a mensagem acima."
  esperar
  exit 1
fi

# Inicia o sistema (fica rodando nesta janela).
node server/index.js
codigo=$?

echo
echo "  O sistema foi encerrado."
echo "  Para usar novamente, abra o iniciar.sh."
esperar
exit "$codigo"
