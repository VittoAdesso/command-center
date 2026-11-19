<script setup>
import { ref } from 'vue'
import { usePageEnv } from '../../composables/usePageEnv'
import { useModuleScript } from '../../composables/useModuleScript'

const rootRef = ref(null)

usePageEnv({
  title: 'Microsoft 365 Copilot · Guía rápida',
  htmlClass: ['mod-briefing-copilot'],
})

function printPage() {
  window.print()
}

useModuleScript(rootRef, ({ root }) => {
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]
  const d = new Date()
  const m = meses[d.getMonth()]
  const fechaEl = (root || document).querySelector('#fecha')
  if (fechaEl) {
    fechaEl.textContent = m.charAt(0).toUpperCase() + m.slice(1) + ' ' + d.getFullYear()
  }
})
</script>

<template>
  <div ref="rootRef">
<div class="topbar"></div>

<button class="print-btn" @click="printPage" aria-label="Imprimir o guardar como PDF">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
  <span>Imprimir / PDF</span>
</button>

<!-- ===== HERO ===== -->
<header class="hero">
  <div class="wrap">
    <p class="eyebrow">Briefing rápido · Equipo DSI — IA y Automatización</p>
    <h1>No es peor.<br><span class="grad">Es de otra liga.</span></h1>
    <p class="lead">Hemos cambiado un chat genérico por una IA que conoce <strong>tu correo, tus archivos y tus reuniones</strong>, y que vive dentro de las herramientas donde ya trabajas.
    <br>
    <em>"¿Y esto para qué me sirve?"</em></p>
    <div class="index" aria-label="Áreas de la guía">
      <a class="pill" href="#areas">Correo</a>
      <a class="pill" href="#areas">Teams</a>
      <a class="pill" href="#areas">SharePoint</a>
      <a class="pill" href="#areas">Word</a>
      <a class="pill" href="#areas">Excel</a>
      <a class="pill" href="#areas">PowerPoint</a>
      <a class="pill" href="#areas">Imágenes</a>
      <a class="pill" href="#areas">Copilot Chat</a>
      <a class="pill" href="#areas">Agentes</a>
    </div>
  </div>
</header>

<!-- ===== POR QUÉ EL CAMBIO ===== -->
<section class="why">
  <div class="wrap">
    <h2>Por qué este cambio (y por qué no es un recorte)</h2>
    <p class="sec-intro">La incomodidad es normal: pasaste de una herramienta que dominabas a otra distinta. Pero no te han dado algo peor, sino algo pensado para otro propósito.</p>
    <div class="why-grid">
      <div class="why-card">
        <span class="why-num">1</span>
        <h3>No es menos cerebro. Es más contexto.</h3>
        <p>Por debajo corren los mismos modelos frontera del mercado (de OpenAI y, cada vez más, Claude de Anthropic). La diferencia no es la potencia: es que Copilot conoce tu empresa y un chat externo no.</p>
      </div>
      <div class="why-card">
        <span class="why-num">2</span>
        <h3>Las IA externas salían caras en privacidad.</h3>
        <p>Cuando usabas ChatGPT o similares por fuera, tus consultas y documentos salían de la empresa. Por eso se limitaron. Copilot mantiene todo dentro de tu tenant y no entrena sus modelos con tus datos.</p>
      </div>
      <div class="why-card">
        <span class="why-num">3</span>
        <h3>Está integrado donde trabajas.</h3>
        <p>No es una pestaña aparte a la que ir a copiar y pegar. Vive dentro de Outlook, Teams, Word, Excel, PowerPoint y SharePoint, con el contexto de lo que tienes delante.</p>
      </div>
    </div>
  </div>
</section>

<!-- ===== PULL QUOTE ===== -->
<section class="quote">
  <div class="wrap">
    <blockquote>El modelo importa menos que <span class="hl">lo que sabe</span>. Ningún chat externo ha leído tu bandeja, tu SharePoint y tu última reunión. Copilot, sí.</blockquote>
  </div>
</section>

