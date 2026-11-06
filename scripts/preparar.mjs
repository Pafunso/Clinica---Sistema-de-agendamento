// Prepara o sistema para iniciar (chamado pelo iniciar.bat / iniciar.sh):
//   1. confere a versão do Node.js
//   2. cria o arquivo .env, se ainda não existir
//   3. instala o servidor (só se faltar)
//   4. compila o front-end (só se faltar ou se algum arquivo do front-end for mais novo que a compilação)
// Para forçar uma nova compilação: node scripts/preparar.mjs --reconstruir
import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SERVIDOR = join(RAIZ, 'server');
const WEB = join(RAIZ, 'web');
const reconstruir = process.argv.includes('--reconstruir');

const passo = (texto) => console.log(`  - ${texto}`);
function falhar(texto) {
  console.error(`\n  ERRO: ${texto}\n`);
  process.exit(1);
}

function rodar(comando, pasta) {
  execSync(comando, { cwd: pasta, stdio: 'inherit' });
}

// Data de modificação mais recente de um arquivo ou de tudo que há dentro de uma pasta.
// Salvar para modificações futuras: se algum arquivo for modificado, a data de modificação da pasta também muda.
function maisRecente(caminho) {
  if (!existsSync(caminho)) return 0;
  const info = statSync(caminho);
  if (!info.isDirectory()) return info.mtimeMs;
  let maior = 0;
  for (const nome of readdirSync(caminho)) {
    if (nome === 'node_modules' || nome === 'dist') continue;
    maior = Math.max(maior, maisRecente(join(caminho, nome)));
  }
  return maior;
}

// 1. Node.js
const [maior, menor] = process.versions.node.split('.').map(Number);
if (maior < 20 || (maior === 20 && menor < 12)) {
  falhar(
    `O Node.js deste computador (${process.versions.node}) é antigo demais.\n` +
      '  Baixe a versão "LTS" em https://nodejs.org, instale e abra o sistema de novo.'
  );
}

// 2. Configurações (.env)
const env = join(RAIZ, '.env');
const exemplo = join(RAIZ, '.env.example');
if (!existsSync(env)) {
  if (!existsSync(exemplo)) falhar('Não encontrei o arquivo .env.example. A pasta do sistema está incompleta.');
  copyFileSync(exemplo, env);
  passo('Criado o arquivo .env. Abra-o com o Bloco de Notas para colocar o nome da clínica.');
}

// 3. Servidor (express e better-sqlite3)
const faltaNoServidor = ['express', 'better-sqlite3'].some(
  (pacote) => !existsSync(join(SERVIDOR, 'node_modules', pacote))
);
if (faltaNoServidor) {
  passo('Instalando o servidor (só na primeira vez; precisa de internet)...');
  try {
    rodar('npm install --omit=dev', SERVIDOR);
  } catch {
    falhar('Não foi possível instalar o servidor. Confira a internet e abra o sistema novamente.');
  }
}

// 4. Front-end
const arquivoCompilado = join(WEB, 'dist', 'index.html');
const fontes = ['src', 'public', 'index.html', 'package.json', 'vite.config.js', 'vite.config.ts'];
const maisNovaFonte = Math.max(...fontes.map((f) => maisRecente(join(WEB, f))));
const desatualizado = !existsSync(arquivoCompilado) || maisNovaFonte > statSync(arquivoCompilado).mtimeMs;

if (reconstruir || desatualizado) {
  try {
    if (!existsSync(join(WEB, 'node_modules'))) {
      passo('Instalando o front-end (só na primeira vez; precisa de internet)...');
      rodar('npm install', WEB);
    }
    passo('Compilando o front-end...');
    rodar('npm run build', WEB);
  } catch {
    if (!existsSync(arquivoCompilado)) {
      falhar('Não foi possível compilar o front-end. Leia a mensagem acima.');
    }
    console.warn('\n  Aviso: não foi possível compilar o front-end. Usando a última versão compilada.\n');
  }
}

console.log('  Tudo pronto. Iniciando o sistema...');
