/**
 * Datos estructurados del módulo «Manual Pro: TypeScript & Tests Unitarios (Vitest)».
 * Contiene las 7 partes, los enlaces oficiales, los comandos del simulador, los archivos
 * de configuración, los fragmentos de código, los 5 archivos del proyecto IDE,
 * los 5 retos progresivos y los 6 puntos del Checklist Quality Gate.
 */

export const navParts = [
  { id: 'part-1', roman: 'I', label: 'Docs Oficiales y Terminal', badgeColor: 'indigo' },
  { id: 'part-2', roman: 'II', label: 'Arquitectura y Alias (@/*)', badgeColor: 'indigo' },
  { id: 'part-3', roman: 'III', label: 'TypeScript: Base y Nivel Pro', badgeColor: 'indigo' },
  { id: 'part-4', roman: 'IV', label: 'Vitest: Testing Base y Pro', badgeColor: 'indigo' },
  { id: 'part-5', roman: 'V', label: 'Proyecto Práctico Base (IDE)', badgeColor: 'emerald' },
  { id: 'part-6', roman: 'VI', label: '5 Retos Progresivos (TDD)', badgeColor: 'amber' },
  { id: 'part-7', roman: 'VII', label: 'Checklist Quality Gate', badgeColor: 'cyan' },
]