<!-- ===== ÁREAS ===== -->
<section id="areas">
  <div class="wrap">
    <p class="sec-eyebrow">Lo que puedes exprimir, por área</p>
    <h2>Abre los ojos</h2>

    <div class="areas-grid">

      <!-- Outlook -->
      <article class="card">
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/></svg></div>
        <h3>Outlook</h3>
        <p class="role">Correo y agenda</p>
        <ul>
          <li><b>Pregúntale por un dato:</b> "¿qué me dijo Marta del presupuesto?" y rastrea el hilo por ti.</li>
          <li><b>Resume cadenas de 30 correos</b> en tres líneas, con decisiones y pendientes.</li>
          <li><b>Redacta en tu tono</b> desde una instrucción de una línea, y te avisa si suena brusco antes de enviar.</li>
        </ul>
      </article>

      <!-- Teams -->
      <article class="card">
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11a4 4 0 1 0-4-4"/><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a6 6 0 0 1 6-6 6 6 0 0 1 6 6v2"/><path d="M21 21v-2a5 5 0 0 0-3-4.5"/></svg></div>
        <h3>Teams</h3>
        <p class="role">Reuniones</p>
        <ul>
          <li><b>"¿Qué me he perdido?"</b> Llegas tarde y tienes el resumen al instante.</li>
          <li><b>Acta automática al terminar:</b> resumen, decisiones y tareas con su responsable.</li>
          <li><b>Pregunta sobre lo que se dijo</b> aunque no asistieras: "¿se cerró la fecha de entrega?".</li>
        </ul>
      </article>

      <!-- SharePoint -->
      <article class="card">
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-7.5l-2-2H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Z"/><circle cx="12" cy="13.5" r="1.6"/><path d="M9 13.5h-.5M15 13.5h.5"/></svg></div>
        <h3>SharePoint</h3>
        <p class="role">Tu conocimiento</p>
        <ul>
          <li><b>Pregunta a tus documentos sin abrirlos:</b> "¿qué dice el procedimiento de compras sobre importes &gt;5.000 €?".</li>
          <li><b>Encuentra el dato disperso</b> entre decenas de archivos del equipo.</li>
          <li><b>Resume y compara</b> documentos largos en segundos.</li>
        </ul>
      </article>

      <!-- Word -->
      <article class="card">
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg></div>
        <h3>Word</h3>
        <p class="role">Documentos</p>
        <ul>
          <li><b>Convierte cuatro notas sueltas</b> en un borrador estructurado.</li>
          <li><b>"Hazme una propuesta basada en este informe"</b> y te la redacta.</li>
          <li><b>Reescribe, ajusta el tono, resume o amplía</b>, y revisas los cambios marcados.</li>
        </ul>
      </article>

      <!-- Excel -->
      <article class="card">
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg></div>
        <h3>Excel</h3>
        <p class="role">Datos</p>
        <ul>
          <li><b>Pregunta en lenguaje natural:</b> "¿qué producto cae en ventas y por qué?".</li>
          <li><b>Genera tablas dinámicas, gráficos y fórmulas</b>, y te las explica.</li>
          <li><b>Análisis avanzado con Python integrado</b>, sin saber programar.</li>
        </ul>
      </article>

      <!-- PowerPoint -->
      <article class="card">
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8"/><path d="M7 11l2.5-2.5L12 11l3.5-4"/></svg></div>
        <h3>PowerPoint</h3>
        <p class="role">Presentaciones</p>
        <ul>
          <li><b>Crea la presentación entera</b> desde un Word o un par de frases.</li>
          <li><b>Aplica vuestra plantilla y branding</b> corporativos.</li>
          <li><b>Genera y edita imágenes</b>, reordena y resume diapositivas.</li>
        </ul>
      </article>

      <!-- Imágenes -->
      <article class="card">
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="m21 15-5-5L5 21"/></svg></div>
        <h3>Imágenes y diseño</h3>
        <p class="role">Creatividad visual</p>
        <ul>
          <li><b>Genera imágenes a medida</b> para informes y presentaciones desde texto.</li>
          <li><b>Refina o edita imágenes</b> existentes hasta el estilo que buscas.</li>
          <li><b>Iconos, ilustraciones y conceptos</b> sin tirar de banco de imágenes.</li>
        </ul>
      </article>

      <!-- Copilot Chat (featured) -->
      <article class="card feat">
        <span class="feat-tag">El cerebro central</span>
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z"/><path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01"/></svg></div>
        <h3>Copilot Chat</h3>
        <p class="role">Donde empieza casi todo</p>
        <ul>
          <li><b>Un interruptor:</b> pregunta sobre los datos de tu empresa (modo Trabajo) o sobre la web — sin que lo corporativo salga del tenant.</li>
          <li><b>Búsqueda universal:</b> cruza correos, archivos, chats y reuniones para responderte con <b>tus</b> datos.</li>
          <li><b>Razonamiento profundo</b> para análisis complejos, con modelos frontera de OpenAI y Anthropic (Claude) por debajo.</li>
          <li><b>Privacidad de empresa:</b> tus datos no entrenan el modelo. Ese es justo el motivo de existir aquí.</li>
        </ul>
      </article>

      <!-- Agentes (featured) -->
      <article class="card feat">
        <span class="feat-tag">El siguiente nivel</span>
        <div class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="2.5"/><path d="M12 8V4M12 4h-1.5M12 4h1.5"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9.5 16.5h5"/></svg></div>
        <h3>Agentes (Copilot Studio)</h3>
        <p class="role">Lo que de verdad escala</p>
        <ul>
          <li><b>Crea asistentes especializados</b> conectados a vuestros datos y procesos concretos.</li>
          <li><b>Automatiza tareas repetitivas y consultas internas</b>: RR. HH., procedimientos, FAQs del equipo.</li>
          <li><b>Agentes listos para usar</b> en Word, Excel, PowerPoint, Planner o listas de SharePoint, conectables a vuestros sistemas.</li>
        </ul>
      </article>

    </div>
  </div>
