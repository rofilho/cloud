---
title: "☁️ Cloud Computing"
cssclasses:
  - dashboard-layout
---

<style>
/* Hide sidebars and default elements */
.sidebar, .page-header, .article-title, .content-meta, footer { display: none !important; }

/* Force absolute 100% width on ALL Quartz wrappers */
html, body, #quartz-root, #quartz-body, .page, .center, .center-content, article { 
    display: block !important; 
    max-width: 100% !important; 
    width: 100% !important; 
    margin: 0 !important; 
    padding: 0 !important; 
    overflow-x: hidden;
}

/* Dashboard container spacing */
.dashboard-container { font-family: 'Outfit', sans-serif; color: var(--light); background-color: #0f172a; padding: 2rem 5%; min-height: 100vh; margin-top: 0; box-sizing: border-box; width: 100% !important; max-width: 100% !important; overflow-x: hidden; }
:root[saved-theme="light"] .dashboard-container { background-color: #f8fafc; color: var(--dark); }


:root[saved-theme="dark"] .dashboard-container { color: var(--light); }
.hero { position: relative; height: 350px; display: flex; align-items: center; padding: 2rem 3rem; background-image: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%), url('assets/cloud_hero.png'); background-size: cover; background-position: center; border-radius: 16px; margin-bottom: 3rem; overflow: hidden; color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.tag { display: inline-block; padding: 4px 12px; background: rgba(59, 130, 246, 0.3); border: 1px solid #3b82f6; border-radius: 20px; font-size: 12px; font-weight: 600; color: #93c5fd; margin-bottom: 12px; }
.hero h1 { font-size: 38px; margin: 0 0 10px 0; line-height: 1.1; color: white; }
.hero p { font-size: 15px; color: #cbd5e1; max-width: 500px; margin-bottom: 20px; }
.btn { padding: 10px 24px; font-size: 15px; font-weight: 600; border-radius: 8px; border: none; cursor: pointer; transition: all 0.2s ease; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
.btn-primary { background: #3b82f6; color: white; }
.btn-primary:hover { background: #2563eb; transform: scale(1.05); }
.row-wrapper { margin-bottom: 2.5rem; }
.row-title { font-size: 20px; font-weight: 700; margin-bottom: 15px; margin-left: 5px; opacity: 0.9; }
.row { display: flex; flex-wrap: wrap; gap: 16px; padding: 10px 5px; }
.card { flex: 0 0 calc(25% - 12px); min-width: 200px; background: var(--lightgray); border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none; display: flex; flex-direction: column; border: 1px solid var(--gray); }
:root[saved-theme="dark"] .card { background: var(--darkgray); border-color: rgba(255,255,255,0.05); }
.card:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 15px 30px rgba(0,0,0,0.15); text-decoration: none; }
.card-thumb { height: 120px; background: #1e293b; display: flex; align-items: center; justify-content: center; font-size: 40px; position: relative; overflow: hidden; }
.card-thumb::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(59,130,246,0.2) 0%, transparent 100%); }
.card-progress-bar { position: absolute; bottom: 0; left: 0; height: 4px; background: rgba(0,0,0,0.2); width: 100%; }
.card-progress { height: 100%; background: #3b82f6; }
.card-content { padding: 15px; flex: 1; display: flex; flex-direction: column; }
.card-title { font-size: 14px; font-weight: 600; margin: 0 0 8px 0; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--dark); }
:root[saved-theme="dark"] .card-title { color: var(--light); }
.card-meta { font-size: 11px; color: var(--gray); margin-top: auto; display: flex; justify-content: space-between; }
@media (max-width: 768px) { .card { flex: 0 0 calc(50% - 8px); } .hero { padding: 1.5rem; height: 300px; } .hero h1 { font-size: 28px; } }
@media (max-width: 480px) { .card { flex: 0 0 100%; } }
</style>
<div class="dashboard-container">
<div class="hero">
<div style="position: relative; z-index: 10;">
<span class="tag">▶ Aula de Hoje</span>
<h1>VPC Completa e Isolamento de RDS com Terraform</h1>
<p>Aula 13p prática: Aprenda a criar uma VPC customizada no Console AWS e a automatizar redes e banco privado isolado usando Terraform.</p>
<a href="./Aula-13---Pratica---VPC-Completa-e-Isolamento-de-Banco-de-Dados-com-Terraform" class="btn btn-primary" data-spa>Acessar Aula Prática</a>
</div>
</div>
<div class="row-wrapper">
<div class="row-title">Módulo 1: Fundamentos de Nuvem</div>
<div class="row">
<a href="./Aula-01---Fundamentos-de-Cloud" class="card" data-spa>
<div class="card-thumb">☁️<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
<div class="card-content">
<div class="card-title">Fundamentos de Cloud</div>
<div class="card-meta"><span>Aula 01</span><span>✅ Concluído</span></div>
</div>
</a>
<a href="./Aula-02---Introducao-a-Computacao-em-Nuvem" class="card" data-spa>
<div class="card-thumb">🌐<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
<div class="card-content">
<div class="card-title">Introdução a Computação em Nuvem</div>
<div class="card-meta"><span>Aula 02</span><span>✅ Concluído</span></div>
</div>
</a>
<a href="./Aula-03-e-04---Introducao-a-AWS-Academy" class="card" data-spa>
<div class="card-thumb">🎓<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
<div class="card-content">
<div class="card-title">Introdução a AWS Academy</div>
<div class="card-meta"><span>Aula 03 e 04</span><span>✅ Concluído</span></div>
</div>
</a>
<a href="./Aula-05---Infraestrutura-Global-AWS-e-Lab-IAM" class="card" data-spa>
<div class="card-thumb">🔐<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
<div class="card-content">
<div class="card-title">Infraestrutura Global AWS & IAM</div>
<div class="card-meta"><span>Aula 05</span><span>✅ Concluído</span></div>
</div>
</a>
</div>
</div>
<div class="row-wrapper">
<div class="row-title">Módulo 2: Arquitetura e EC2</div>
<div class="row">
<a href="./Aula-06---Computacao-em-Nuvem-EC2-Lambda-e-Serverless" class="card" data-spa>
<div class="card-thumb">⚡<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
<div class="card-content">
<div class="card-title">EC2, Lambda e Serverless</div>
<div class="card-meta"><span>Aula 06</span><span>✅ Concluído</span></div>
</div>
</a>
<a href="./Aula-07---Pratica-de-Auto-Scaling-e-Balanceamento-de-Carga" class="card" data-spa>
<div class="card-thumb">⚖️<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
<div class="card-content">
<div class="card-title">Auto Scaling e Load Balancing</div>
<div class="card-meta"><span>Aula 07</span><span>✅ Concluído</span></div>
</div>
</a>
<a href="./Aula-08---Lancando-Instancias-EC2-AWS-CLI-e-Terraform" class="card" data-spa>
<div class="card-thumb">💻<div class="card-progress-bar"><div class="card-progress" style="width: 45%"></div></div></div>
<div class="card-content">
<div class="card-title">Instâncias EC2, AWS CLI e Terraform</div>
<div class="card-meta"><span>Aula 08</span><span>▶ Em andamento</span></div>
</div>
</a>
<a href="./Aula-09---Pratica-Auto-Scaling-e-Lambda" class="card" data-spa>
<div class="card-thumb">🛠️<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
<div class="card-content">
<div class="card-title">Prática: Auto Scaling e Lambda</div>
<div class="card-meta"><span>Aula 09</span><span>Novo</span></div>
</div>
</a>
<a href="./Aula-12---Terraform-na-Pratica---IaC-com-Lightsail-e-EC2" class="card" data-spa>
<div class="card-thumb">🏗️<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
<div class="card-content">
<div class="card-title">Terraform: IaC com Lightsail e EC2</div>
<div class="card-meta"><span>Aula 12</span></div>
</div>
</a>
</div>
</div>
<div class="row-wrapper">
<div class="row-title">Módulo 3: Bancos, Redes e CI/CD</div>
<div class="row">
<a href="./Aula-10---Banco-de-Dados-na-Nuvem" class="card" data-spa>
<div class="card-thumb">🗄️</div>
<div class="card-content">
<div class="card-title">Bancos de Dados na Nuvem</div>
<div class="card-meta"><span>Aula 10</span></div>
</div>
</a>
<a href="./Aula-11---Pratica-de-Banco-de-Dados" class="card" data-spa>
<div class="card-thumb">💾</div>
<div class="card-content">
<div class="card-title">Prática de Bancos de Dados</div>
<div class="card-meta"><span>Aula 11</span></div>
</div>
</a>
<a href="./Aula-11.5---Pratica-CI-CD-e-Arquitetura-Cloud---Estudo-de-Caso" class="card" data-spa>
<div class="card-thumb">🔄</div>
<div class="card-content">
<div class="card-title">CI/CD e Arquitetura Cloud (Caso)</div>
<div class="card-meta"><span>Aula 11.5</span></div>
</div>
</a>
<a href="./Aula-13---Seguranca-na-Nuvem" class="card" data-spa>
<div class="card-thumb">🛡️</div>
<div class="card-content">
<div class="card-title">Segurança na Nuvem</div>
<div class="card-meta"><span>Aula 13</span></div>
</div>
</a>
<a href="./Aula-13---Pratica---VPC-Completa-e-Isolamento-de-Banco-de-Dados-com-Terraform" class="card" data-spa>
<div class="card-thumb" style="background: linear-gradient(135deg, #0f172a, #1e293b);">🔬<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
<div class="card-content">
<div class="card-title">Prática: VPC, RDS e Terraform</div>
<div class="card-meta"><span>Aula 13p</span><span>🆕 Novo</span></div>
</div>
</a>
<a href="./Aula-14---FinOps-e-Custos" class="card" data-spa>
<div class="card-thumb">💰</div>
<div class="card-content">
<div class="card-title">FinOps e Custos</div>
<div class="card-meta"><span>Aula 14</span></div>
</div>
</a>
<a href="./Aula-15---Te%C3%B3rica-Elasticidade-Alta-Disponibilidade" class="card" data-spa>
<div class="card-thumb">⚡</div>
<div class="card-content">
<div class="card-title">Elasticidade, ELB e Auto Scaling</div>
<div class="card-meta"><span>Aula 15</span><span>🆕 Novo</span></div>
</div>
</a>
<a href="./Aula-16---Projeto-Final---Deploy-de-Aplicacao-Completa-em-Nuvem" class="card" data-spa>
<div class="card-thumb" style="background: linear-gradient(135deg, #1e3a5f, #0f172a);">🚀<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
<div class="card-content">
<div class="card-title">Projeto Final: Deploy Completo</div>
<div class="card-meta"><span>Aula 16</span><span>🆕 Novo</span></div>
</div>
</a>
</div>
</div>
<div class="row-wrapper">
<div class="row-title">Informações e Trabalhos Finais</div>
<div class="row">
<a href="./Prompts-IA-Projeto-Final" class="card" data-spa>
<div class="card-thumb" style="background: linear-gradient(135deg, #1a1a2e, #16213e);">🤖<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
<div class="card-content">
<div class="card-title">Prompts de IA — Projeto Final</div>
<div class="card-meta"><span>4 Prompts</span><span>🆕 Novo</span></div>
</div>
</a>
<a href="./Plano-Final-do-Semestre" class="card" data-spa>
<div class="card-thumb" style="background: #0f172a;">📅</div>
<div class="card-content">
<div class="card-title">Plano Final do Semestre</div>
<div class="card-meta"><span>Informação</span></div>
</div>
</a>
<a href="./Trabalho-Final---Enunciado" class="card" data-spa>
<div class="card-thumb" style="background: #0f172a;">🎯</div>
<div class="card-content">
<div class="card-title">Trabalho Final (Enunciado)</div>
<div class="card-meta"><span>Avaliação</span></div>
</div>
</a>
<a href="./Aula-01---Ementa-e-Objetivos" class="card" data-spa>
<div class="card-thumb" style="background: #0f172a;">📜</div>
<div class="card-content">
<div class="card-title">Ementa e Objetivos</div>
<div class="card-meta"><span>Documento</span></div>
</div>
</a>
<a href="./Material-Complementar---Sana" class="card" data-spa>
<div class="card-thumb" style="background: #0f172a;">📚</div>
<div class="card-content">
<div class="card-title">Material Complementar Sana</div>
<div class="card-meta"><span>Extra</span></div>
</div>
</a>
</div>
</div>
</div>
