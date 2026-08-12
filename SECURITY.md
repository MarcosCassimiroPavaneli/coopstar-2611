# Política de Segurança — Coopstar Express

Como parte de nossa infraestrutura e práticas de DevSecOps, mantemos rígidos controles de segurança e privacidade de dados.

## 🛡️ Gestão de Segredos e Variáveis de Ambiente

1. **Sem Segredos Hardcoded no Código:** 
   Nenhuma chave de API, senha, token de autenticação ou credencial deve ser gravada diretamente nos arquivos de código-fonte (`.ts`, `.tsx`, `.js`).

2. **Uso de `.env` Local (Ignorado no Git):** 
   Todas as chaves e variáveis devem ser lidas exclusivamente de variáveis de ambiente (`import.meta.env.*`).
   O arquivo `.env` é estritamente ignorado pelo `.gitignore` e **nunca** deve ser commitado para o repositório público ou privado no GitHub.

3. **Configuração em Produção (Vercel):** 
   Em produção, as variáveis de ambiente são injetadas de forma segura através do painel de controle da Vercel em **Settings > Environment Variables**.

---

## 🔒 Regras do .gitignore

O repositório possui regras estritas para bloquear o versionamento acidental de:
- Arquivos de ambiente (`.env`, `.env.local`, `.env.*`)
- Chaves criptográficas e certificados (`*.pem`, `*.key`, `*.p12`)
- Credenciais e arquivos de segredos (`credentials.json`, `secrets.json`)
- Dependências e logs de execução

---

## 📩 Notificação de Vulnerabilidades

Caso identifique qualquer vulnerabilidade de segurança neste projeto, por favor entre em contato com nossa equipe de infraestrutura através do e-mail oficial: `coopstar_express@hotmail.com`.
