<script setup>
import { usePageEnv } from '../../composables/usePageEnv'

usePageEnv({
  title: 'Hoja de Ruta · De Power-User de IA a Especialista en Copilot',
  htmlClass: ['mod-especialista-copilot'],
})
</script>

<template>
  <div>
<div class="wrap">

  <!-- HERO -->
  <header class="hero">
    <span class="kicker"><span class="dot"></span>Formación oficial · Microsoft Learn · Enlaces verificados</span>
    <h1>De power-user de IA a<br><span class="grad">Especialista en Copilot &amp; Copilot Studio</span></h1>
    <p class="sub">Hoja de ruta de <strong>0 a 100</strong> con itinerarios oficiales y gratuitos de Microsoft Learn. Pensada para quien ya domina la IA conversacional (Projects, Skills, Artifacts) y quiere explotar Microsoft 365 Copilot a fondo dentro de un entorno corporativo con seguridad estricta. <strong>Cada curso enlaza directo al original verificado.</strong></p>

    <!-- BARRA DE PROGRESO -->
    <nav class="track" aria-label="Fases de la hoja de ruta">
      <a href="#f1">0 → 30<span>Consumo avanzado</span></a>
      <a href="#f2">30 → 60<span>Agentes / SharePoint</span></a>
      <a href="#f3">60 → 80<span>Orquestación</span></a>
      <a href="#f4">80 → 100<span>Maestría + Credencial</span></a>
    </nav>

    <!-- COMO USAR -->
    <div class="howto">
      <div class="item">
        <h4><span class="num">1</span>Sigue el orden</h4>
        <p>Las fases son acumulativas: cada una asume lo aprendido en la anterior. Salta solo si ya dominas la base.</p>
      </div>
      <div class="item">
        <h4><span class="num">2</span>Clica y fórmate</h4>
        <p>Cada tarjeta abre el itinerario oficial en Microsoft Learn. Son autoguiados, con módulos cortos y evaluaciones.</p>
      </div>
      <div class="item">
        <h4><span class="num">3</span>Acaba con el sello</h4>
        <p>La Fase 4 cierra con una credencial oficial gratuita de Microsoft que valida tu competencia con un examen práctico.</p>
      </div>
    </div>
  </header>

  <!-- ===== FASE 1 ===== -->
  <section class="phase" id="f1" style="--ph:var(--c1)">
    <div class="phase-head">
      <div class="lvl">NIVEL<br>0 → 30</div>
      <div class="meta">
        <h2>Fase 1 · Consumo avanzado</h2>
        <p class="obj">Dejar atrás el "Copilot solo resume correos". Dominar el grounding en tus datos de Microsoft Graph, el prompting estructurado y — clave en tu entorno — cómo Copilot respeta los límites de seguridad y cumplimiento.</p>
        <div class="replaces">Equivale a tu uso base de <b>Claude con contexto</b>, pero anclado a tus correos, archivos y reuniones reales</div>
      </div>
    </div>
    <div class="cards">
      <div class="card">
        <span class="tag">Itinerario · Fundamentos</span>
        <h3>Get started with Microsoft 365 Copilot</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Recorre los fundamentos de Copilot, su funcionamiento sobre Microsoft Graph y su uso transversal en Word, Excel, Outlook y Teams.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">Entender por qué Copilot accede a tus datos sin sacarlos del tenant, y cómo eso lo diferencia de una IA externa.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/get-started-with-microsoft-365-copilot/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
      <div class="card">
        <span class="tag">Itinerario · Prompting</span>
        <h3>Explore Microsoft 365 Copilot Chat</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Enseña a redactar prompts efectivos, usar la Prompt Gallery y explotar las funciones del chat empresarial de forma segura.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">Llevar tu disciplina de prompting de Claude a Copilot, y descubrir el catálogo de prompts oficial para no partir del folio en blanco.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/explore-microsoft-365-copilot-business-chat/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
      <div class="card">
        <span class="tag">Itinerario · Seguridad</span>
        <h3>Prepare your organization for Microsoft 365 Copilot</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Examina el diseño de Copilot, su residencia de datos, los límites de cumplimiento y cómo se protege la información sensible del negocio.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">Munición para tu rol en DSI: hablar de Copilot con criterio de gobernanza y seguridad, no solo de productividad.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/prepare-your-organization-microsoft-365-copilot/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
    </div>
  </section>

  <!-- ===== FASE 2 ===== -->
  <section class="phase" id="f2" style="--ph:var(--c2)">
    <div class="phase-head">
      <div class="lvl">NIVEL<br>30 → 60</div>
      <div class="meta">
        <h2>Fase 2 · El sustituto de Claude Projects</h2>
        <p class="obj">Crear agentes sin código anclados a repositorios cerrados de SharePoint: el equivalente directo a un Claude Project con su base de conocimiento acotada, pero sobre tus documentos corporativos y respetando permisos.</p>
        <div class="replaces">Replica <b>Claude Projects</b>: conocimiento cerrado, consultable, que no improvisa fuera de sus fuentes</div>
      </div>
    </div>
    <div class="cards">
      <div class="card">
        <span class="tag">Itinerario · MS-4019</span>
        <h3>Transform Your Everyday Business Processes with Agents</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Enseña a crear, probar, gestionar y compartir agentes sin código dentro de Copilot Chat y SharePoint, acotados a fuentes concretas.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">Montar tu "CoE Docs" o un agente departamental que responde solo desde sus documentos — tu sustituto real de Projects.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/implement-no-code-copilot-agents-microsoft-365-sharepoint/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
      <div class="card">
        <span class="tag">Itinerario · Agentes prediseñados</span>
        <h3>Enhance your productivity with prebuilt Copilot agents</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Explica cuándo usar cada agente prediseñado de Microsoft (Researcher, Analyst, etc.) para investigación, análisis, redacción e ideación.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">Saber qué agente oficial aplicar a cada tarea en lugar de reinventar la rueda — criterio para filtrar el catálogo.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/enhance-productivity-prebuilt-agents/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
    </div>
  </section>

  <!-- ===== FASE 3 ===== -->
  <section class="phase" id="f3" style="--ph:var(--c3)">
    <div class="phase-head">
      <div class="lvl">NIVEL<br>60 → 80</div>
      <div class="meta">
        <h2>Fase 3 · El orquestador operativo</h2>
        <p class="obj">Aquí superas a la IA conversacional: agentes que no solo responden, sino que <em>ejecutan</em>. Copilot Studio para construir el agente, Power Automate para que dispare acciones reales — alertas, tickets, escritura en bases de datos vía conectores.</p>
        <div class="replaces">Va más allá de Claude: de <b>responder</b> a <b>ejecutar acciones reales</b> sobre tus sistemas</div>
      </div>
    </div>
    <div class="cards">
      <div class="card">
        <span class="tag">Itinerario · Copilot Studio</span>
        <h3>Create agents in Microsoft Copilot Studio</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Construcción de agentes a medida: temas (topics), entidades y variables para el control del diálogo, más orquestación con IA generativa.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">El núcleo del rol: diseñar agentes con memoria de sesión y lógica de conversación, no solo un chat que olvida el contexto.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/create-extend-custom-copilots-microsoft-copilot-studio/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
      <div class="card">
        <span class="tag">Itinerario · Gestión</span>
        <h3>Extend and manage Copilot Studio agents</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Mejora y administración de agentes: permisos, entornos, importación/exportación y extracción de datos de texto no estructurado.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">Llevar un agente de "juguete" a algo gestionable y promocionable entre entornos — nivel profesional, no prototipo.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/power-virtual-agents-enhance/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
      <div class="card">
        <span class="tag">Itinerario · Práctica guiada</span>
        <h3>Create agents with Copilot Studio · Workshop</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Laboratorio práctico (Copilot Studio in a Day) construyendo un agente real conectado a Power Automate paso a paso.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">Horas de teclado real: el salto de "entender" a "saber hacerlo". Imprescindible antes de la credencial.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/power-virtual-agents-workshop/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
      <div class="card">
        <span class="tag">Itinerario · Power Automate</span>
        <h3>Automate a business process using Power Automate</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Construcción y administración de flujos: aprobaciones, gestión de información y flujos que cruzan múltiples orígenes de datos.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">La capa de ejecución que convierte un agente en un orquestador: que actúe, no solo que conteste.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/automate-process-power-automate/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
      <div class="card">
        <span class="tag">Itinerario · Conectores avanzados</span>
        <h3>Build and optimize cloud flows in Power Automate</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Expresiones, manejo de errores, troubleshooting y — clave — el conector HTTP para integrar APIs externas de forma segura.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">El conector HTTP es tu puente a sistemas externos (bases de datos, tickets, APIs de terceros) desde el flujo. Aquí está el "ejecutar acciones reales".</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/build-optimize-cloud-flows-power-automate/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
    </div>
  </section>

  <!-- ===== FASE 4 ===== -->
  <section class="phase" id="f4" style="--ph:var(--c4)">
    <div class="phase-head">
      <div class="lvl">NIVEL<br>80 → 100</div>
      <div class="meta">
        <h2>Fase 4 · Maestría y credencial oficial</h2>
        <p class="obj">Cerrar el círculo: gobernar el ciclo de vida de los agentes a escala de organización y validar todo lo aprendido con una credencial oficial de Microsoft, gratuita y reconocible.</p>
        <div class="replaces">El sello que convierte "sé usarlo" en <b>competencia certificada por Microsoft</b></div>
      </div>
    </div>
    <div class="cards">
      <div class="card">
        <span class="tag">Itinerario · Gobernanza</span>
        <h3>Explore Microsoft 365 Copilot and Agent Administration</h3>
        <div class="row"><span class="lab">Qué hace</span><p>Arquitectura, licenciamiento, control de acceso, gobernanza de prompts y monitorización del ciclo de vida completo de los agentes.</p></div>
        <div class="row"><span class="lab">Qué ganas</span><p class="win">La visión de plataforma que tu rol en DSI necesita: no solo construir agentes, sino administrarlos y gobernarlos para toda la empresa.</p></div>
        <a class="btn" href="https://learn.microsoft.com/en-us/training/paths/explore-microsoft-365-copilot-agent-administration/" target="_blank" rel="noopener">Abrir curso<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
      </div>
    </div>

    <!-- CREDENCIAL -->
    <div class="capstone">
      <span class="tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a4 4 0 100-8 4 4 0 000 8z"/><path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5"/></svg>Meta final · Credencial oficial gratuita</span>
      <h3>Microsoft Applied Skills: Create agents in Microsoft Copilot Studio</h3>
      <p>La validación oficial de Microsoft de que sabes crear agentes con Copilot Studio. No es un test de memoria: es un <strong>laboratorio interactivo</strong> donde construyes de verdad, y se evalúa tu desempeño real.</p>
      <div class="facts">
        <span>· Gratuita</span>
        <span>· Examen práctico en lab real</span>
        <span>· Requiere Copilot Studio + Teams + Power Platform</span>
        <span>· Reintentos a partir de 72 h</span>
      </div>
      <a class="btn" href="https://learn.microsoft.com/en-us/credentials/applied-skills/create-agents-in-microsoft-copilot-studio/" target="_blank" rel="noopener">Ir a la credencial oficial<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>
    </div>
  </section>

  <!-- NOTAS -->
  <section class="notes">
    <h2>Antes de empezar</h2>
    <div class="grid">
      <div class="note">
        <h4>Ponlo en español</h4>
        <p>Los enlaces apuntan a la versión <code>en-us</code> (la que está siempre disponible). En cada página, arriba a la derecha, puedes cambiar el idioma a Español; o cambia <code>en-us</code> por <code>es-es</code> en la barra de direcciones. No todos los módulos están traducidos al 100%.</p>
      </div>
      <div class="note">
        <h4>Necesitas un entorno con licencia</h4>
        <p>Las fases 3 y 4 (Copilot Studio + Power Automate) requieren un usuario con licencia para los laboratorios. Tú ya tienes M365 Copilot; para Copilot Studio confirma con tu admin si tienes acceso al entorno de Power Platform.</p>
      </div>
      <div class="note">
        <h4>Ritmo realista</h4>
        <p>Es material autoguiado de módulos cortos: encaja en ratos sueltos durante la jornada. Fases 1–2 son de pocas horas cada una; las 3–4 piden más práctica. No hay prisa: el orden importa más que la velocidad.</p>
      </div>
    </div>
  </section>

  <footer>
    <div class="line"></div>
    HOJA DE RUTA · MICROSOFT LEARN · ENLACES OFICIALES VERIFICADOS<br>
    De power-user de IA a especialista en Copilot &amp; Copilot Studio
  </footer>

