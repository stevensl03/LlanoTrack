# Guía para la Implementación de Endpoints en el Frontend

Este documento describe el patrón de arquitectura y las convenciones a seguir para consumir nuevos endpoints del backend en nuestra aplicación de React.

El objetivo es mantener un código limpio, escalable y, sobre todo, estrictamente tipado para aprovechar al máximo las ventajas de TypeScript.

## El Patrón de Tres Capas

Cada vez que integramos un nuevo endpoint, debemos crear o modificar tres artefactos principales en el frontend:

1.  **Definición de Tipos (`*.types.ts`):** Define la forma de los datos que se envían (Request) y se reciben (Response).
2.  **Capa de Servicio (`*Service.ts`):** Gestiona la comunicación directa con la API a través de HTTP (usando `axios`).
3.  **Hook Personalizado (`use*.ts`):** Abstrae la lógica del servicio, maneja el estado (carga, errores, datos) y expone funciones reutilizables a los componentes de la UI.

A continuación, se detalla cada paso usando como ejemplo la implementación de un endpoint `PUT /usuarios/{id}/estado`.

---

### Paso 1: Definición de Tipos (`/shared/types/`)

La base de una integración robusta es un tipado estricto. **NUNCA** se debe usar `any` o tipos implícitos.

1.  **Interfaces para Request y Response:**
    Crea interfaces que describan exactamente los datos que tu endpoint espera y devuelve. Si el endpoint no devuelve contenido, no es necesario un tipo de respuesta.

    Para nuestro ejemplo, el endpoint para cambiar el estado de un usuario no requiere un cuerpo en la petición (los datos van en la URL) y no devuelve contenido, por lo que podríamos no necesitar nuevos tipos. Sin embargo, si tuviéramos que enviar datos, se vería así:

    ```typescript
    // en /shared/types/usuarioTypes.ts

    // No se necesita un nuevo tipo para la petición porque los datos son primitivos (id, activo)
    // y se pasan directamente a la función del servicio.

    // Si el endpoint devolviera el usuario actualizado, reutilizaríamos la interfaz existente:
    export interface UsuarioResponse {
      id: number;
      nombres: string;
      // ... resto de propiedades
    }
    ```

2.  **PROHIBIDO el uso de `enum`:**
    Los `enum` de TypeScript generan código JavaScript adicional (IIFE) y presentan ciertos problemas en el ecosistema de JavaScript/TypeScript.

    En su lugar, debemos usar **objetos de solo lectura con aserción de constante (`as const`)**. Esto nos da un tipado igual de estricto sin las desventajas de los `enum`.

    **Ejemplo incorrecto (NO HACER):**
    ```typescript
    enum Rol {
      ADMIN = 'ADMINISTRADOR',
      USER = 'USUARIO'
    }
    ```

    **Ejemplo Correcto (ASÍ SE HACE):**
    ```typescript
    // Se define un objeto como constante
    export const Rol = {
      INTEGRADOR: 'INTEGRADOR',
      GESTOR: 'GESTOR',
      REVISOR: 'REVISOR',
      APROBADOR: 'APROBADOR'
    } as const; // La clave: `as const`

    // Se extrae el tipo a partir de los valores del objeto
    export type Rol = typeof Rol[keyof typeof Rol];

    // Uso:
    // const miRol: Rol = Rol.INTEGRADOR; // Correcto
    // const miRol: Rol = 'OTRO_ROL'; // Error de TypeScript
    ```
    Este enfoque es más limpio, no genera código extra en la transpilación y es 100% compatible con el ecosistema de JavaScript.

---

### Paso 2: Implementación del Servicio (`/services/`)

El servicio es el único lugar donde debe existir la lógica de comunicación con la API. Utiliza `axios` para realizar las peticiones.

1.  **Añadir una función asíncrona:**
    Crea un método en la clase del servicio correspondiente. La función debe ser `async` y gestionar la petición y la captura de errores.

2.  **Tipar los parámetros y el retorno:**
    Usa los tipos que definiste en el paso anterior para los argumentos de la función and el tipo de dato que devuelve la promesa.

    ```typescript
    // en /services/usuariosService.ts

    class UsuariosService {
      private api = axios.create(/*...configuración...*/);

      // ... otros métodos ...

      /**
       * Cambia el estado (activo/inactivo) de un usuario.
       * @param id - El ID del usuario.
       * @param activo - El nuevo estado del usuario.
       * @returns Promise<void> porque el endpoint no devuelve contenido.
       */
      async cambiarEstado(id: number, activo: boolean): Promise<void> {
        try {
          // El endpoint es: PUT /usuarios/{id}/estado?activo=true
          await this.api.put(`${USUARIOS_ENDPOINT}${id}/estado`, null, {
            params: {
              activo: activo
            }
          });
          // No se devuelve nada porque la respuesta es 200 OK sin cuerpo.
        } catch (error) {
          console.error(`Error al cambiar el estado del usuario ${id}:`, error);
          throw error; // El error se propaga para ser manejado por el hook.
        }
      }
    }

    export const usuariosService = new UsuariosService();
    ```
    **Nota:** Observa que el segundo argumento de `put` es `null` porque el cuerpo de la petición está vacío. Los parámetros de consulta se pasan en el objeto de configuración de `axios`.

---

### Paso 3: Creación del Hook (`/shared/hooks/`)

El hook es la capa que conecta la lógica de negocio con los componentes de React. Se encarga de la gestión del estado.

1.  **Exponer una función desde el hook:**
    Añade una función (envuelta en `useCallback` para optimización) que los componentes puedan llamar.

2.  **Manejar el ciclo de vida de la petición:**
    -   Establecer `loading` a `true` antes de empezar.
    -   Llamar a la función del servicio dentro de un bloque `try...catch`.
    -   En el `catch`, capturar el error y guardarlo en el estado.
    -   Usar un bloque `finally` para asegurar que `loading` se establezca en `false` al final, tanto si la petición tuvo éxito como si falló.
    -   Actualizar el estado local de los datos si es necesario (por ejemplo, actualizar la lista de usuarios).

    ```typescript
    // en /shared/hooks/useUsuarios.ts

    export const useUsuarios = (/*...*/) => {
      const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);

      // ... otros métodos del hook ...

      const cambiarEstadoUsuario = useCallback(async (id: number, activo: boolean) => {
        setLoading(true);
        setError(null);
        try {
          await usuariosService.cambiarEstado(id, activo);

          // Opcional: Actualizar el estado local para reflejar el cambio en la UI inmediatamente
          // sin tener que volver a pedir todos los datos.
          // NOTA: El usuario no tiene un campo `activo`, si lo tuviera, lo actualizaríamos aquí.
          // Por ejemplo:
          // setUsuarios(prevUsuarios =>
          //   prevUsuarios.map(u => (u.id === id ? { ...u, activo: activo } : u))
          // );

        } catch (err: any) {
          setError(err.message || `Error al cambiar el estado del usuario ${id}`);
          throw err; // Propaga el error por si el componente necesita reaccionar.
        } finally {
          setLoading(false);
        }
      }, []);


      return {
        // ... otros valores de retorno ...
        cambiarEstadoUsuario,
      };
    };
    ```

---

### Resumen del Flujo

El flujo de datos e interacción es el siguiente:

`Componente UI` ➡️ `Llama a función del Hook (useUsuarios)` ➡️ `El Hook llama al Servicio (usuariosService)` ➡️ `El Servicio realiza la petición HTTP (axios)` ➡️ `API Backend`

El estado (`loading`, `error`, `data`) fluye en dirección opuesta, desde el hook hacia el componente, que lo utiliza para renderizar la UI adecuada.
