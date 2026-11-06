Funcionalidades Principais

 Arquitetura e Segurança (Local-First)

Este projeto foi desenhado sob o paradigma Local-First, visando proteger os dados sensíveis de saúde dos pacientes (em conformidade com as diretrizes da LGPD) mantendo as informações fisicamente no computador da clínica.

Concorrência e Estabilidade: O banco de dados SQLite opera com Write-Ahead Logging (WAL) ativado. Isso garante que múltiplos smartphones da clínica possam ler e atualizar a agenda simultaneamente no Wi-Fi sem gerar corrupção de arquivos ou bloqueios (database is locked).

Graceful Shutdown: Interceptação de sinais do sistema operacional para garantir o encerramento seguro de todas as conexões antes que o aplicativo seja fechado, evitando perda de dados voláteis.

Backup Recomendado: Como os dados residem no arquivo server/data/database.sqlite, recomenda-se apontar um serviço de nuvem (Google Drive/OneDrive) exclusivamente para esta pasta, criando uma redundância contra falhas de hardware do computador local.

 Instalação e Execução

O projeto foi empacotado para exigir o mínimo de conhecimento técnico por parte dos usuários finais (clínicas).

1. Clonar e Configurar


# Configure as variáveis de ambiente
cp .env.example .env


Abra o arquivo .env para personalizar o nome da clínica, horários e a porta do servidor.

2. Iniciar o Sistema (Modo Produção)

O aplicativo compila o front-end e serve a API simultaneamente em um único processo. Escolha o seu sistema operacional:

chmod +x iniciar.sh
./iniciar.sh


3. Acessar na Rede Wi-Fi

Para que os computadores e smartphones da recepção acessem o painel:

Descubra o IP local do computador "Servidor" (ex: 192.168.1.15).

Conecte o dispositivo móvel à mesma rede Wi-Fi.

Acesse via navegador: http://192.168.1.15:3001 (substitua pela porta definida no .env).
