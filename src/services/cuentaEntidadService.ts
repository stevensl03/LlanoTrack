// src/services/cuentaEntidadService.ts
import axios from "axios"
import type { AxiosResponse, AxiosError } from "axios"
import type {
  CuentaCrearRequest,
  CuentaActualizarRequest,
  CuentaResponse,
  EntidadCrearRequest,
  EntidadActualizarRequest,
  EntidadResponse,
  CuentaFiltros,
  EntidadFiltros,
  PaginatedResponse,
  ErrorResponse,
} from "../shared/types/cuentaEntidadType"

// Vite usa import.meta.env para variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1"

class CuentaEntidadService {
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

  // ==================== MÉTODOS PARA CUENTAS ====================

  async crearCuenta(cuentaData: CuentaCrearRequest): Promise<CuentaResponse> {
    try {
      const response = await this.api.post<CuentaResponse>("/cuentas/crear", cuentaData)
      return response.data
    } catch (error) {
      console.error("Error al crear cuenta:", error)
      throw error
    }
  }

  async actualizarCuenta(id: number, cuentaData: CuentaActualizarRequest): Promise<CuentaResponse> {
    try {
      const response = await this.api.put<CuentaResponse>(`/cuentas/actualizar/${id}`, cuentaData)
      return response.data
    } catch (error) {
      console.error("Error al actualizar cuenta:", error)
      throw error
    }
  }

  async eliminarCuenta(id: number): Promise<void> {
    try {
      await this.api.delete(`/cuentas/eliminar/${id}`)
    } catch (error) {
      console.error("Error al eliminar cuenta:", error)
      throw error
    }
  }

  async listarCuentas(): Promise<CuentaResponse[]> {
    try {
      const response = await this.api.get<CuentaResponse[]>("/cuentas")
      return response.data
    } catch (error) {
      console.error("Error al listar cuentas:", error)
      throw error
    }
  }

  async buscarCuentas(query: string): Promise<CuentaResponse[]> {
    try {
      const response = await this.api.get<CuentaResponse[]>("/cuentas/buscar", {
        params: { query },
      })
      return response.data
    } catch (error) {
      console.error("Error al buscar cuentas:", error)
      throw error
    }
  }

    async contarCuentasPorEntidad(entidadId: number): Promise<number> {
        try {
            const response = await this.api.get<number>(`/cuentas/contar/${entidadId}`)
            return response.data
        } catch (error) {
            console.error("Error al contar cuentas por entidad:", error)
            throw error
    }
}

  // ==================== MÉTODOS PARA ENTIDADES ====================

  async crearEntidad(entidadData: EntidadCrearRequest): Promise<EntidadResponse> {
    try {
      const response = await this.api.post<EntidadResponse>("/entidades/crear", entidadData)
      return response.data
    } catch (error) {
      console.error("Error al crear entidad:", error)
      throw error
    }
  }

  async actualizarEntidad(id: number, entidadData: EntidadActualizarRequest): Promise<EntidadResponse> {
    try {
      const response = await this.api.put<EntidadResponse>(`/entidades/actualizar/${id}`, entidadData)
      return response.data
    } catch (error) {
      console.error("Error al actualizar entidad:", error)
      throw error
    }
  }

  async eliminarEntidad(id: number): Promise<void> {
    try {
      await this.api.delete(`/entidades/eliminar/${id}`)
    } catch (error) {
      console.error("Error al eliminar entidad:", error)
      throw error
    }
  }

  async listarEntidades(): Promise<EntidadResponse[]> {
    try {
      const response = await this.api.get<EntidadResponse[]>("/entidades/")
      return response.data
    } catch (error) {
      console.error("Error al listar entidades:", error)
      throw error
    }
  }

  async buscarEntidadesPorNombre(nombre: string): Promise<EntidadResponse[]> {
    try {
      const response = await this.api.get<EntidadResponse[]>("/entidades/buscar", {
        params: { nombre },
      })
      return response.data
    } catch (error) {
      console.error("Error al buscar entidades:", error)
      throw error
    }
  }

  // ==================== MÉTODOS COMBINADOS ====================

  async obtenerCuentasPorEntidad(entidadId: number): Promise<CuentaResponse[]> {
    try {
      const cuentas = await this.listarCuentas()
      return cuentas.filter((cuenta) => cuenta.entidadId === entidadId)
    } catch (error) {
      console.error("Error al obtener cuentas por entidad:", error)
      throw error
    }
  }

  async obtenerEntidadConCuentas(entidadId: number): Promise<{
    entidad: EntidadResponse;
    cuentas: CuentaResponse[];
  }> {
    try {
      const [entidades, cuentas] = await Promise.all([
        this.listarEntidades(),
        this.listarCuentas(),
      ])
      
      const entidad = entidades.find((e) => e.id === entidadId)
      if (!entidad) {
        throw new Error(`Entidad con ID ${entidadId} no encontrada`)
      }

      const cuentasDeEntidad = cuentas.filter((c) => c.entidadId === entidadId)

      return {
        entidad,
        cuentas: cuentasDeEntidad,
      }
    } catch (error) {
      console.error("Error al obtener entidad con cuentas:", error)
      throw error
    }
  }

  // ==================== VALIDACIONES ====================

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(correo)
  }

  validarDominioCorreo(dominio: string): boolean {
    const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/
    return regex.test(dominio)
  }

  extraerDominioDeCorreo(correo: string): string | null {
    const match = correo.match(/@(.+)$/)
    return match ? match[1] : null
  }

  formatearNombreCuenta(cuenta: CuentaResponse): string {
    return `${cuenta.nombreCuenta} (${cuenta.correoCuenta})`
  }

  formatearNombreEntidad(entidad: EntidadResponse): string {
    return `${entidad.nombreEntidad} (${entidad.dominioCorreo})`
  }

  // Verificar si un correo pertenece al dominio de una entidad
  correoPerteneceAEntidad(correo: string, dominioEntidad: string): boolean {
    const dominioCorreo = this.extraerDominioDeCorreo(correo)
    return dominioCorreo?.toLowerCase() === dominioEntidad.toLowerCase()
  }
}

export const cuentaEntidadService = new CuentaEntidadService()
export default cuentaEntidadService