</section>

<!-- ===== OBJECIONES ===== -->
<section>
  <div class="wrap">
    <div class="myths">
      <div class="wrap">
        <p class="sec-intro">Top 5 - Incertidumbre.</p>
        <div class="myth-list">

          <div class="myth">
            <div class="m-q"><span class="lbl">Mito</span>"ChatGPT o Claude son más potentes."</div>
            <div class="m-a"><span class="lbl">Realidad</span>Por debajo corren <b>esos mismos modelos</b>. La diferencia es que Copilot conoce tu empresa y ellos no. Ganas en contexto, no pierdes en cerebro.</div>
          </div>

          <div class="myth">
            <div class="m-q"><span class="lbl">Mito</span>"Me han dado algo peor."</div>
            <div class="m-a"><span class="lbl">Realidad</span>Te han dado algo <b>distinto y, en el trabajo, más útil</b>: integrado en tus apps, seguro y alimentado con tus datos. Es una herramienta corporativa, no un juguete de consumo.</div>
          </div>

          <div class="myth">
            <div class="m-q"><span class="lbl">Mito</span>"Sus respuestas son más sosas."</div>
            <div class="m-a"><span class="lbl">Realidad</span>Depende del <b>prompt y del contexto</b> que le des. Pídele bien, dale el documento o la reunión de referencia, y usa el razonamiento profundo para lo complejo: el salto es enorme.</div>
          </div>

          <div class="myth">
            <div class="m-q"><span class="lbl">Mito</span>"¿Por qué me quitan las otras IA?"</div>
            <div class="m-a"><span class="lbl">Realidad</span>Porque con ellas <b>los datos de la empresa salían fuera</b>. Copilot resuelve exactamente ese problema: nada sale del tenant y nada entrena al modelo.</div>
          </div>

          <div class="myth">
            <div class="m-q"><span class="lbl">Mito</span>"No me deja hacer lo que yo hacía por fuera."</div>
            <div class="m-a"><span class="lbl">Realidad</span>Casi siempre <b>hay un equivalente dentro</b>, y con la ventaja del contexto corporativo.</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== LÍMITES ===== -->
