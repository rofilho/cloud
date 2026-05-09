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
    linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%),
    url('assets/hero.png');
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
  background: rgba(59,130,246,0.3);
  border: 1px solid #3b82f6;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #93c5fd;
  margin-bottom: 12px;
}
.hero h1 { font-size: 38px; margin: 0 0 10px; line-height: 1.1; color: white; }
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
}
.btn-primary { background: #3b82f6; color: white; }
.btn-primary:hover { background: #2563eb; transform: scale(1.05); }

/* ── Linhas de cards (módulos) ── */
.row-wrapper { margin-bottom: 2.5rem; }
.row-title   { font-size: 20px; font-weight: 700; margin-bottom: 15px; margin-left: 5px; opacity: 0.9; }
.row {
  display: flex;
  gap: 16px;
  padding: 10px 5px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.row::-webkit-scrollbar { display: none; }

/* ── Cards de aulas ── */
.card {
  flex: 0 0 calc(100% / 4 - 15px);
  min-width: 220px;
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
.card:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }

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
  background: linear-gradient(135deg, rgba(59,130,246,0.2) 0%, transparent 100%);
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
  .card { flex: 0 0 calc(50% - 15px); }
  .hero { padding: 1.5rem; height: 300px; }
  .hero h1 { font-size: 28px; }
}
@media (max-width: 480px) { .card { flex: 0 0 85%; } }
</style>

<div class="dashboard-container">

<!-- HERO — edite o link e o texto da última aula acessada -->
<div class="hero">
  <div style="position: relative; z-index: 10;">
    <span class="tag">▶ Continue Assistindo</span>
    <h1>TÍTULO DA ÚLTIMA AULA</h1>
    <p>Descrição curta do que o aluno vai aprender nesta aula.</p>
    <a href="./Aula-01---Titulo-da-Aula" class="btn btn-primary" data-spa>Retomar Aula</a>
  </div>
</div>

<!-- MÓDULO 1 -->
<div class="row-wrapper">
  <div class="row-title">Módulo 1: NOME DO MÓDULO</div>
  <div class="row">

    <a href="./Aula-01---Ementa-e-Objetivos" class="card" data-spa>
      <div class="card-thumb">📋<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">Ementa e Objetivos</div>
        <div class="card-meta"><span>Aula 01</span><span>✅ Concluído</span></div>
      </div>
    </a>

    <a href="./Aula-02---Titulo" class="card" data-spa>
      <div class="card-thumb">🎓<div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">Nome da Aula 02</div>
        <div class="card-meta"><span>Aula 02</span><span>✅ Concluído</span></div>
      </div>
    </a>

    <!-- Copie o bloco <a> acima para cada nova aula -->

  </div>
</div>

<!-- MÓDULO 2 — copie e cole o bloco .row-wrapper completo -->
<div class="row-wrapper">
  <div class="row-title">Módulo 2: NOME DO MÓDULO</div>
  <div class="row">

    <a href="./Aula-03---Titulo" class="card" data-spa>
      <div class="card-thumb">🛠️<div class="card-progress-bar"><div class="card-progress" style="width: 50%"></div></div></div>
      <div class="card-content">
        <div class="card-title">Nome da Aula 03</div>
        <div class="card-meta"><span>Aula 03</span><span>⏳ Em Andamento</span></div>
      </div>
    </a>

  </div>
</div>

</div>
