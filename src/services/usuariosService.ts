import axios from "axios"
import type { AxiosResponse, AxiosError } from "axios"
import type {
  UsuarioCrearRequest,
  UsuarioActualizarRequest,
  UsuarioResponse,
  UsuarioFiltros,
  PaginatedResponse,
  ErrorResponse,
} from "../shared/types/usuarioTypes"
import type { Rol } from "../shared/types/usuarioTypes"

// Vite usa import.meta.env para variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1"
const USUARIOS_ENDPOINT = `${API_BASE_URL}/usuarios/`

class UsuariosService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })

  constructor() {
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.response) {
          console.error("Error en respuesta:", error.response.data)
          return Promise.reject(error.response.data)
        } else if (error.request) {
          console.error("Error en la solicitud:", error.request)
          return Promise.reject({ message: "Error de conexión con el servidor" })
        } else {
          console.error("Error:", error.message)
          return Promise.reject({ message: error.message })
        }
      },
    )
  }

  // ==================== CRUD ====================

  async crearUsuario(usuarioData: UsuarioCrearRequest): Promise<UsuarioResponse> {
    try {
      const response = await this.api.post<UsuarioResponse>(`${USUARIOS_ENDPOINT}crear`, usuarioData)
      return response.data
    } catch (error) {
      console.error("Error al crear usuario:", error)
      throw error
    }
  }

  async actualizarUsuario(id: number, usuarioData: UsuarioActualizarRequest): Promise<UsuarioResponse> {
    try {
      const response = await this.api.put<UsuarioResponse>(`${USUARIOS_ENDPOINT}actualizar/${id}`, usuarioData)
      return response.data
    } catch (error) {
      console.error("Error al actualizar usuario:", error)
      throw error
    }
  }

  async eliminarUsuario(id: number): Promise<void> {
    try {
      await this.api.delete(`${USUARIOS_ENDPOINT}eliminar/${id}`)
    } catch (error) {
      console.error("Error al eliminar usuario:", error)
      throw error
    }
  }

  // ==================== GESTIÓN DE ESTADO ====================

  /**
   * Cambia el estado (activo/inactivo) de un usuario
   * @param id - ID del usuario
   * @param activo - Nuevo estado (true = activo, false = inactivo)
   */
  async cambiarEstadoUsuario(id: number, activo: boolean): Promise<void> {
    try {
      await this.api.put(`${USUARIOS_ENDPOINT}${id}/estado`, null, {
        params: { activo }
      })
    } catch (error) {
      console.error(`Error al cambiar estado del usuario ${id}:`, error)
      throw error
    }
  }

  /**
   * Método conveniente para desactivar un usuario
   * @param id - ID del usuario
   */
  async desactivarUsuario(id: number): Promise<void> {
    return this.cambiarEstadoUsuario(id, false)
  }

  /**
   * Método conveniente para activar un usuario
   * @param id - ID del usuario
   */
  async activarUsuario(id: number): Promise<void> {
    return this.cambiarEstadoUsuario(id, true)
  }

  // ==================== CONSULTAS ====================

  async obtenerTodosUsuarios(): Promise<UsuarioResponse[]> {
    try {
      const response = await this.api.get<UsuarioResponse[]>(`${USUARIOS_ENDPOINT}usuarios`)
      return response.data
    } catch (error) {
      console.error("Error al obtener usuarios:", error)
      throw error
    }
  }

  async obtenerUsuarioPorId(id: number): Promise<UsuarioResponse> {
    try {
      const response = await this.api.get<UsuarioResponse>(`${USUARIOS_ENDPOINT}${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error)
      throw error
    }
  }

  async buscarUsuariosPorNombre(nombre: string): Promise<UsuarioResponse[]> {
    try {
      const response = await this.api.get<UsuarioResponse[]>(`${USUARIOS_ENDPOINT}buscar/nombre`, {
        params: { nombre },
      })
      return response.data
    } catch (error) {
      console.error("Error al buscar usuarios por nombre:", error)
      throw error
    }
  }

  async buscarUsuariosPorRol(rol: Rol | string): Promise<UsuarioResponse[]> {
    try {
      const rolString = typeof rol === "string" ? rol : String(rol)
      const response = await this.api.get<UsuarioResponse[]>(`${USUARIOS_ENDPOINT}buscar/rol`, {
        params: { rol: rolString },
      })
      return response.data
    } catch (error) {
      console.error("Error al buscar usuarios por rol:", error)
      throw error
    }
  }

  async obtenerUsuariosPorRol(rol: Rol | string): Promise<UsuarioResponse[]> {
    try {
      const rolString = typeof rol === "string" ? rol : String(rol)
      const response = await this.api.get<UsuarioResponse[]>(`${USUARIOS_ENDPOINT}rol/${rolString}`)
      return response.data
    } catch (error) {
      console.error("Error al obtener usuarios por rol:", error)
      throw error
    }
  }

  async obtenerUsuariosPaginados(
    pagina = 0,
    tamano = 10,
    ordenarPor = "nombres",
    direccion: "ASC" | "DESC" = "ASC",
  ): Promise<PaginatedResponse<UsuarioResponse>> {
    try {
      const response = await this.api.get<PaginatedResponse<UsuarioResponse>>(`${USUARIOS_ENDPOINT}pagina`, {
        params: {
          pagina,
          tamano,
          ordenarPor,
          direccion,
        },
      })
      return response.data
    } catch (error) {
      console.error("Error al obtener usuarios paginados:", error)
      throw error
    }
  }

  async buscarUsuariosConFiltros(filtros: UsuarioFiltros): Promise<PaginatedResponse<UsuarioResponse>> {
    try {
      const params: any = {
        pagina: filtros.pagina || 0,
        tamano: filtros.tamano || 10,
      }
      
      if (filtros.ordenarPor) params.ordenarPor = filtros.ordenarPor
      if (filtros.direccion) params.direccion = filtros.direccion
      
      const response = await this.api.get<PaginatedResponse<UsuarioResponse>>(`${USUARIOS_ENDPOINT}pagina`, {
        params,
      })
      return response.data
    } catch (error) {
      console.error("Error al buscar usuarios con filtros:", error)
      throw error
    }
  }

  // ==================== UTILIDADES ====================

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(correo)
  }

  validarTelefonoColombiano(telefono: string): boolean {
    const regex = /^(3[0-2]|[2-9][0-9])[0-9]{7}$/
    return regex.test(telefono.replace(/\D/g, ''))
  }

  formatearNombreCompleto(usuario: UsuarioResponse): string {
    return `${usuario.nombres} ${usuario.apellidos}`
  }

  tieneRol(usuario: UsuarioResponse, rol: Rol): boolean {
    return usuario.roles.includes(rol as string)
  }

  obtenerRolesComoString(usuario: UsuarioResponse): string {
    return Array.isArray(usuario.roles) ? usuario.roles.join(", ") : ""
  }
}

export const usuariosService = new UsuariosService()
export default usuariosService