<section class="limits">
  <div class="wrap">
    <h2>El límite</h2>
    <p class="sec-intro">Cuatro avisos sanos.</p>
    <ul>
      <li><b>No es magia.</b> La calidad sale de cómo preguntas y de tener tus datos ordenados. Basura entra, basura sale.</li>
      <li><b>No es infalible.</b> Verifica siempre los datos críticos antes de usarlos en una decisión.</li>
      <li><b>No es un LLM de uso libre para todo.</b> Está afinado para productividad corporativa bajo gobernanza, no para cualquier capricho.</li>
      <li><b>Algunas funciones dependen del despliegue.</b> Lo que tengas activado lo decide tu organización; no todo está en todos los tenants.</li>
    </ul>
  </div>
</section>

<!-- ===== CTA ===== -->
<section class="cta">
  <div class="wrap">
    <div class="cta-box">
      <h2>¿Quieres exprimirlo de verdad?</h2>
      <p>Empieza por <b>una tarea que repitas cada semana</b> y pídele a Copilot que te la quite de encima. Cuando veas que funciona ahí, el resto cae solo.</p>
    </div>
  </div>
</section>

<footer>
  <div class="wrap foot">
    <div>Microsoft 365 Copilot · Guía rápida de uso<span class="dot">·</span>IMA Ibérica</div>
    <div class="sig">Creado por&nbsp;<b>Equipo DSI · IA y Automatización</b><span class="vbadge">v1.0</span><span class="fdate" id="fecha"></span></div>
  </div>
</footer>
  </div>
</template>

