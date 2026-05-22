---
title: "☁️ Cloud Computing"
cssclasses:
  - dashboard-layout
---

<style>
/* ── Oculta elementos padrão do Quartz nesta página ── */
.sidebar, .page-header, .article-title, .content-meta, footer,
.lesson-nav { display: none !important; }

/* ── Reset total de largura ── */
html, body, #quartz-root, #quartz-body, .page, .center, .center-content, article {
  display: block !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
}

/* ── Container principal ── */
.dashboard-container {
  font-family: 'Outfit', sans-serif;
  background-color: #0f172a;
  color: #f1f5f9;
  padding: 2rem 5%;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
}
:root[saved-theme="light"] .dashboard-container {
  background-color: #f8fafc;
  color: #1e293b;
}

/* ── Hero banner ── */
.hero {
  position: relative;
  height: 350px;
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
  background-image:
    linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 40%, transparent 100%),
    url('assets/cloud_hero.png');
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  margin-bottom: 3rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  overflow: hidden;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
}
.hero h1 { font-size: 38px; margin: 0 0 10px; line-height: 1.1; color: white !important; -webkit-text-fill-color: white !important; }
.hero p  { font-size: 15px; color: #cbd5e1; max-width: 500px; margin-bottom: 20px; }
.btn {
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  background: white;
  color: #0f172a;
}
.btn:hover { background: #f1f5f9; transform: scale(1.05); }

/* ── Linhas de cards (módulos) ── */
.row-wrapper { margin-bottom: 2.5rem; }
.row-title   { font-size: 20px; font-weight: 700; margin-bottom: 15px; margin-left: 5px; opacity: 0.9; }
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 10px 5px;
}

/* ── Cards de aulas ── */
.card {
  flex: 0 0 calc(25% - 12px);
  min-width: 200px;
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255,255,255,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
:root[saved-theme="light"] .card { background: #f1f5f9; border-color: #e2e8f0; }
.card:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 15px 30px rgba(0,0,0,0.15); border-color: #3b82f6; }

.card-thumb {
  height: 120px;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  position: relative;
  overflow: hidden;
}
:root[saved-theme="light"] .card-thumb { background: #e2e8f0; }
.card-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, transparent 100%);
}
.card-progress-bar { position: absolute; bottom: 0; left: 0; height: 4px; background: rgba(0,0,0,0.2); width: 100%; }
.card-progress      { height: 100%; background: #3b82f6; }

.card-content { padding: 15px; flex: 1; display: flex; flex-direction: column; }
.card-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #f1f5f9;
}
:root[saved-theme="light"] .card-title { color: #1e293b; }
.card-meta { font-size: 11px; color: #64748b; margin-top: auto; display: flex; justify-content: space-between; }

/* ── Responsivo ── */
@media (max-width: 768px) {
  .card { flex: 0 0 calc(50% - 8px); }
  .hero { padding: 1.5rem; height: 300px; }
  .hero h1 { font-size: 28px; }
}
@media (max-width: 480px) { .card { flex: 0 0 100%; } }
</style>

<div class="dashboard-container">

<div class="hero">
  <div style="position: relative; z-index: 10;">
    <span class="tag">▶ Aula de Hoje</span>
    <h1>🌐 VPC e Redes na Nuvem</h1>
    <p>Aula 13t teórica: Entenda a anatomia de redes virtuais, CIDR, subnets públicas e privadas, gateways e firewalls encadeados.</p>
    <a href="./Aula-13t---Teorica---VPC-e-Redes-na-Nuvem" class="btn" data-spa>Acessar Aula Teórica</a>
  </div>
</div>

<div class="row-wrapper">
  <div class="row-title">Módulo 1: Fundamentos de Nuvem</div>
  <div class="row">
    <a href="./Aula-01---Fundamentos-de-Cloud" class="card" data-spa>
      <div class="card-thumb">☁️<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">☁️ Aula 01 – Fundamentos de Cloud</div>
        <div class="card-meta"><span>Acessar Aula</span><span>✅ Concluído</span></div>
      </div>
    </a>
    <a href="./Aula-02---Introducao-a-Computacao-em-Nuvem" class="card" data-spa>
      <div class="card-thumb">🌐<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🌐 Aula 02 – Introdução a Computação em Nuvem</div>
        <div class="card-meta"><span>Acessar Aula</span><span>✅ Concluído</span></div>
      </div>
    </a>
    <a href="./Aula-03-e-04---Introducao-a-AWS-Academy" class="card" data-spa>
      <div class="card-thumb">🎓<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🎓 Aula 03 e 04 – Introdução a AWS Academy</div>
        <div class="card-meta"><span>Acessar Aula</span><span>✅ Concluído</span></div>
      </div>
    </a>
    <a href="./Aula-05---Infraestrutura-Global-AWS-e-Lab-IAM" class="card" data-spa>
      <div class="card-thumb">🔐<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🔐 Aula 05 – Infraestrutura Global AWS & IAM</div>
        <div class="card-meta"><span>Acessar Aula</span><span>✅ Concluído</span></div>
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
        <div class="card-title">⚡ Aula 06 – EC2, Lambda e Serverless</div>
        <div class="card-meta"><span>Acessar Aula</span><span>✅ Concluído</span></div>
      </div>
    </a>
    <a href="./Aula-07---Pratica-de-Auto-Scaling-e-Balanceamento-de-Carga" class="card" data-spa>
      <div class="card-thumb">⚖️<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">⚖️ Aula 07 – Auto Scaling e Load Balancing</div>
        <div class="card-meta"><span>Acessar Aula</span><span>✅ Concluído</span></div>
      </div>
    </a>
    <a href="./Aula-08---Lancando-Instancias-EC2-AWS-CLI-e-Terraform" class="card" data-spa>
      <div class="card-thumb">💻<div class="card-progress-bar"><div class="card-progress" style="width: 45%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 08 – Instâncias EC2, AWS CLI e Terraform</div>
        <div class="card-meta"><span>Acessar Aula</span><span>▶ Em andamento</span></div>
      </div>
    </a>
    <a href="./Aula-09---Pratica-Auto-Scaling-e-Lambda" class="card" data-spa>
      <div class="card-thumb">🛠️<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🛠️ Aula 09 – Prática: Auto Scaling e Lambda</div>
        <div class="card-meta"><span>Acessar Aula</span><span>🆕 Novo</span></div>
      </div>
    </a>
  </div>
</div>

<div class="row-wrapper">
  <div class="row-title">Módulo 3: Bancos, Redes e CI/CD</div>
  <div class="row">
    <a href="./Aula-10---Banco-de-Dados-na-Nuvem" class="card" data-spa>
      <div class="card-thumb">🗄️<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🗄️ Aula 10 – Bancos de Dados na Nuvem</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-11---Pratica-de-Banco-de-Dados" class="card" data-spa>
      <div class="card-thumb">💾<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💾 Aula 11 – Prática de Bancos de Dados</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-11.5---Pratica-CI-CD-e-Arquitetura-Cloud---Estudo-de-Caso" class="card" data-spa>
      <div class="card-thumb">🔄<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🔄 Aula 11.5 – CI/CD e Arquitetura Cloud (Estudo de Caso)</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-12---Terraform-na-Pratica---IaC-com-Lightsail-e-EC2" class="card" data-spa>
      <div class="card-thumb">🏗️<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🏗️ Aula 12 – Terraform: IaC com Lightsail e EC2</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-13---Seguranca-na-Nuvem" class="card" data-spa>
      <div class="card-thumb">🛡️<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🛡️ Aula 13 – Segurança na Nuvem</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-13---Pratica---VPC-Completa-e-Isolamento-de-Banco-de-Dados-com-Terraform" class="card" data-spa>
      <div class="card-thumb">🔬<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🔬 Aula 13p – Prática: VPC, RDS e Terraform</div>
        <div class="card-meta"><span>Acessar Aula</span><span>✅ Concluído</span></div>
      </div>
    </a>
    <a href="./Aula-13t---Teorica---VPC-e-Redes-na-Nuvem" class="card" data-spa>
      <div class="card-thumb">🌐<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🌐 Aula 13t – Teórica: VPC e Redes na Nuvem</div>
        <div class="card-meta"><span>Acessar Aula</span><span>🆕 Novo</span></div>
      </div>
    </a>
    <a href="./Aula-14---FinOps-e-Custos" class="card" data-spa>
      <div class="card-thumb">💰<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💰 Aula 14 – FinOps e Custos</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-15---Te%C3%B3rica-Elasticidade-Alta-Disponibilidade" class="card" data-spa>
      <div class="card-thumb">⚡<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">⚡ Aula 15 – Elasticidade, ELB e Auto Scaling</div>
        <div class="card-meta"><span>Acessar Aula</span><span>🆕 Novo</span></div>
      </div>
    </a>
    <a href="./Aula-16---Projeto-Final---Deploy-de-Aplicacao-Completa-em-Nuvem" class="card" data-spa>
      <div class="card-thumb">🚀<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🚀 Aula 16 – Projeto Final: Deploy Completo</div>
        <div class="card-meta"><span>Acessar Aula</span><span>🆕 Novo</span></div>
      </div>
    </a>
  </div>
</div>

<div class="row-wrapper">
  <div class="row-title">Informações e Trabalhos Finais</div>
  <div class="row">
    <a href="./Prompts-IA-Projeto-Final" class="card" data-spa>
      <div class="card-thumb">🤖<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🤖 Prompts de IA — Projeto Final</div>
        <div class="card-meta"><span>4 Prompts</span><span>🆕 Novo</span></div>
      </div>
    </a>
    <a href="./Plano-Final-do-Semestre" class="card" data-spa>
      <div class="card-thumb">📅<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">📅 Plano Final do Semestre</div>
        <div class="card-meta"><span>Informação</span><span></span></div>
      </div>
    </a>
    <a href="./Trabalho-Final---Enunciado" class="card" data-spa>
      <div class="card-thumb">🎯<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">🎯 Trabalho Final (Enunciado)</div>
        <div class="card-meta"><span>Avaliação</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-01---Ementa-e-Objetivos" class="card" data-spa>
      <div class="card-thumb">📜<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">📜 Ementa e Objetivos</div>
        <div class="card-meta"><span>Documento</span><span></span></div>
      </div>
    </a>
    <a href="./Material-Complementar---Sana" class="card" data-spa>
      <div class="card-thumb">📚<div class="card-progress-bar"><div class="card-progress" style="width: 0%"></div></div></div>
      <div class="card-content">
        <div class="card-title">📚 Material Complementar Sana</div>
        <div class="card-meta"><span>Extra</span><span></span></div>
      </div>
    </a>
  </div>
</div>

</div>