export const tsOfficialLinks = [
  { label: '↗ Portal Principal TypeScript Docs', href: 'https://www.typescriptlang.org/docs/', highlight: true },
  { label: '↗ TypeScript for JavaScript Programmers', href: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html' },
  { label: '↗ The Handbook: Everyday Types & Basics', href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  { label: '↗ Narrowing (Type Guards y estrechamiento)', href: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html' },
  { label: '↗ Generics y Manipulación de Tipos', href: 'https://www.typescriptlang.org/docs/handbook/2/generics.html' },
  { label: '↗ Utility Types Reference (Partial, Pick, Omit...)', href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html' },
  { label: '↗ TSConfig Reference & Path Mapping', href: 'https://www.typescriptlang.org/tsconfig/' },
  { label: '↗ TypeScript Playground (Pruebas rápidas)', href: 'https://www.typescriptlang.org/play' },
]

export const testOfficialLinks = [
  { label: '↗ Vitest Getting Started (Recomendado)', href: 'https://vitest.dev/guide/', highlight: true, emerald: true },
  { label: '↗ Configuring Vitest (vitest.config.ts)', href: 'https://vitest.dev/config/', emerald: true },
  { label: '↗ Expect API (Todas las aserciones/matchers)', href: 'https://vitest.dev/api/expect', emerald: true },
  { label: '↗ Vi Utility API (Mocks, Spies y Fake Timers)', href: 'https://vitest.dev/api/vi', emerald: true },
  { label: '↗ Mocking Guide & Test Lifecycle', href: 'https://vitest.dev/guide/mocking', emerald: true },
  { label: '↗ Coverage Guide (Cobertura V8)', href: 'https://vitest.dev/guide/coverage', emerald: true },
  { label: '↗ Alternativa: Node.js Native Test Runner', href: 'https://nodejs.org/learn/test-runner/using-test-runner', emerald: false },
  { label: '↗ Alternativa: Jest Official Docs', href: 'https://jestjs.io/docs/getting-started', emerald: false },
]

export const terminalSimulatorCommands = [
  {
    id: 'typecheck',
    label: '1. npm run typecheck',
    colorClass: 'tw:text-white',
    output: `$ npm run typecheck\n> tsc --noEmit\n\n✓ 0 errores de tipos encontrados en src/ y tests/.`,
    explanation:
      '<strong>¿Qué comprueba?</strong> Analiza todos los archivos de <code>src/</code> y <code>tests/</code> aplicando las reglas estrictas de <code>tsconfig.json</code> sin generar archivos <code>.js</code>. Si hay un fallo de tipos incluso dentro de un test, indica el archivo y la línea exacta.',
  },
  {
    id: 'test',
    label: '2. npm run test:run',
    colorClass: 'tw:text-emerald-400',
    output: `$ npm run test:run\n> vitest run\n\n ✓ tests/calculadoraPrecios.test.ts (8 tests) 14ms\n ✓ tests/procesadorPedidos.test.ts (3 tests) 9ms\n\n Test Files  2 passed (2)\n      Tests  11 passed (11)\n   Duration  312ms`,
    explanation:
      '<strong>¿Qué comprueba?</strong> Ejecuta toda la suite de tests unitarios una única vez y sale con código <code>0</code> si todos pasan (ideal antes de hacer <code>git commit</code> o en pipelines CI/CD).',
  },
  {
    id: 'coverage',
    label: '3. npm run test:coverage',
    colorClass: 'tw:text-cyan-400',
    output: `$ npm run test:coverage\n> vitest run --coverage\n\n % Coverage report from v8\n-----------------------|---------|----------|---------|---------|\nFile                   | % Stmts | % Branch | % Funcs | % Lines |\n-----------------------|---------|----------|---------|---------|\nAll files              |     100 |    95.45 |     100 |     100 |\n calculadoraPrecios.ts |     100 |    93.75 |     100 |     100 |\n procesadorPedidos.ts  |     100 |      100 |     100 |     100 |\n-----------------------|---------|----------|---------|---------|`,
    explanation:
      '<strong>¿Cómo leer la tabla?</strong> <code>% Branch</code> es la métrica más importante: mide qué porcentaje de caminos <code>if / else</code> y ternarios has probado. Además genera <code>coverage/index.html</code> para ver en rojo las líneas no cubiertas.',
  },
  {
    id: 'build',
    label: '4. npm run build',
    colorClass: 'tw:text-amber-400',
    output: `$ npm run build\n> tsc\n\n✓ Compilación completada en dist/ (ES2022 / ESNext).`,
    explanation:
      '<strong>¿Qué hace?</strong> Compila el código fuente TypeScript a JavaScript limpio de producción dentro de la carpeta <code>dist/</code>.',
  },
]

export const configFiles = [
  {
    id: 'pkg',
    label: 'package.json',
    lang: 'json',
    code: `{
  "name": "proyecto-pedidos-ts",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "tsc",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@vitest/coverage-v8": "^3.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}`,
  },
  {
    id: 'tsc',
    label: 'tsconfig.json',
    lang: 'json',
    code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "rootDir": ".",
    "outDir": "./dist",

    /* ALIAS DE RUTAS */
    "baseUrl": ".",
    "paths": {
      "@domain/*": ["src/domain/*"],
      "@services/*": ["src/services/*"]
    },

    /* MODO ESTRICTO PROFESIONAL */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
  },
  {
    id: 'vit',
    label: 'vitest.config.ts',
    lang: 'typescript',
    code: `import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@domain": fileURLToPath(new URL("./src/domain", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
    },
  },
  test: {
    globals: false,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/domain/tipos.ts"],
    },
  },
});`,
  },
  {
    id: 'git',
    label: '.gitignore',
    lang: 'text',
    code: `node_modules/
dist/
coverage/
.env`,
  },
]

export const snippets = {
  initBash: `mkdir proyecto-pedidos && cd proyecto-pedidos
npm init -y
npm install -D typescript @types/node tsx vitest @vitest/coverage-v8`,

  folderTree: `proyecto-pedidos/
├── src/                  # Código fuente (.ts)
│   ├── domain/           # Contratos, interfaces y tipos
│   │   └── tipos.ts
│   └── services/         # Lógica de negocio
│       ├── calculadoraPrecios.ts
│       └── procesadorPedidos.ts
├── tests/                # Pruebas unitarias (espejo)
│   ├── calculadoraPrecios.test.ts
│   └── procesadorPedidos.test.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── vitest.config.ts`,

  tsPrimitives: `// Primitivos (siempre en minúscula) y Tuplas
const nombre: string = "Laura";
type Coordenada = [latitud: number, longitud: number];
const madrid: Coordenada = [40.4168, -3.7038];

// Patrón moderno para constantes enumeradas ('as const' en lugar de 'enum')
const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  LECTOR: "lector",
} as const;

type RolUsuario = (typeof ROLES)[keyof typeof ROLES]; // "admin" | "editor" | "lector"`,

  tsUnknown: `function parsearNombre(entrada: unknown): string {
  if (typeof entrada === "string" && entrada.trim().length > 0) {
    return entrada.trim();
  }
  throw new Error("Entrada inválida: se esperaba un string no vacío");
}`,

  tsDiscriminated: `type RespuestaApi<T> =
  | { estado: "ok"; datos: T }
  | { estado: "error"; codigo: number; mensaje: string };

function procesarRespuesta(res: RespuestaApi<{ nombre: string }>): string {
  switch (res.estado) {
    case "ok":
      return \`Bienvenido, \${res.datos.nombre}\`;
    case "error":
      return \`Fallo (\${res.codigo}): \${res.mensaje}\`;
    default: {
      // Si añades un nuevo estado y olvidas manejarlo, TS dará error aquí
      const _exhaustivo: never = res;
      return _exhaustivo;
    }
  }
}`,

  tsGenerics: `function buscarPorId<T extends { id: string }>(lista: readonly T[], id: string): T | undefined {
  return lista.find((item) => item.id === id);
}

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
}

type ActualizarProductoDTO = Partial<Omit<Producto, "id">>;
type ResumenProducto = Pick<Producto, "id" | "nombre" | "precio">;
type ProductoSoloLectura = Readonly<Producto>;
type CatalogoPorId = Record<string, Producto>;`,

  tsSatisfies: `type RutaConfig = { path: string; roles: readonly string[] };

const RUTAS = {
  login: { path: "/login", roles: ["publico"] },
  panel: { path: "/admin", roles: ["admin"] },
} satisfies Record<string, RutaConfig>;

console.log(RUTAS.panel.path); // Autocompletado exacto`,

  tsAsserts: `function assertDefinido<T>(val: T | null | undefined, msg: string): asserts val is T {
  if (val === null || val === undefined) throw new Error(msg);
}

function saludar(nombre?: string) {
  assertDefinido(nombre, "Nombre obligatorio");
  return nombre.toUpperCase(); // TS sabe que ya es string
}`,

  tsTemplateLiteral: `type Entidad = "usuario" | "pedido";
type Accion = "creado" | "eliminado";
type Evento = \`\${Entidad}:\${Accion}\`;

type FiltrosActivos<T> = {
  [K in keyof T]?: boolean;
};`,

  tsInfer: `type ResultadoPromesa<T> =
  T extends (...args: never[]) => Promise<infer R> ? R : never;

async function cargarConfig() {
  return { reintentos: 3, timeoutMs: 5000 };
}

type Config = ResultadoPromesa<typeof cargarConfig>;`,

  vitestMatchers: `// Aserciones principales
expect(resultado).toBe(100);                               // Primitivos (===)
expect(objeto).toEqual({ id: "1", activo: true });         // Objetos/arrays profundos
expect(objeto).toMatchObject({ id: "1" });                 // Subconjunto de propiedades
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);                     // Decimales
expect(() => funcionInvalida()).toThrow("Mensaje esperado"); // Errores síncronos
await expect(promesaFallida()).rejects.toThrow("Error");     // Promesas rechazadas

// Tests parametrizados sin duplicar bloques 'it'
it.each([
  { entrada: 100, descuento: 0, esperado: 100 },
  { entrada: 100, descuento: 20, esperado: 80 },
  { entrada: 50, descuento: 100, esperado: 0 },
])("con precio $entrada y descuento $descuento% devuelve $esperado", ({ entrada, descuento, esperado }) => {
  expect(aplicarDescuento(entrada, descuento)).toBe(esperado);
});`,

  vitestSpy: `const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
// ... ejecutar código ...
expect(warnSpy).toHaveBeenCalledWith("Alerta");
warnSpy.mockRestore();`,

  vitestTimers: `beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-06-01T10:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers(); // Obligatorio restaurar
});

it("caduca tras avanzar 15 minutos", () => {
  const token = crearTokenMinutos(10);
  vi.advanceTimersByTime(15 * 60 * 1000);
  expect(estaCaducado(token)).toBe(true);
});`,
}

export const ideFiles = [
  {
    id: 'tipos',
    label: 'src/domain/tipos.ts',
    isTest: false,
    code: `export type NivelSuscripcion = "free" | "pro" | "enterprise";

export interface Producto {
  readonly id: string;
  nombre: string;
  precioBase: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export type CuponDescuento =
  | {
      tipo: "porcentaje";
      codigo: string;
      porcentaje: number;
      expiraEl: Date;
    }
  | {
      tipo: "fijo";
      codigo: string;
      descuentoEuros: number;
      expiraEl: Date;
    };

export type ResultadoPedido =
  | {
      estado: "completado";
      transaccionId: string;
      totalCobrado: number;
    }
  | {
      estado: "rechazado";
      motivo: "SIN_STOCK" | "PAGO_FALLIDO" | "CARRITO_VACIO";
      detalle: string;
    };

export interface RepositorioInventario {
  hayStock(productoId: string, cantidad: number): Promise<boolean>;
  descontarStock(productoId: string, cantidad: number): Promise<void>;
}

export interface PasarelaPago {
  cobrar(usuarioId: string, importe: number): Promise<{ transaccionId: string }>;
}`,
  },
  {
    id: 'calc',
    label: 'src/services/calculadoraPrecios.ts',
    isTest: false,
    code: `import type { CuponDescuento, ItemCarrito, NivelSuscripcion } from "@domain/tipos";

const DESCUENTOS_SUSCRIPCION: Record<NivelSuscripcion, number> = {
  free: 0,
  pro: 0.1,
  enterprise: 0.2,
};

export function calcularPrecioFinal(
  items: readonly ItemCarrito[],
  nivelUsuario: NivelSuscripcion,
  cupon?: CuponDescuento,
  fechaActual: Date = new Date()
): number {
  if (items.length === 0) {
    return 0;
  }

  const subtotal = items.reduce((acumulado, item) => {
    if (item.cantidad <= 0) {
      throw new Error(\`Cantidad inválida para el producto \${item.producto.nombre}\`);
    }
    if (item.producto.precioBase < 0) {
      throw new Error(\`Precio negativo no permitido en \${item.producto.nombre}\`);
    }
    return acumulado + item.producto.precioBase * item.cantidad;
  }, 0);

  const porcentajeNivel = DESCUENTOS_SUSCRIPCION[nivelUsuario];
  let total = subtotal * (1 - porcentajeNivel);

  if (cupon && cupon.expiraEl.getTime() >= fechaActual.getTime()) {
    if (cupon.tipo === "porcentaje") {
      total = total * (1 - cupon.porcentaje / 100);
    } else {
      total = total - cupon.descuentoEuros;
    }
  }

  const totalSeguro = Math.max(0, total);
  return Math.round(totalSeguro * 100) / 100;
}`,
  },
  {
    id: 'proc',
    label: 'src/services/procesadorPedidos.ts',
    isTest: false,
    code: `import type {
  CuponDescuento,
  ItemCarrito,
  NivelSuscripcion,
  PasarelaPago,
  RepositorioInventario,
  ResultadoPedido,
} from "@domain/tipos";
import { calcularPrecioFinal } from "@services/calculadoraPrecios";

export class ProcesadorPedidos {
  constructor(
    private readonly inventario: RepositorioInventario,
    private readonly pasarelaPago: PasarelaPago
  ) {}

  async procesar(
    usuarioId: string,
    nivelUsuario: NivelSuscripcion,
    items: readonly ItemCarrito[],
    cupon?: CuponDescuento
  ): Promise<ResultadoPedido> {
    if (items.length === 0) {
      return {
        estado: "rechazado",
        motivo: "CARRITO_VACIO",
        detalle: "No se puede procesar un pedido sin productos",
      };
    }

    for (const item of items) {
      const disponible = await this.inventario.hayStock(item.producto.id, item.cantidad);
      if (!disponible) {
        return {
          estado: "rechazado",
          motivo: "SIN_STOCK",
          detalle: \`Stock insuficiente para \${item.producto.nombre}\`,
        };
      }
    }

    const totalCobrado = calcularPrecioFinal(items, nivelUsuario, cupon);

    try {
      const { transaccionId } = await this.pasarelaPago.cobrar(usuarioId, totalCobrado);

      for (const item of items) {
        await this.inventario.descontarStock(item.producto.id, item.cantidad);
      }

      return {
        estado: "completado",
        transaccionId,
        totalCobrado,
      };
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido en pasarela";
      return {
        estado: "rechazado",
        motivo: "PAGO_FALLIDO",
        detalle: mensaje,
      };
    }
  }
}`,
  },
  {
    id: 'test-calc',
    label: 'tests/calculadoraPrecios.test.ts',
    isTest: true,
    code: `import { describe, it, expect } from "vitest";
import type { CuponDescuento, ItemCarrito } from "@domain/tipos";
import { calcularPrecioFinal } from "@services/calculadoraPrecios";

describe("calcularPrecioFinal", () => {
  const teclado: ItemCarrito = {
    producto: { id: "p1", nombre: "Teclado Mecánico", precioBase: 100 },
    cantidad: 2,
  };

  it("debería devolver 0 si el carrito está vacío", () => {
    expect(calcularPrecioFinal([], "free")).toBe(0);
  });

  it.each([
    { nivel: "free", esperado: 200 },
    { nivel: "pro", esperado: 180 },
    { nivel: "enterprise", esperado: 160 },
  ] as const)(
    "debería calcular $esperado€ para un usuario con suscripción $nivel",
    ({ nivel, esperado }) => {
      const total = calcularPrecioFinal([teclado], nivel);
      expect(total).toBe(esperado);
    }
  );

  it("debería aplicar un cupón porcentual válido sobre el precio con descuento de suscripción", () => {
    const fechaActual = new Date("2026-06-01T10:00:00Z");
    const cupon: CuponDescuento = {
      tipo: "porcentaje",
      codigo: "VERANO10",
      porcentaje: 10,
      expiraEl: new Date("2026-06-15T00:00:00Z"),
    };

    const total = calcularPrecioFinal([teclado], "pro", cupon, fechaActual);
    expect(total).toBe(162);
  });

  it("debería ignorar un cupón si ya ha expirado", () => {
    const fechaActual = new Date("2026-06-20T10:00:00Z");
    const cuponExpirado: CuponDescuento = {
      tipo: "fijo",
      codigo: "CADUCADO",
      descuentoEuros: 50,
      expiraEl: new Date("2026-06-15T00:00:00Z"),
    };

    const total = calcularPrecioFinal([teclado], "free", cuponExpirado, fechaActual);
    expect(total).toBe(200);
  });

  it("nunca debería devolver un importe negativo si el cupón fijo supera el subtotal", () => {
    const fechaActual = new Date("2026-06-01T10:00:00Z");
    const cuponGigante: CuponDescuento = {
      tipo: "fijo",
      codigo: "REGALO500",
      descuentoEuros: 500,
      expiraEl: new Date("2026-06-15T00:00:00Z"),
    };

    const total = calcularPrecioFinal([teclado], "free", cuponGigante, fechaActual);
    expect(total).toBe(0);
  });

  it("debería lanzar un error si algún producto tiene cantidad cero o negativa", () => {
    const itemInvalido: ItemCarrito = {
      producto: { id: "p2", nombre: "Ratón", precioBase: 50 },
      cantidad: 0,
    };

    expect(() => calcularPrecioFinal([itemInvalido], "free")).toThrow("Cantidad inválida");
  });
});`,
  },
  {
    id: 'test-proc',
    label: 'tests/procesadorPedidos.test.ts',
    isTest: true,
    code: `import { describe, it, expect, vi, beforeEach } from "vitest";
import type {
  ItemCarrito,
  PasarelaPago,
  RepositorioInventario,
} from "@domain/tipos";
import { ProcesadorPedidos } from "@services/procesadorPedidos";

describe("ProcesadorPedidos", () => {
  const inventarioMock: RepositorioInventario = {
    hayStock: vi.fn(),
    descontarStock: vi.fn(),
  };

  const pasarelaMock: PasarelaPago = {
    cobrar: vi.fn(),
  };

  let procesador: ProcesadorPedidos;

  const itemsEjemplo: ItemCarrito[] = [
    { producto: { id: "prod-1", nombre: "Monitor 4K", precioBase: 300 }, cantidad: 1 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    procesador = new ProcesadorPedidos(inventarioMock, pasarelaMock);
  });

  it("debería completar el pedido, cobrar y descontar stock cuando todo es correcto", async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(true);
    vi.mocked(pasarelaMock.cobrar).mockResolvedValue({ transaccionId: "TX-2026-01" });

    const resultado = await procesador.procesar("user-1", "pro", itemsEjemplo);

    expect(resultado).toEqual({
      estado: "completado",
      transaccionId: "TX-2026-01",
      totalCobrado: 270,
    });
    expect(pasarelaMock.cobrar).toHaveBeenCalledWith("user-1", 270);
    expect(inventarioMock.descontarStock).toHaveBeenCalledTimes(1);
    expect(inventarioMock.descontarStock).toHaveBeenCalledWith("prod-1", 1);
  });

  it("debería rechazar el pedido sin cobrar ni descontar stock si no hay inventario", async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(false);

    const resultado = await procesador.procesar("user-1", "free", itemsEjemplo);

    expect(resultado.estado).toBe("rechazado");
    if (resultado.estado === "rechazado") {
      expect(resultado.motivo).toBe("SIN_STOCK");
    }
    expect(pasarelaMock.cobrar).not.toHaveBeenCalled();
    expect(inventarioMock.descontarStock).not.toHaveBeenCalled();
  });

  it("debería rechazar el pedido y NO descontar stock si falla la pasarela de pago", async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(true);
    vi.mocked(pasarelaMock.cobrar).mockRejectedValue(new Error("Tarjeta denegada"));

    const resultado = await procesador.procesar("user-1", "free", itemsEjemplo);

    expect(resultado).toEqual({
      estado: "rechazado",
      motivo: "PAGO_FALLIDO",
      detalle: "Tarjeta denegada",
    });
    expect(inventarioMock.descontarStock).not.toHaveBeenCalled();
  });
});`,
  },
]

export const challenges = [
  {
    id: 'reto-1',
    badge: 'Reto 1 • Tipos Literales y satisfies',
    badgeColor: 'indigo',
    title: 'Calculadora de Gastos de Envío',
    searchable: 'Reto 1 Calculadora Gastos Envio ZonaEnvio satisfies it.each',
    items: [
      'Definir <code>export type ZonaEnvio = "ES" | "EU" | "INT";</code> en <code>src/domain/tipos.ts</code>.',
      'Envío gratuito (<code>0 €</code>) si el importe del pedido es <strong>&gt;= 100 €</strong>.',
      'Tarifas base (&lt; 100 €): <code>"ES" = 5 €</code>, <code>"EU" = 15 €</code>, <code>"INT" = 30 €</code>.',
      'Usuarios <code>"enterprise"</code> tienen un <strong>50% de descuento</strong> en envío. Lanzar error si importe &lt; 0.',
    ],
    hintLabel: 'Ver pista de arquitectura',
    hintHtml:
      'Usa <code>const TARIFAS = { ES: 5, EU: 15, INT: 30 } satisfies Record&lt;ZonaEnvio, number&gt;;</code> y prueba todos los casos borde (99.99 € vs 100 €) con <code>it.each</code>.',
  },
  {
    id: 'reto-2',
    badge: 'Reto 2 • Mocks y Spies',
    badgeColor: 'indigo',
    title: 'Notificador con Degradación Elegante',
    searchable: 'Reto 2 Notificador Pedidos Degradacion elegante spyOn console.warn',
    items: [
      'Añadir interfaz <code>ServicioNotificaciones</code> e inyectarla de forma opcional en <code>ProcesadorPedidos</code>.',
      '<strong>Regla crítica:</strong> Si el envío de confirmación falla (lanza error), <strong>el pedido NO debe rechazarse</strong>; captura el error, registra <code>console.warn</code> y devuelve <code>"completado"</code>.',
    ],
    hintLabel: 'Ver pista de testing',
    hintHtml:
      'En <code>procesadorPedidos.test.ts</code>, usa <code>const warnSpy = vi.spyOn(console, "warn").mockImplementation(() =&gt; {});</code> y verifica que <code>expect(warnSpy).toHaveBeenCalled()</code> mientras el pedido sigue completado.',
  },
  {
    id: 'reto-3',
    badge: 'Reto 3 • Fake Timers',
    badgeColor: 'amber',
    title: 'Control Antifraude por Intentos Fallidos',
    searchable: 'Reto 3 Control Antifraude Fake Timers useFakeTimers advanceTimersByTime',
    items: [
      'Crear <code>ControlFraude</code> con <code>registrarFallo(usuarioId)</code> y <code>estaBloqueado(usuarioId)</code>.',
      'Al acumular <strong>3 fallos</strong>, bloquear al usuario durante <strong>15 minutos</strong>. Tras 15 minutos, desbloquear automáticamente.',
    ],
    hintLabel: 'Ver pista de testing',
    hintHtml:
      'Usa <code>vi.useFakeTimers()</code>, provoca 3 fallos, avanza <code>14 * 60 * 1000</code> ms (sigue bloqueado) y luego avanza <code>61 * 1000</code> ms (ya desbloqueado). Restaura con <code>vi.useRealTimers()</code>.',
  },
  {
    id: 'reto-4',
    badge: 'Reto 4 • Generics + Utility Types',
    badgeColor: 'amber',
    title: 'Repositorio Genérico en Memoria',
    searchable: 'Reto 4 Repositorio Generico Memoria Generics Partial Omit',
    items: [
      'Crear <code>RepositorioMemoria&lt;T extends { id: string }&gt;</code> con <code>guardar</code>, <code>buscarPorId</code>, <code>listarTodos</code>, <code>actualizar</code> y <code>eliminar</code>.',
      '<code>actualizar(id, cambios: Partial&lt;Omit&lt;T, "id"&gt;&gt;)</code> debe impedir mutar el <code>id</code> y lanzar error si no existe.',
    ],
    hintLabel: 'Ver pista de arquitectura',
    hintHtml:
      'Usa un <code>Map&lt;string, T&gt;</code> interno y guarda copias superficiales (<code>{ ...entidad }</code>) para evitar mutaciones externas accidentales.',
  },
  {
    id: 'reto-5',
    badge: 'Reto 5 • TDD Puro (Red → Green → Refactor)',
    badgeColor: 'emerald',
    title: 'Promoción "3x2" en Carrito',
    searchable: 'Reto 5 Promocion 3x2 TDD Red Green Refactor',
    items: [
      'Añadir variante <code>{ tipo: "3x2"; codigo: string; expiraEl: Date }</code> a <code>CuponDescuento</code>.',
      'Por cada 3 unidades de un mismo producto, cobrar solo 2 (ej. 3 uds → paga 2; 4 uds → paga 3; 6 uds → paga 4).',
      '<strong>Obligatorio:</strong> Escribir primero todos los tests y verlos fallar (Red) antes de tocar <code>calculadoraPrecios.ts</code>.',
    ],
    hintLabel: 'Ver fórmula matemática',
    hintHtml:
      '<code>const unidadesGratis = Math.floor(item.cantidad / 3);</code> y <code>const unidadesACobrar = item.cantidad - unidadesGratis;</code>.',
  },
]

export const qualityChecklist = [
  {
    id: 'dod-1',
    titleHtml: '1. Cero <code>any</code> y cero <code>@ts-ignore</code>',
    descHtml:
      'Todo dato externo (APIs, JSON, errores en catch) entra como <code>unknown</code> y se valida explícitamente.',
  },
  {
    id: 'dod-2',
    titleHtml: '2. Sin aserciones no nulas peligrosas (<code>!</code>)',
    descHtml:
      'No usar <code>usuario!.nombre</code>; utilizar guards o encadenamiento opcional <code>?.</code>.',
  },
  {
    id: 'dod-3',
    titleHtml: '3. Dependencias abstraídas tras interfaces',
    descHtml:
      'Bases de datos, pasarelas y servicios externos se inyectan mediante contratos <code>interface</code> para facilitar los mocks.',
  },
  {
    id: 'dod-4',
    titleHtml: '4. Tests 100% independientes y deterministas',
    descHtml:
      'Limpieza garantizada con <code>vi.clearAllMocks()</code> y <code>vi.useRealTimers()</code> en los hooks de ciclo de vida.',
  },
  {
    id: 'dod-5',
    titleHtml: '5. Typecheck en verde (<code>npm run typecheck</code>)',
    descHtml:
      'El compilador termina con 0 errores tanto en <code>src/</code> como en <code>tests/</code>.',
  },
  {
    id: 'dod-6',
    titleHtml: '6. Cobertura de ramas revisada (<code>npm run test:coverage</code>)',
    descHtml: 'Se han probado caminos felices, casos borde y manejo de errores.',
  },
]