<style>

  html.mod-briefing-copilot{
    --bg:#fafbfc;
    --surface:#ffffff;
    --surface-2:#f3f4f6;
    --ink:#14151a;
    --ink-soft:#3f4654;
    --muted:#6b7280;
    --border:#e7e9ee;
    --accent:#6429e3;
    --accent-soft:#efeaff;
    --dark:#15161c;
    --dark-2:#1d1f29;
    --grad:linear-gradient(100deg,#12b6c9 0%,#2f6bf6 34%,#7c4dff 64%,#ec4899 100%);
    --font-display:"Space Grotesk","Segoe UI",system-ui,sans-serif;
    --font-body:"IBM Plex Sans","Segoe UI",system-ui,-apple-system,sans-serif;
    --maxw:1080px;
    --radius:16px;
    --shadow:0 1px 2px rgba(20,21,26,.04),0 8px 24px -16px rgba(20,21,26,.18);
  }

  html.mod-briefing-copilot *{box-sizing:border-box;}
  html.mod-briefing-copilot{scroll-behavior:smooth;}
  html.mod-briefing-copilot body{
    margin:0;
    background:var(--bg);
    color:var(--ink);
    font-family:var(--font-body);
    font-size:16px;
    line-height:1.6;
    -webkit-font-smoothing:antialiased;
    text-rendering:optimizeLegibility;
  }
  html.mod-briefing-copilot .topbar{height:5px;background:var(--grad);}

  html.mod-briefing-copilot .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px;}

  /* ---------- Hero ---------- */
  html.mod-briefing-copilot .hero{padding:64px 0 40px;}
  html.mod-briefing-copilot .eyebrow{
    font-size:12.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
    color:var(--accent);margin:0 0 22px;
  }
  html.mod-briefing-copilot .hero h1{
    font-family:var(--font-display);font-weight:700;
    font-size:clamp(36px,6.2vw,62px);line-height:1.04;letter-spacing:-.02em;
    margin:0 0 22px;max-width:18ch;
  }
  html.mod-briefing-copilot .hero h1 .grad{
    background:var(--grad);-webkit-background-clip:text;background-clip:text;
    -webkit-text-fill-color:transparent;color:transparent;
  }
  html.mod-briefing-copilot .lead{
    font-size:clamp(17px,2.1vw,20px);line-height:1.55;color:var(--ink-soft);
    max-width:60ch;margin:0 0 28px;
  }
  html.mod-briefing-copilot .lead strong{color:var(--ink);font-weight:600;}
  html.mod-briefing-copilot .index{display:flex;flex-wrap:wrap;gap:8px;margin-top:30px;}
  html.mod-briefing-copilot .pill{
    font-size:13px;font-weight:500;color:var(--ink-soft);
    background:var(--surface);border:1px solid var(--border);
    padding:6px 13px;border-radius:999px;text-decoration:none;
    transition:border-color .18s ease,color .18s ease,transform .18s ease;
  }
  html.mod-briefing-copilot .pill:hover{border-color:#cdd2db;color:var(--ink);transform:translateY(-1px);}

  /* ---------- Generic section ---------- */
  html.mod-briefing-copilot section{padding:44px 0;}
  html.mod-briefing-copilot .sec-eyebrow{
    font-size:12.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
    color:var(--accent);margin:0 0 14px;
  }
  html.mod-briefing-copilot h2{
    font-family:var(--font-display);font-weight:700;
    font-size:clamp(25px,3.4vw,34px);line-height:1.12;letter-spacing:-.015em;
    margin:0 0 16px;
  }
  html.mod-briefing-copilot .sec-intro{font-size:17px;color:var(--ink-soft);max-width:65ch;margin:0 0 8px;}

  /* ---------- Why-change band ---------- */
  html.mod-briefing-copilot .why{background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
  html.mod-briefing-copilot .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:30px;}
  html.mod-briefing-copilot .why-card h3{
    font-family:var(--font-display);font-size:18px;font-weight:600;margin:0 0 8px;
    line-height:1.25;letter-spacing:-.01em;
  }
  html.mod-briefing-copilot .why-card p{font-size:15px;color:var(--ink-soft);margin:0;line-height:1.55;}
  html.mod-briefing-copilot .why-num{
    display:inline-flex;align-items:center;justify-content:center;
    width:30px;height:30px;border-radius:9px;background:var(--accent-soft);
    color:var(--accent);font-family:var(--font-display);font-weight:700;font-size:15px;
    margin-bottom:14px;
  }

  /* ---------- Pull quote ---------- */
  html.mod-briefing-copilot .quote{padding:52px 0;}
  html.mod-briefing-copilot .quote blockquote{
    margin:0;font-family:var(--font-display);font-weight:600;
    font-size:clamp(22px,3.3vw,32px);line-height:1.28;letter-spacing:-.015em;
    max-width:24ch;
  }
  html.mod-briefing-copilot .quote .hl{
    background:var(--grad);-webkit-background-clip:text;background-clip:text;
    -webkit-text-fill-color:transparent;color:transparent;
  }
  html.mod-briefing-copilot .quote .src{margin-top:18px;font-size:14px;color:var(--muted);font-family:var(--font-body);}

  /* ---------- Areas grid ---------- */
  html.mod-briefing-copilot .areas-grid{
    display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:32px;
  }
  html.mod-briefing-copilot .card{
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    padding:24px 22px;box-shadow:var(--shadow);
    transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
    display:flex;flex-direction:column;
  }
  html.mod-briefing-copilot .card:hover{transform:translateY(-3px);box-shadow:0 2px 4px rgba(20,21,26,.05),0 16px 36px -18px rgba(20,21,26,.28);border-color:#dfe3ea;}
  html.mod-briefing-copilot .card .ico{
    width:42px;height:42px;border-radius:11px;background:var(--accent-soft);
    color:var(--accent);display:flex;align-items:center;justify-content:center;margin-bottom:16px;
  }
  html.mod-briefing-copilot .card .ico svg{width:22px;height:22px;}
  html.mod-briefing-copilot .card h3{
    font-family:var(--font-display);font-size:18px;font-weight:600;letter-spacing:-.01em;
    margin:0 0 3px;line-height:1.2;
  }
  html.mod-briefing-copilot .card .role{font-size:12.5px;color:var(--muted);font-weight:500;margin:0 0 16px;
    text-transform:uppercase;letter-spacing:.06em;}
  html.mod-briefing-copilot .card ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px;}
  html.mod-briefing-copilot .card li{position:relative;padding-left:22px;font-size:14.5px;line-height:1.48;color:var(--ink-soft);}
  html.mod-briefing-copilot .card li::before{
    content:"";position:absolute;left:0;top:7px;width:9px;height:9px;border-radius:3px;
    background:var(--grad);
  }
  html.mod-briefing-copilot .card li b{color:var(--ink);font-weight:600;}

  /* Featured card */
  html.mod-briefing-copilot .card.feat{grid-column:span 2;border:1px solid #ddd6f7;position:relative;overflow:hidden;}
  html.mod-briefing-copilot .card.feat::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:var(--grad);}
  html.mod-briefing-copilot .card.feat .ico{background:var(--grad);color:#fff;}
  html.mod-briefing-copilot .card.feat .feat-tag{
    position:absolute;top:20px;right:20px;font-size:11px;font-weight:600;letter-spacing:.08em;
    text-transform:uppercase;color:var(--accent);background:var(--accent-soft);
    padding:4px 10px;border-radius:999px;
  }
  html.mod-briefing-copilot .card.feat ul{margin-top:4px;}

  /* ---------- Objections (dark) ---------- */
  html.mod-briefing-copilot .myths{background:var(--dark);color:#e9eaf0;border-radius:24px;margin:8px auto;
    padding:48px 0;}
  html.mod-briefing-copilot .myths .wrap{max-width:var(--maxw);}
  html.mod-briefing-copilot .myths .sec-eyebrow{color:#b69bff;}
  html.mod-briefing-copilot .myths h2{color:#fff;}
  html.mod-briefing-copilot .myths .sec-intro{color:#b9bcc8;}
  html.mod-briefing-copilot .myth-list{margin-top:30px;display:flex;flex-direction:column;gap:0;}
  html.mod-briefing-copilot .myth{
    display:grid;grid-template-columns:1fr 1.35fr;gap:28px;align-items:start;
    padding:22px 0;border-top:1px solid rgba(255,255,255,.1);
  }
  html.mod-briefing-copilot .myth:first-child{border-top:none;}
  html.mod-briefing-copilot .myth .m-q{font-family:var(--font-display);font-weight:600;font-size:17px;line-height:1.35;color:#fff;}
  html.mod-briefing-copilot .myth .m-q .lbl{display:block;font-family:var(--font-body);font-size:11px;font-weight:600;
    letter-spacing:.1em;text-transform:uppercase;color:#7e8398;margin-bottom:7px;}
  html.mod-briefing-copilot .myth .m-a{font-size:15px;line-height:1.55;color:#cdd0db;}
  html.mod-briefing-copilot .myth .m-a .lbl{display:block;font-size:11px;font-weight:600;letter-spacing:.1em;
    text-transform:uppercase;margin-bottom:7px;
    background:var(--grad);-webkit-background-clip:text;background-clip:text;
    -webkit-text-fill-color:transparent;color:transparent;width:fit-content;}
  html.mod-briefing-copilot .myth .m-a b{color:#fff;font-weight:600;}

  /* ---------- Limits ---------- */
  html.mod-briefing-copilot .limits ul{list-style:none;margin:24px 0 0;padding:0;display:grid;
    grid-template-columns:repeat(2,1fr);gap:16px;}
  html.mod-briefing-copilot .limits li{
    background:var(--surface);border:1px solid var(--border);border-radius:12px;
    padding:18px 20px;font-size:15px;line-height:1.5;color:var(--ink-soft);
  }
  html.mod-briefing-copilot .limits li b{color:var(--ink);font-weight:600;display:block;margin-bottom:3px;font-size:15px;}

  /* ---------- CTA ---------- */
  html.mod-briefing-copilot .cta{padding:56px 0 24px;}
  html.mod-briefing-copilot .cta-box{
    background:var(--dark);color:#fff;border-radius:20px;padding:40px 44px;
    position:relative;overflow:hidden;
  }
  html.mod-briefing-copilot .cta-box::after{content:"";position:absolute;right:-60px;top:-60px;width:240px;height:240px;
    background:var(--grad);filter:blur(70px);opacity:.5;border-radius:50%;}
  html.mod-briefing-copilot .cta-box h2{color:#fff;position:relative;margin-bottom:10px;}
  html.mod-briefing-copilot .cta-box p{position:relative;color:#c6c9d4;font-size:16.5px;max-width:58ch;margin:0;line-height:1.55;}
  html.mod-briefing-copilot .cta-box p b{color:#fff;font-weight:600;}

  /* ---------- Footer ---------- */
  html.mod-briefing-copilot footer{padding:34px 0 60px;border-top:1px solid var(--border);margin-top:40px;}
  html.mod-briefing-copilot .foot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;
    font-size:13px;color:var(--muted);}
  html.mod-briefing-copilot .foot .dot{color:var(--border);margin:0 8px;}
  html.mod-briefing-copilot .foot .sig{color:var(--ink-soft);display:flex;align-items:center;}
  html.mod-briefing-copilot .foot .sig b{color:var(--ink);font-weight:600;}
  html.mod-briefing-copilot .vbadge{margin-left:11px;font-family:var(--font-display);font-weight:600;font-size:12px;
    color:#fff;background:var(--accent);padding:3px 10px;border-radius:999px;letter-spacing:.01em;}
  html.mod-briefing-copilot .fdate{margin-left:11px;color:var(--muted);}

  /* ---------- Print button ---------- */
  html.mod-briefing-copilot .print-btn{
    position:fixed;top:22px;right:22px;z-index:50;
    font-family:var(--font-body);font-size:13.5px;font-weight:600;color:var(--ink);
    background:var(--surface);border:1px solid var(--border);border-radius:999px;
    padding:9px 16px;cursor:pointer;box-shadow:var(--shadow);
    display:inline-flex;align-items:center;gap:7px;
    transition:border-color .18s ease,transform .18s ease;
  }
  html.mod-briefing-copilot .print-btn:hover{border-color:#cdd2db;transform:translateY(-1px);}
  html.mod-briefing-copilot .print-btn svg{width:15px;height:15px;}

  html.mod-briefing-copilot :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px;}

  /* ---------- Responsive ---------- */
  @media (max-width:860px){
    html.mod-briefing-copilot .why-grid{grid-template-columns:1fr;gap:22px;}
    html.mod-briefing-copilot .areas-grid{grid-template-columns:repeat(2,1fr);}
    html.mod-briefing-copilot .card.feat{grid-column:span 2;}
    html.mod-briefing-copilot .myth{grid-template-columns:1fr;gap:12px;}
    html.mod-briefing-copilot .limits ul{grid-template-columns:1fr;}
  }
  @media (max-width:560px){
    html.mod-briefing-copilot .hero{padding:48px 0 32px;}
    html.mod-briefing-copilot .areas-grid{grid-template-columns:1fr;}
    html.mod-briefing-copilot .card.feat{grid-column:span 1;}
    html.mod-briefing-copilot .cta-box{padding:32px 24px;}
    html.mod-briefing-copilot .print-btn span{display:none;}
  }

  @media (prefers-reduced-motion:reduce){
    html.mod-briefing-copilot *{transition:none!important;scroll-behavior:auto!important;}
  }

  /* ---------- Print ---------- */
  @media print{
    html.mod-briefing-copilot{--bg:#fff;}
    html.mod-briefing-copilot body{font-size:11pt;}
    html.mod-briefing-copilot .print-btn{display:none;}
    html.mod-briefing-copilot .topbar{height:4px;}
    html.mod-briefing-copilot .card,html.mod-briefing-copilot .limits li{box-shadow:none;break-inside:avoid;}
    html.mod-briefing-copilot .myths,html.mod-briefing-copilot .cta-box{background:#15161c!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    html.mod-briefing-copilot .card:hover{transform:none;}
    html.mod-briefing-copilot section{padding:22px 0;}
    html.mod-briefing-copilot .myths{border-radius:12px;}
    html.mod-briefing-copilot a[href]{text-decoration:none;color:inherit;}
  }

</style>