</div>
  </div>
</template>

<style>

  html.mod-especialista-copilot{
    --bg:#0b0e14;
    --bg-soft:#11151f;
    --surface:#161b27;
    --surface-2:#1b2230;
    --border:#252d3d;
    --border-bright:#33405a;
    --text:#e4e8f1;
    --text-dim:#9aa6bd;
    --text-faint:#6b7891;
    /* rampa de progresión: frío (inicio) -> cálido (maestría) */
    --c1:#38bdf8; /* cian */
    --c2:#818cf8; /* índigo */
    --c3:#c084fc; /* violeta */
    --c4:#fbbf24; /* dorado/logro */
    --radius:14px;
    --radius-sm:10px;
    --maxw:1080px;
    font-synthesis:none;
  }
  html.mod-especialista-copilot *{box-sizing:border-box;margin:0;padding:0}
  html.mod-especialista-copilot{scroll-behavior:smooth}
  html.mod-especialista-copilot body{
    background:var(--bg);
    color:var(--text);
    font-family:'IBM Plex Sans',system-ui,sans-serif;
    line-height:1.6;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  /* halo de fondo sutil */
  html.mod-especialista-copilot body::before{
    content:"";
    position:fixed;inset:0;z-index:-1;
    background:
      radial-gradient(900px 500px at 12% -5%, rgba(56,189,248,.10), transparent 60%),
      radial-gradient(800px 600px at 100% 5%, rgba(192,132,252,.08), transparent 55%);
    pointer-events:none;
  }
  html.mod-especialista-copilot .wrap{max-width:var(--maxw);margin:0 auto;padding:0 22px}
  html.mod-especialista-copilot a{color:inherit;text-decoration:none}

  /* ---------- HERO ---------- */
  html.mod-especialista-copilot header.hero{padding:64px 0 30px}
  html.mod-especialista-copilot .kicker{
    display:inline-flex;align-items:center;gap:9px;
    font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:2.5px;
    text-transform:uppercase;color:var(--text-faint);
    border:1px solid var(--border);border-radius:100px;padding:6px 14px;margin-bottom:24px;
  }
  html.mod-especialista-copilot .kicker .dot{width:6px;height:6px;border-radius:50%;background:var(--c1);box-shadow:0 0 10px var(--c1)}
  html.mod-especialista-copilot h1{
    font-family:'Space Grotesk',sans-serif;font-weight:700;
    font-size:clamp(30px,5.2vw,52px);line-height:1.05;letter-spacing:-.02em;
    margin-bottom:18px;
  }
  html.mod-especialista-copilot h1 .grad{
    background:linear-gradient(100deg,var(--c1),var(--c2) 40%,var(--c3) 70%,var(--c4));
    -webkit-background-clip:text;background-clip:text;color:transparent;
  }
  html.mod-especialista-copilot .sub{font-size:clamp(15px,2vw,18px);color:var(--text-dim);max-width:680px}
  html.mod-especialista-copilot .sub strong{color:var(--text);font-weight:600}

  /* ---------- BARRA DE PROGRESO (elemento distintivo) ---------- */
  html.mod-especialista-copilot .track{
    display:flex;align-items:stretch;gap:0;margin:44px 0 6px;
    border:1px solid var(--border);border-radius:100px;padding:6px;
    background:linear-gradient(90deg,rgba(56,189,248,.06),rgba(251,191,36,.06));
    overflow:hidden;
  }
  html.mod-especialista-copilot .track a{
    flex:1;text-align:center;padding:11px 6px;border-radius:100px;
    font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--text-dim);
    transition:background .2s,color .2s;position:relative;
  }
  html.mod-especialista-copilot .track a span{display:block;font-family:'IBM Plex Sans';font-size:10.5px;letter-spacing:.5px;margin-top:2px;color:var(--text-faint)}
  html.mod-especialista-copilot .track a:hover{background:var(--surface-2);color:var(--text)}
  html.mod-especialista-copilot .track a:focus-visible{outline:2px solid var(--c1);outline-offset:2px}

  /* ---------- COMO USAR ---------- */
  html.mod-especialista-copilot .howto{
    display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:38px 0 10px;
  }
  html.mod-especialista-copilot .howto .item{
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);
    padding:16px 18px;
  }
  html.mod-especialista-copilot .howto .item h4{font-family:'Space Grotesk';font-size:14px;font-weight:600;margin-bottom:5px;display:flex;align-items:center;gap:8px}
  html.mod-especialista-copilot .howto .item p{font-size:13px;color:var(--text-dim)}
  html.mod-especialista-copilot .howto .num{font-family:'IBM Plex Mono';font-size:12px;color:var(--c1);border:1px solid var(--border-bright);border-radius:6px;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}

  /* ---------- FASE ---------- */
  html.mod-especialista-copilot .phase{padding:50px 0 10px;scroll-margin-top:20px}
  html.mod-especialista-copilot .phase-head{display:flex;align-items:flex-start;gap:18px;margin-bottom:8px}
  html.mod-especialista-copilot .lvl{
    font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;
    border-radius:10px;padding:8px 12px;white-space:nowrap;line-height:1.1;
    border:1px solid var(--ph);color:var(--ph);
    background:color-mix(in srgb,var(--ph) 10%,transparent);
  }
  html.mod-especialista-copilot .phase-head .meta{flex:1}
  html.mod-especialista-copilot .phase-head h2{
    font-family:'Space Grotesk';font-weight:700;font-size:clamp(21px,3.2vw,28px);
    letter-spacing:-.01em;line-height:1.15;
  }
  html.mod-especialista-copilot .phase-head .obj{color:var(--text-dim);font-size:14.5px;margin-top:6px;max-width:760px}
  html.mod-especialista-copilot .replaces{
    display:inline-flex;align-items:center;gap:8px;margin-top:14px;
    font-size:12.5px;font-family:'IBM Plex Mono',monospace;color:var(--text-faint);
    border-left:2px solid var(--ph);padding:3px 0 3px 12px;
  }
  html.mod-especialista-copilot .replaces b{color:var(--ph);font-weight:500}

  html.mod-especialista-copilot .cards{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px}
  html.mod-especialista-copilot .card{
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    padding:22px 22px 20px;display:flex;flex-direction:column;
    transition:border-color .2s,transform .2s;position:relative;overflow:hidden;
  }
  html.mod-especialista-copilot .card::before{
    content:"";position:absolute;top:0;left:0;right:0;height:3px;
    background:var(--ph);opacity:.55;
  }
  html.mod-especialista-copilot .card:hover{border-color:var(--border-bright);transform:translateY(-3px)}
  html.mod-especialista-copilot .card .tag{
    font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:1px;
    text-transform:uppercase;color:var(--ph);margin-bottom:10px;
  }
  html.mod-especialista-copilot .card h3{font-family:'Space Grotesk';font-size:17.5px;font-weight:600;line-height:1.25;margin-bottom:12px}
  html.mod-especialista-copilot .card .row{margin-bottom:11px}
  html.mod-especialista-copilot .card .row .lab{
    font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.5px;
    text-transform:uppercase;color:var(--text-faint);display:block;margin-bottom:2px;
  }
  html.mod-especialista-copilot .card .row p{font-size:13.5px;color:var(--text-dim)}
  html.mod-especialista-copilot .card .row p.win{color:var(--text)}
  html.mod-especialista-copilot .card .btn{
    margin-top:auto;align-self:flex-start;
    display:inline-flex;align-items:center;gap:9px;
    font-family:'Space Grotesk';font-weight:600;font-size:13.5px;
    background:var(--ph);color:#0b0e14;
    border-radius:9px;padding:10px 16px;margin-top:18px;
    transition:filter .2s,transform .1s;
  }
  html.mod-especialista-copilot .card .btn:hover{filter:brightness(1.12)}
  html.mod-especialista-copilot .card .btn:active{transform:scale(.98)}
  html.mod-especialista-copilot .card .btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
  html.mod-especialista-copilot .card .btn svg{width:14px;height:14px}

  /* ---------- CREDENCIAL DESTACADA ---------- */
  html.mod-especialista-copilot .capstone{
    margin:30px 0 10px;border-radius:var(--radius);overflow:hidden;
    border:1px solid color-mix(in srgb,var(--c4) 35%,var(--border));
    background:
      radial-gradient(600px 200px at 100% 0%, rgba(251,191,36,.12), transparent 70%),
      var(--surface);
    padding:30px 30px 28px;
  }
  html.mod-especialista-copilot .capstone .tag{font-family:'IBM Plex Mono';font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--c4);margin-bottom:12px;display:flex;align-items:center;gap:9px}
  html.mod-especialista-copilot .capstone .tag svg{width:15px;height:15px}
  html.mod-especialista-copilot .capstone h3{font-family:'Space Grotesk';font-size:clamp(20px,3vw,26px);font-weight:700;margin-bottom:10px;letter-spacing:-.01em}
  html.mod-especialista-copilot .capstone p{color:var(--text-dim);font-size:14.5px;max-width:720px;margin-bottom:8px}
  html.mod-especialista-copilot .capstone .facts{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 22px}
  html.mod-especialista-copilot .capstone .facts span{font-family:'IBM Plex Mono';font-size:11.5px;color:var(--text-dim);border:1px solid var(--border-bright);border-radius:7px;padding:6px 11px}
  html.mod-especialista-copilot .capstone .btn{
    display:inline-flex;align-items:center;gap:9px;
    font-family:'Space Grotesk';font-weight:700;font-size:14.5px;
    background:linear-gradient(100deg,var(--c4),#f59e0b);color:#0b0e14;
    border-radius:10px;padding:12px 20px;transition:filter .2s,transform .1s;
  }
  html.mod-especialista-copilot .capstone .btn:hover{filter:brightness(1.08)}
  html.mod-especialista-copilot .capstone .btn:active{transform:scale(.98)}
  html.mod-especialista-copilot .capstone .btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
  html.mod-especialista-copilot .capstone .btn svg{width:15px;height:15px}

  /* ---------- NOTAS / CIERRE ---------- */
  html.mod-especialista-copilot .notes{margin:46px 0 0;border-top:1px solid var(--border);padding-top:34px}
  html.mod-especialista-copilot .notes h2{font-family:'Space Grotesk';font-size:20px;font-weight:600;margin-bottom:18px}
  html.mod-especialista-copilot .notes .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  html.mod-especialista-copilot .note{background:var(--bg-soft);border:1px solid var(--border);border-radius:var(--radius-sm);padding:18px}
  html.mod-especialista-copilot .note h4{font-family:'Space Grotesk';font-size:14px;font-weight:600;margin-bottom:7px;color:var(--text)}
  html.mod-especialista-copilot .note p{font-size:13px;color:var(--text-dim)}
  html.mod-especialista-copilot .note code{font-family:'IBM Plex Mono';font-size:12px;background:var(--surface-2);padding:2px 6px;border-radius:5px;color:var(--c1)}

  html.mod-especialista-copilot footer{padding:40px 0 56px;text-align:center;color:var(--text-faint);font-size:12.5px;font-family:'IBM Plex Mono',monospace}
  html.mod-especialista-copilot footer .line{width:40px;height:2px;background:var(--border-bright);margin:0 auto 20px;border-radius:2px}

  /* ---------- RESPONSIVE ---------- */
  @media (max-width:820px){
    html.mod-especialista-copilot .howto,html.mod-especialista-copilot .notes .grid{grid-template-columns:1fr}
    html.mod-especialista-copilot .cards{grid-template-columns:1fr}
    html.mod-especialista-copilot .track{flex-wrap:wrap;border-radius:18px}
    html.mod-especialista-copilot .track a{flex:1 1 40%}
  }
  @media (max-width:480px){
    html.mod-especialista-copilot header.hero{padding:42px 0 20px}
    html.mod-especialista-copilot .phase-head{flex-direction:column;gap:12px}
  }
  @media (prefers-reduced-motion:reduce){
    html.mod-especialista-copilot *{transition:none!important;scroll-behavior:auto!important}
  }

</style>
