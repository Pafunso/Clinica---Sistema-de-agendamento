<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:0284C7,100:38BDF8&height=210&section=header&text=Cl%C3%ADnica%20SaaS&fontSize=54&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Gest%C3%A3o%20Local%20e%20Integra%C3%A7%C3%A3o%20WhatsApp&descAlignY=62&descSize=18" width="100%" alt="Banner Clínica SaaS"/>

**Sistema Web Mobile-First para Clínicas e Consultórios | 2026**

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">

</div>

---

## 1. Sobre o Projeto

Um sistema web **mobile-first** desenvolvido para pequenos negócios (como clínicas e consultórios odontológicos). O objetivo é gerenciar clientes e agendamentos rodando internamente em uma rede Wi-Fi privada, sem depender de hospedagens na nuvem ou assinaturas recorrentes.

A grande vantagem do sistema é sua **Mensageria Zero-API**: em vez de integrações pagas, ele usa os dados do paciente para gerar links dinâmicos do WhatsApp, permitindo enviar lembretes de consultas e follow-ups de confirmação com apenas um clique.

## 2. Tecnologias Utilizadas

| Camada | Tecnologia | Propósito |
|---|---|---|
| **Front-end** | React + Vite | Interface de carregamento rápido, totalmente responsiva (Mobile-First). |
| **Back-end** | Node.js + Express | Servidor local para a API REST e para servir os arquivos estáticos do Vite. |
| **Banco de Dados** | SQLite (better-sqlite3)| Armazenamento local rápido e síncrono. |
| **Integração** | WhatsApp Web/App | Disparo de lembretes utilizando links `wa.me`, sem custo de APIs oficiais. |

## 3. Arquitetura e Segurança (Local-First)

Este projeto foi desenhado sob o paradigma **Local-First**, visando proteger os dados sensíveis de saúde dos pacientes (em conformidade com as diretrizes da **LGPD**) mantendo as informações fisicamente no computador da clínica.

* **Concorrência e Estabilidade:** O banco de dados SQLite opera com ***Write-Ahead Logging*** **(WAL)** ativado. Isso garante que múltiplos smartphones da clínica possam ler e atualizar a agenda simultaneamente no Wi-Fi sem gerar corrupção de arquivos ou bloqueios (`database is locked`).
* **Graceful Shutdown:** Interceptação de sinais do sistema operacional para garantir o encerramento seguro de todas as conexões antes que o aplicativo seja fechado, evitando perda de dados voláteis.
* **Backup Recomendado:** Como os dados residem no arquivo `server/data/database.sqlite`, recomenda-se apontar um serviço de nuvem (Google Drive/OneDrive) exclusivamente para esta pasta, criando uma redundância contra falhas de hardware do computador local.

## 4. Funcionalidades Principais

- **Gestão de Pacientes (CRUD):** Cadastro completo com validação e formatação automática de números de WhatsApp. Arquivamento lógico (Soft Delete) para manter o histórico íntegro.
- **Agenda Inteligente:** Controle diário de consultas com alertas visuais para atrasos de confirmação (Follow-up de cobrança).
- **Fechamento do Dia:** Filtros automáticos e atalhos para visualizar rapidamente quais pacientes do dia seguinte ainda precisam receber mensagens.
- **Sincronização em Tempo Real (UX):** A lista recarrega automaticamente ao focar a aba do navegador, garantindo que a recepção sempre veja os dados mais recentes após retornar do app do WhatsApp.

## 5. Como Instalar e Executar

O projeto foi empacotado para exigir o mínimo de conhecimento técnico por parte dos usuários finais na clínica.

**1. Clone e configure:**

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO

# Configure as variáveis de ambiente
cp .env.example .env
```
> *Abra o arquivo `.env` para personalizar o nome da clínica, horários e a porta do servidor.*

**2. Inicie o Sistema (Modo Produção):**

O aplicativo compila o front-end e serve a API simultaneamente em um único processo.

*No Windows:*
```cmd
.\iniciar.bat
```

*No Linux/macOS/Termux:*
```bash
chmod +x iniciar.sh
./iniciar.sh
```

**3. Acesse na Rede Wi-Fi:**

1. Descubra o IP local do computador "Servidor" (ex: `192.168.1.15`).
2. Conecte o dispositivo móvel à **mesma rede Wi-Fi**.
3. Acesse via navegador no celular: `http://192.168.1.15:3001` *(substitua pela porta definida no `.env`)*.

---

<div align="center">

**Desenvolvido para revolucionar o atendimento local — 2026**

</div>
