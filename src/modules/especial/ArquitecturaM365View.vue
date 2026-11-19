<script setup>
import { ref } from 'vue'
import { usePageEnv } from '../../composables/usePageEnv'

const rootRef = ref(null)

usePageEnv({
  title: 'Centro de Mando M365 | Arquitectura Pro (Versión Íntegra Definitiva)',
  htmlClass: ['mod-arquitectura-m365'],
})

function openTab(evt, tabId) {
  const root = rootRef.value || document
  const tabcontent = root.getElementsByClassName('tab-content')
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
    tabcontent[i].classList.remove('active')
  }

  const tablinks = root.getElementsByClassName('tab-btn')
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '')
  }

  const target = root.querySelector('#' + tabId)
  if (target) {
    target.style.display = 'block'
    target.classList.add('active')
  }
  if (evt && evt.currentTarget) {
    evt.currentTarget.className += ' active'
  }
}
</script>

<template>
  <div ref="rootRef">
<header>
        <h1>CENTRO DE MANDO: ARQUITECTURA PRO M365</h1>
        <p>Plan de Entrenamiento Técnico | Gobernanza, Datos y Automatización Avanzada (v. Íntegra)</p>
    </header>

    <div class="container">
        
        <div class="tab-container">
            <button class="tab-btn active" @click="openTab($event, 'copilot')">1. Copilot e IA</button>
            <button class="tab-btn" @click="openTab($event, 'powerplatform')">2. Power Platform</button>
            <button class="tab-btn" @click="openTab($event, 'powerautomate')">3. Power Automate</button>
            <button class="tab-btn" @click="openTab($event, 'powerbi')">4. Power BI</button>
            <button class="tab-btn" @click="openTab($event, 'excel')">5. Excel Data</button>
            <button class="tab-btn lab-btn" @click="openTab($event, 'laboratorio')">🚀 6. Lab Proyectos</button>
        </div>

        <section id="copilot" class="tab-content active">
            <div class="fase-card">
                <h2>🏁 Fase 1 a 3: Fundamentos, M365 y Microsoft Graph</h2>
                <p class="fase-p">Bases del procesamiento de lenguaje natural y arquitectura de seguridad en el tenant.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>Fase 1: Fundamentos de Modelos LLM y Grounding</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Comprensión de tokens, ventanas de contexto y el mecanismo de atención. Entender cómo el <i>Grounding</i> conecta el modelo fundacional con tus datos de empresa para evitar alucinaciones, usando Azure OpenAI como backend seguro.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/azure/ai-services/openai/concepts/models" target="_blank">🔗 Modelos Azure OpenAI</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 2: Arquitectura del Índice Semántico</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Diferencia estructural entre Copilot web y Copilot M365. Aprendizaje de cómo el Índice Semántico mapea no solo palabras, sino relaciones conceptuales entre usuarios, correos y documentos en el tenant.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/microsoft-365/enterprise/microsoft-365-copilot-architecture" target="_blank">🔗 Arquitectura Copilot M365</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 3: Microsoft Graph y Aislamiento RBU</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Microsoft Graph actúa como puente de datos. Estudio técnico de cómo la IA respeta la herencia de permisos: si un usuario no tiene acceso a un PDF en SharePoint, Copilot jamás lo usará en su RAG.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/graph/overview" target="_blank">🔗 Graph API Docs</a>
                            <a href="https://learn.microsoft.com/es-es/microsoft-365/enterprise/copilot-security-privacy-data" target="_blank">🔗 Privacidad de Datos M365</a>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="fase-card">
                <h2>🛠️ Fase 4 y 5: Prompting Avanzado y Copilot Studio</h2>
                <p class="fase-p">Ingeniería de contexto y desarrollo de agentes personalizados empresariales.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>Fase 4: Ingeniería de Prompts Corporativa</strong>
                        <div class="tactic-note">Dominio de la anatomía: <code>[Contexto] + [Instrucción] + [Tono] + [Formato]</code>. Aplicación de técnicas <i>Few-Shot Prompting</i> (inyectar ejemplos JSON en la petición) y <i>Chain of Thought</i> para forzar deducciones matemáticas paso a paso.</div>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 5: Copilot Studio (Desarrollo de Agentes RAG)</strong>
                        <div class="tactic-note">Creación de Agentes Copilot (anteriormente PVA). Conexión a bases de conocimiento estáticas (Dataverse, SharePoint) para montar un RAG privado. Diseño de Nodos Conversacionales y paso de variables.</div>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/microsoft-copilot-studio/fundamentals-what-is-copilot-studio" target="_blank">🔗 Docs Copilot Studio</a>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="fase-card expert">
                <h2>🧪 Fase 6 y 7: Troubleshooting, Auditoría y Orquestación</h2>
                <p class="fase-p">Blindaje de la IA, control KQL y conexión a flujos desatendidos.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>1. Blindaje de Agentes (Prompt Injection):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Configuración estricta de la Capa 0 (System Prompt). Uso de delimitadores XML <code>&lt;reglas&gt;</code> para aislar las directivas core de los inputs del usuario, evitando suplantaciones de identidad del bot.</p>
                    </li>
                    <li class="modulo-item">
                        <strong>2. Auditoría mediante Purview (KQL):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Acceso a los registros de auditoría de M365. Escritura de consultas en lenguaje KQL (Kusto Query Language) para detectar intentos de fuga de datos o interacciones con contenido marcado por etiquetas de sensibilidad (MIP).</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/purview/audit-log-search" target="_blank">🔗 Auditoría M365 Purview</a>
                            <a href="https://learn.microsoft.com/es-es/azure/data-explorer/kusto/query/" target="_blank">🔗 Sintaxis KQL</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>3. Orquestación Conversacional (Acciones):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Mapeo de entidades (Entity Extraction). El bot lee texto libre, extrae variables (ej. "Cliente", "Importe") y dispara un flujo de Power Automate pasando un payload JSON para insertar el registro en SQL.</p>
                    </li>
                </ul>
            </div>
        </section>

        <section id="powerplatform" class="tab-content">
            <div class="fase-card">
                <h2>🏁 Fase 1 a 3: Dataverse y Desarrollo Front-End</h2>
                <p class="fase-p">Arquitectura del motor relacional y diseño de interfaces Canvas y Model-Driven.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>Fase 1: Motor Relacional Dataverse</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Diseño de esquemas ER, tipos de datos complejos (Choices, Lookups, Polymorphic). Implementación de la Seguridad Jerárquica y Basada en Roles (RBU), controlando accesos a nivel de unidad de negocio, tabla, fila y columna.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/power-apps/maker/data-platform/data-platform-intro" target="_blank">🔗 Arquitectura Dataverse</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 2: Canvas Apps (Power Fx)</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Desarrollo "píxel perfecto". Variables globales (Set) vs contexto (UpdateContext). Uso intensivo de colecciones locales (ClearCollect) y operaciones asíncronas de escritura con la función <code>Patch()</code>.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/power-platform/power-fx/overview" target="_blank">🔗 Referencia Power Fx</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 3: Model-Driven Apps</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Construcción de interfaces ligadas a datos. Diseño del Site Map, Vistas, Formularios Principales y configuración de Flujos de Proceso de Negocio (BPF) para guiar al usuario por estados.</p>
                    </li>
                </ul>
            </div>

            <div class="fase-card expert">
                <h2>🧪 Fase 4 a 7: Portales B2B, Gobierno y ALM</h2>
                <p class="fase-p">Gestión corporativa, resolución técnica de delegaciones y pases a producción.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>1. Power Pages (Identidad Externa):</strong>
                        <div class="tactic-note">Configuración de sitios web para usuarios externos. Autenticación mediante Azure AD B2C. Asignación de <i>Web Roles</i> y <i>Table Permissions</i> para asegurar que un cliente A jamás pueda listar facturas del cliente B mediante inyección de URLs.</div>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/power-pages/security/table-permissions" target="_blank">🔗 Seguridad en Power Pages</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>2. Resolución de Límites de Delegación (Power Fx):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Superar el límite máximo de 2.000 filas. Identificación de operadores no delegables (ej. <code>Search</code> en SharePoint, <code>In</code>). Reestructuración usando <code>Filter()</code> puro y delegando el procesamiento al motor SQL de Dataverse.</p>
                    </li>
                    <li class="modulo-item">
                        <strong>3. Gobierno y ALM (Application Lifecycle Management):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Despliegue del <b>CoE Starter Kit</b>. Configuración de políticas DLP (Prevención de Pérdida de Datos) para aislar conectores críticos. Empaquetado de apps en Soluciones Administradas con <i>Environment Variables</i> para despliegue automatizado CI/CD.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/power-platform/alm/" target="_blank">🔗 Documentación ALM</a>
                            <a href="https://learn.microsoft.com/es-es/power-platform/guidance/coe/starter-kit" target="_blank">🔗 CoE Starter Kit</a>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section id="powerautomate" class="tab-content">
            <div class="fase-card">
                <h2>🏁 Fase 1 a 3: Orquestación Cloud y Operaciones de Datos (WDL)</h2>
                <p class="fase-p">Arquitectura de flujos asíncronos y manipulación de JSON en memoria sin bucles.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>Fase 1: Conectores y Control de Flujo</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Triggers y acciones. Gestión de concurrencia en bucles For-Each. Filtrado desde el origen usando consultas <code>OData $filter</code> para evitar traer miles de registros inútiles a la memoria del flujo.</p>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 2: Data Operations (El nivel Pro)</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Erradicación de variables dentro de bucles. Uso masivo de las acciones <code>Select</code>, <code>Filter Array</code> y <code>Parse JSON</code> para transformar matrices completas de datos en fracciones de segundo.</p>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 3: Lenguaje de Expresiones WDL</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Manipulación directa del código por detrás de las cajas. Uso de XPath, conversiones de formato de fecha (<code>formatDateTime</code>), uniones (<code>join</code>) y extracciones mediante <code>coalesce()</code> o <code>split()</code>.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/azure/logic-apps/workflow-definition-language-functions-reference" target="_blank">🔗 Referencia Funciones WDL</a>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="fase-card expert">
                <h2>🧪 Fase 4 a 7: RPA, Errores y Arquitectura Distribuida</h2>
                <p class="fase-p">Conectividad On-Premise, gestión "Try/Catch" y automatización desatendida a gran escala.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>1. PAD (Desktop) y On-Premise Data Gateway:</strong>
                        <div class="tactic-note">Configuración de conectores locales. Uso de Power Automate Desktop para raspado UI y automatización de software legado. Paso de argumentos de entrada/salida para coordinar el bot local con la nube.</div>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/power-automate/desktop-flows/introduction" target="_blank">🔗 Power Automate Desktop</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>2. Gestión de Excepciones (Try-Catch-Finally):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Construcción de resiliencia. Envolver acciones críticas en <code>Scope</code> (Ámbito). Configurar la opción <b>"Run After" (Ejecutar posterior a)</b> para que, si el Scope falla, una rama de contingencia notifique el error, extraiga el código HTTP fallido y ejecute un rollback.</p>
                    </li>
                    <li class="modulo-item">
                        <strong>3. Work Queues y Hosted RPA (Avanzado):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Arquitectura Productor-Consumidor. Un flujo Cloud procesa una API e inyecta 5.000 items en una "Work Queue" de Dataverse. Luego, un clúster dinámico de máquinas virtuales Azure (Hosted RPA) consume y procesa la cola en paralelo sin intervención humana.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/power-automate/work-queues" target="_blank">🔗 Work Queues en Dataverse</a>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section id="powerbi" class="tab-content">
            <div class="fase-card">
                <h2>🏁 Fase 1 a 3: Arquitectura, Power Query y Modelado Star Schema</h2>
                <p class="fase-p">ETL avanzado, forzado de Query Folding y modelado dimensional estricto.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>Fase 1: Estrategia de Almacenamiento</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Decisión crítica: Import Mode (en memoria, máxima velocidad) vs DirectQuery (tiempo real, dependiente de base de datos) vs Modelos Compuestos. Cuándo usar cada uno.</p>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 2: Power Query (Lenguaje M) y Query Folding</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Auditoría de pasos ETL. El objetivo es mantener el <b>Query Folding</b> intacto: asegurar que operaciones como agrupar y filtrar se traduzcan a código SQL y se ejecuten en el servidor origen, no en la RAM del ordenador local. Uso de <code>Table.Buffer</code>.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/power-query/power-query-folding" target="_blank">🔗 Query Folding Conceptos</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 3: Modelado Dimensional Perfecto</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Sustitución de tablas maestras planas por el Modelo en Estrella (Star Schema). Separación de Tablas de Hechos (datos transaccionales) y Dimensiones (descriptores). Relaciones de cardinalidad 1:N unidireccionales.</p>
                    </li>
                </ul>
            </div>

            <div class="fase-card expert">
                <h2>🧪 Fase 4 a 7: DAX Extremo, Optimización VertiPaq y Golden Datasets</h2>
                <p class="fase-p">Modificadores de contexto, reducción de memoria y seguridad en la nube.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>1. Contextos DAX y Relaciones Virtuales:</strong>
                        <div class="tactic-note">Dominio del Contexto de Filtro vs. Contexto de Fila. Uso avanzado de <code>CALCULATE()</code>, transiciones de contexto y funciones como <code>TREATAS()</code> para establecer relaciones virtuales sin conectar físicamente tablas en el modelo.</div>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/dax/" target="_blank">🔗 Referencia Lenguaje DAX</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>2. Diagnóstico del Motor VertiPaq:</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Uso de DAX Studio para analizar el consumo de RAM. Solución al límite de memoria reduciendo la cardinalidad: separación de columnas <i>DateTime</i> en <i>Date</i> y <i>Time</i>, eliminación de IDs en texto, forzando compresiones del diccionario de datos &gt;80%.</p>
                    </li>
                    <li class="modulo-item">
                        <strong>3. Golden Datasets y RLS Dinámico:</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Arquitectura centralizada corporativa. Un solo "Modelo Semántico" maestro certificado en Power BI Service. Conexiones <i>Live Connection</i> de los analistas. Implementación de Seguridad a Nivel de Fila (RLS) interceptando el login con <code>USERPRINCIPALNAME()</code> para que la gerencia vea todo y el comercial solo su provincia.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/power-bi/enterprise/service-admin-rls" target="_blank">🔗 Seguridad Nivel Fila (RLS)</a>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section id="excel" class="tab-content">
            <div class="fase-card">
                <h2>🏁 Fase 1 a 3: Modern Excel, Arrays Dinámicos y Power Query</h2>
                <p class="fase-p">Abandono de funciones Legacy y cálculo matricial desbordado.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>Fase 1: Tablas Estructuradas y Fin del Rango</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Uso de <code>ListObjects</code> (Ctrl+T). Nomenclaturas relacionales en fórmulas (ej. <code>SUMA(Ventas[Importe])</code>) para asegurar la integridad al inyectar nuevos datos, sin necesidad de actualizar referencias.</p>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 2: Motor de Matrices Dinámicas (Dynamic Arrays)</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Cálculos en memoria que desbordan automáticamente (operador <code>#</code>). Reemplazo definitivo de BUSCARV por <code>BUSCARX</code>, y uso de funciones de modelado puro como <code>FILTRAR</code>, <code>ORDENAR</code> y <code>UNICOS</code>.</p>
                        <div class="link-list">
                            <a href="https://support.microsoft.com/es-es/office/matrices-dinámicas-y-comportamiento-de-matrices-desbordadas" target="_blank">🔗 Matrices Dinámicas Excel</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>Fase 3: Power Query Local e Inquire Tool</strong>
                        <p style="font-size: 0.95rem; margin: 0; color: var(--text-muted);">Consolidación de archivos pesados vía Power Query en Excel. Uso del complemento "Inquire" para rastrear dependencias circulares y enlaces rotos ocultos que corrompen el rendimiento del libro.</p>
                    </li>
                </ul>
            </div>

            <div class="fase-card expert">
                <h2>🧪 Fase 4 a 7: Big Data, TypeScript y Arquitectura Híbrida</h2>
                <p class="fase-p">Superación del millón de filas, destrucción de macros VBA y scripts web.</p>
                <ul class="modulo-list">
                    <li class="modulo-item">
                        <strong>1. Power Pivot (Modelo de Datos Local):</strong>
                        <div class="tactic-note">Carga de conexiones ETL directamente al "Modelo de Datos" para evadir el límite físico de 1.048.576 filas de la cuadrícula. Creación de medidas DAX locales para crear Tablas Dinámicas ultrarrápidas basadas en caché VertiPaq local.</div>
                    </li>
                    <li class="modulo-item">
                        <strong>2. Sustitución de VBA por Office Scripts (TypeScript):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Las macros `.xlsm` están muertas en la web. Escritura de rutinas modernas en TypeScript para manipular hojas de Excel alojadas en SharePoint. Código modular y seguro ejecutado en el navegador.</p>
                        <div class="link-list">
                            <a href="https://learn.microsoft.com/es-es/office/dev/scripts/overview/excel" target="_blank">🔗 Docs Office Scripts (TypeScript)</a>
                        </div>
                    </li>
                    <li class="modulo-item">
                        <strong>3. Automatización Híbrida (Excel + Automate + Power BI):</strong>
                        <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 0.2rem;">Diseño de flujos en Power Automate que extraen datos, llaman a un Office Script desatendido para formatear un Excel (.xlsx) en SharePoint, y lo conectan mediante <i>Analizar en Excel</i> a un modelo de Power BI en la nube.</p>
                    </li>
                </ul>
            </div>
        </section>

        <section id="laboratorio" class="tab-content">
            <div class="intro-box" style="background: rgba(var(--primary-rgb), 0.1); border-left: 4px solid var(--primary); padding: 1.5rem; margin-bottom: 2rem; border-radius: 6px;">
                <h2 style="margin-top: 0; color: #fff;">🚀 Laboratorio de Aplicación Práctica ("The Sandbox")</h2>
                <p style="margin-bottom: 0; color: var(--text-muted);">El campo de pruebas definitivo. 15 escenarios reales extraídos de la trinchera empresarial. Aquí no hay tutoriales genéricos; se diseña la arquitectura, se escribe el código (Power Fx, DAX, KQL, TypeScript) y se resuelven dependencias reales.</p>
            </div>

            <div class="pilar-proyectos-block" style="margin-bottom: 2rem;">
                <h3 style="color: var(--secondary); border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">🤖 B1: Copilot e IA</h3>
                <div class="project-grid">
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P1. Agente RAG Blindado</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Uso de delimitadores XML en System Prompt y variables de sesión inmutables para evitar Prompt Injection en RRHH.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P2. Dashboard Auditoría KQL</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Conexión a M365 Purview y scripting KQL para rastrear resúmenes no autorizados de juntas directivas.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P3. Extractor de Entidades</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Parseo conversacional a JSON mediante Copilot Studio y almacenamiento automático en SQL vía Power Automate.</p></div>
                </div>
            </div>

            <div class="pilar-proyectos-block" style="margin-bottom: 2rem;">
                <h3 style="color: var(--secondary); border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">🗂️ B2: Power Platform</h3>
                <div class="project-grid">
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P4. App sin Límite Delegación</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Reescribir código Power Fx para evitar bloqueos al consultar más de 80.000 filas en Dataverse forzando ejecución SQL.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P5. Portal B2B Permisos RBU</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Despliegue de Power Pages con Auth B2C y Table Permissions para aislar facturas de proveedores externos de forma estricta.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P6. Pipeline ALM</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Empaquetar desarrollo en Soluciones Administradas con Environment Variables y GitHub Actions para CI/CD.</p></div>
                </div>
            </div>

            <div class="pilar-proyectos-block" style="margin-bottom: 2rem;">
                <h3 style="color: var(--secondary); border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">🤖 B3: Power Automate</h3>
                <div class="project-grid">
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P7. Motor Productor-Consumidor</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Orquestar inyección en Work Queues (Nube) y procesado paralelo mediante PAD (Escritorio) en ERP legado.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P8. Orquestador Try/Catch</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Uso de bloques Scope con configuración "Run After" para atrapar fallos HTTP 500, ejecutar rollback y notificar errores.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P9. Destructor de Bucles</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Erradicar bucles Apply-to-Each pesados usando Filter Array, Select y WDL para procesar miles de filas en memoria.</p></div>
                </div>
            </div>

            <div class="pilar-proyectos-block" style="margin-bottom: 2rem;">
                <h3 style="color: var(--secondary); border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">📊 B4: Power BI</h3>
                <div class="project-grid">
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P10. Optimización VertiPaq</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Uso de DAX Studio para auditar RAM, reducir cardinalidad y truncar TimeStamps disparando la compresión.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P11. Golden Dataset</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Despliegue de un único Modelo Semántico certificado en la nube con obligación de conexión Live a departamentos.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P12. RLS por USERPRINCIPALNAME()</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Programación DAX cruzando jerarquía de empleados para filtrar ventas dinámicamente según el usuario logueado.</p></div>
                </div>
            </div>

            <div class="pilar-proyectos-block" style="margin-bottom: 2rem;">
                <h3 style="color: var(--secondary); border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">📈 B5: Excel</h3>
                <div class="project-grid">
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P13. Purga Fórmulas Volátiles</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Diagnóstico de bloqueos de hilos de CPU. Erradicación de INDIRECTO y rediseño con Matrices Dinámicas estáticas.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P14. Restauración Query Folding</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Auditoría de código M y reordenación de pasos (Table.Buffer) para forzar la delegación del filtrado al servidor SQL.</p></div>
                    <div class="fase-card expert" style="margin: 0;"><h4>🎯 P15. Office Scripts Automatizados</h4><p style="font-size: 0.9rem; color: var(--text-muted);"><strong>Reto:</strong> Desarrollo web con TypeScript para validación contable y ejecución remota orquestada desde Power Automate Cloud.</p></div>
                </div>
            </div>

        </section>

    </div>
  </div>
</template>

<style>

        html.mod-arquitectura-m365 {
            --bg-color: #0f111a;
            --surface: #1a1d2d;
            --surface-hover: #23273b;
            --primary: #0078d4;
            --primary-rgb: 0, 120, 212;
            --secondary: #00bcf2;
            --expert: #e3008c;
            --text-main: #e1e4f3;
            --text-muted: #8b92b5;
            --border: #2e334a;
            --success: #107c41;
            --link: #58a6ff;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        html.mod-arquitectura-m365 body {
            background-color: var(--bg-color);
            color: var(--text-main);
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        html.mod-arquitectura-m365 header {
            background-color: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 2.5rem 2rem;
            text-align: center;
        }

        html.mod-arquitectura-m365 header h1 {
            margin: 0;
            font-size: 2.5rem;
            letter-spacing: -0.5px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        html.mod-arquitectura-m365 header p {
            color: var(--text-muted);
            margin-top: 0.5rem;
            font-size: 1.1rem;
        }

        html.mod-arquitectura-m365 .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        /* Tab System */
        html.mod-arquitectura-m365 .tab-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 2rem;
            border-bottom: 2px solid var(--border);
            padding-bottom: 1rem;
        }

        html.mod-arquitectura-m365 .tab-btn {
            background: var(--surface);
            color: var(--text-muted);
            border: 1px solid var(--border);
            padding: 0.8rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
            font-size: 0.95rem;
        }

        html.mod-arquitectura-m365 .tab-btn:hover {
            background: var(--surface-hover);
            color: var(--text-main);
        }

        html.mod-arquitectura-m365 .tab-btn.active {
            background: rgba(var(--primary-rgb), 0.15);
            color: var(--secondary);
            border-color: var(--primary);
        }

        html.mod-arquitectura-m365 .tab-btn.lab-btn {
            border-color: var(--expert);
            color: var(--expert);
        }
        
        html.mod-arquitectura-m365 .tab-btn.lab-btn.active {
            background: rgba(227, 0, 140, 0.1);
        }

        html.mod-arquitectura-m365 .tab-content {
            display: none;
            animation: fadeIn 0.4s ease;
        }

        html.mod-arquitectura-m365 .tab-content.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Cards and Content */
        html.mod-arquitectura-m365 .fase-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.8rem;
            margin-bottom: 1.5rem;
            transition: border-color 0.2s;
        }

        html.mod-arquitectura-m365 .fase-card:hover {
            border-color: #4a5275;
        }

        html.mod-arquitectura-m365 .fase-card.expert {
            border-left: 4px solid var(--expert);
        }

        html.mod-arquitectura-m365 .fase-card h2 {
            margin-top: 0;
            color: var(--text-main);
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border-bottom: 1px solid var(--border);
            padding-bottom: 0.8rem;
            margin-bottom: 1.2rem;
        }

        html.mod-arquitectura-m365 .fase-card.expert h2 {
            color: var(--expert);
        }

        html.mod-arquitectura-m365 .fase-p {
            color: var(--text-muted);
            margin-bottom: 1.5rem;
            font-size: 1rem;
        }

        html.mod-arquitectura-m365 .modulo-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        html.mod-arquitectura-m365 .modulo-item {
            background: var(--bg-color);
            padding: 1.2rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            border: 1px solid var(--border);
        }

        html.mod-arquitectura-m365 .modulo-item strong {
            color: var(--secondary);
            font-size: 1.1rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        html.mod-arquitectura-m365 .tactic-note {
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(var(--primary-rgb), 0.05);
            border-left: 3px solid var(--primary);
            font-size: 0.95rem;
            color: #b0b7d6;
        }

        html.mod-arquitectura-m365 .link-list {
            margin-top: 1rem;
            padding-top: 0.8rem;
            border-top: 1px dashed var(--border);
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        html.mod-arquitectura-m365 .link-list a {
            color: var(--link);
            text-decoration: none;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            background: rgba(88, 166, 255, 0.1);
            padding: 0.3rem 0.6rem;
            border-radius: 4px;
            transition: background 0.2s;
        }

        html.mod-arquitectura-m365 .link-list a:hover {
            background: rgba(88, 166, 255, 0.2);
        }

        html.mod-arquitectura-m365 .tip-box {
            background: rgba(16, 124, 65, 0.1);
            border: 1px solid var(--success);
            padding: 1.2rem;
            border-radius: 6px;
            color: #d1f2e0;
            margin-top: 2rem;
        }

        /* Grid for Lab Projects */
        html.mod-arquitectura-m365 .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        html.mod-arquitectura-m365 code {
            background: #000;
            color: #00ffcc;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'Consolas', monospace;
            font-size: 0.9em;
        }
    
</style>
