// src/hooks/useCuentaEntidadService.ts
import { useState, useEffect, useCallback } from 'react'
import { cuentaEntidadService } from '../../services/cuentaEntidadService'
import type {
  CuentaCrearRequest,
  CuentaActualizarRequest,
  CuentaResponse,
  EntidadCrearRequest,
  EntidadActualizarRequest,
  EntidadResponse,
  CuentaFiltros,
  EntidadFiltros,
} from '../types/cuentaEntidadType'

interface UseCuentaEntidadReturn {
  // Estado para cuentas
  cuentas: CuentaResponse[]
  cuentaSeleccionada: CuentaResponse | null
  loadingCuentas: boolean
  errorCuentas: string | null
  
  // Estado para entidades
  entidades: EntidadResponse[]
  entidadSeleccionada: EntidadResponse | null
  loadingEntidades: boolean
  errorEntidades: string | null
  
  // Estado combinado
  loading: boolean
  error: string | null
  
  // Métodos para cuentas
  crearCuenta: (data: CuentaCrearRequest) => Promise<CuentaResponse>
  actualizarCuenta: (id: number, data: CuentaActualizarRequest) => Promise<CuentaResponse>
  eliminarCuenta: (id: number) => Promise<void>
  seleccionarCuenta: (cuenta: CuentaResponse | null) => void
  listarCuentas: () => Promise<void>
  buscarCuentas: (query: string) => Promise<CuentaResponse[]>
  obtenerCuentasPorEntidad: (entidadId: number) => Promise<CuentaResponse[]>
  contarCuentasPorEntidad: (entidadId: number) => Promise<number>
  
  // Métodos para entidades
  crearEntidad: (data: EntidadCrearRequest) => Promise<EntidadResponse>
  actualizarEntidad: (id: number, data: EntidadActualizarRequest) => Promise<EntidadResponse>
  eliminarEntidad: (id: number) => Promise<void>
  seleccionarEntidad: (entidad: EntidadResponse | null) => void
  listarEntidades: () => Promise<void>
  buscarEntidades: (nombre: string) => Promise<EntidadResponse[]>
  
  // Métodos combinados
  obtenerEntidadConCuentas: (entidadId: number) => Promise<{
    entidad: EntidadResponse
    cuentas: CuentaResponse[]
  }>
  
  // Métodos auxiliares
  limpiarErrores: () => void
  resetearEstado: () => void
}

export const useCuentaEntidadService = (): UseCuentaEntidadReturn => {
  // Estado para cuentas
  const [cuentas, setCuentas] = useState<CuentaResponse[]>([])
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<CuentaResponse | null>(null)
  const [loadingCuentas, setLoadingCuentas] = useState<boolean>(false)
  const [errorCuentas, setErrorCuentas] = useState<string | null>(null)
  
  // Estado para entidades
  const [entidades, setEntidades] = useState<EntidadResponse[]>([])
  const [entidadSeleccionada, setEntidadSeleccionada] = useState<EntidadResponse | null>(null)
  const [loadingEntidades, setLoadingEntidades] = useState<boolean>(false)
  const [errorEntidades, setErrorEntidades] = useState<string | null>(null)
  
  // Estado combinado
  const loading = loadingCuentas || loadingEntidades
  const error = errorCuentas || errorEntidades
  
  // Limpiar errores
  const limpiarErrores = useCallback(() => {
    setErrorCuentas(null)
    setErrorEntidades(null)
  }, [])
  
  // Resetear estado
  const resetearEstado = useCallback(() => {
    setCuentas([])
    setCuentaSeleccionada(null)
    setLoadingCuentas(false)
    setErrorCuentas(null)
    
    setEntidades([])
    setEntidadSeleccionada(null)
    setLoadingEntidades(false)
    setErrorEntidades(null)
  }, [])
  
  // ==================== MÉTODOS PARA CUENTAS ====================
  
  const listarCuentas = useCallback(async (): Promise<void> => {
    setLoadingCuentas(true)
    setErrorCuentas(null)
    try {
      const data = await cuentaEntidadService.listarCuentas()
      setCuentas(data)
    } catch (err: any) {
      setErrorCuentas(err.message || 'Error al listar cuentas')
      throw err
    } finally {
      setLoadingCuentas(false)
    }
  }, [])
  
  const crearCuenta = useCallback(async (data: CuentaCrearRequest): Promise<CuentaResponse> => {
    setLoadingCuentas(true)
    setErrorCuentas(null)
    try {
      const nuevaCuenta = await cuentaEntidadService.crearCuenta(data)
      setCuentas(prev => [...prev, nuevaCuenta])
      return nuevaCuenta
    } catch (err: any) {
      setErrorCuentas(err.message || 'Error al crear cuenta')
      throw err
    } finally {
      setLoadingCuentas(false)
    }
  }, [])
  
  const actualizarCuenta = useCallback(async (
    id: number, 
    data: CuentaActualizarRequest
  ): Promise<CuentaResponse> => {
    setLoadingCuentas(true)
    setErrorCuentas(null)
    try {
      const cuentaActualizada = await cuentaEntidadService.actualizarCuenta(id, data)
      setCuentas(prev => prev.map(c => c.id === id ? cuentaActualizada : c))
      if (cuentaSeleccionada?.id === id) {
        setCuentaSeleccionada(cuentaActualizada)
      }
      return cuentaActualizada
    } catch (err: any) {
      setErrorCuentas(err.message || 'Error al actualizar cuenta')
      throw err
    } finally {
      setLoadingCuentas(false)
    }
  }, [cuentaSeleccionada])
  
  const eliminarCuenta = useCallback(async (id: number): Promise<void> => {
    setLoadingCuentas(true)
    setErrorCuentas(null)
    try {
      await cuentaEntidadService.eliminarCuenta(id)
      setCuentas(prev => prev.filter(c => c.id !== id))
      if (cuentaSeleccionada?.id === id) {
        setCuentaSeleccionada(null)
      }
    } catch (err: any) {
      setErrorCuentas(err.message || 'Error al eliminar cuenta')
      throw err
    } finally {
      setLoadingCuentas(false)
    }
  }, [cuentaSeleccionada])
  
  const buscarCuentas = useCallback(async (query: string): Promise<CuentaResponse[]> => {
    setLoadingCuentas(true)
    setErrorCuentas(null)
    try {
      const resultados = await cuentaEntidadService.buscarCuentas(query)
      return resultados
    } catch (err: any) {
      setErrorCuentas(err.message || 'Error al buscar cuentas')
      throw err
    } finally {
      setLoadingCuentas(false)
    }
  }, [])
  
  const obtenerCuentasPorEntidad = useCallback(async (entidadId: number): Promise<CuentaResponse[]> => {
    setLoadingCuentas(true)
    setErrorCuentas(null)
    try {
      const cuentasFiltradas = await cuentaEntidadService.obtenerCuentasPorEntidad(entidadId)
      return cuentasFiltradas
    } catch (err: any) {
      setErrorCuentas(err.message || 'Error al obtener cuentas por entidad')
      throw err
    } finally {
      setLoadingCuentas(false)
    }
  }, [])
  
  const seleccionarCuenta = useCallback((cuenta: CuentaResponse | null) => {
    setCuentaSeleccionada(cuenta)
  }, [])

    // Agrega esto en la sección "MÉTODOS PARA CUENTAS" después de obtenerCuentasPorEntidad
    const contarCuentasPorEntidad = useCallback(async (entidadId: number): Promise<number> => {
        setLoadingCuentas(true)
        setErrorCuentas(null)
        try {
            const cantidad = await cuentaEntidadService.contarCuentasPorEntidad(entidadId)
            return cantidad
        } catch (err: any) {
            setErrorCuentas(err.message || 'Error al contar cuentas por entidad')
            throw err
        } finally {
            setLoadingCuentas(false)
        }
    }, [])
  
  // ==================== MÉTODOS PARA ENTIDADES ====================
  
    // En useCuentaEntidadService.ts, actualiza el método listarEntidades:
    const listarEntidades = useCallback(async (): Promise<void> => {
    setLoadingEntidades(true);
    setErrorEntidades(null);
    try {
        const data = await cuentaEntidadService.listarEntidades();
        
        // Para cada entidad, obtener el contador de cuentas
        const entidadesConContador = await Promise.all(
        data.map(async (entidad) => {
            try {
            const totalCuentas = await cuentaEntidadService.contarCuentasPorEntidad(entidad.id);
            return { ...entidad, totalCuentas };
            } catch (error) {
            // Si falla el contador, usar 0
            return { ...entidad, totalCuentas: 0 };
            }
        })
        );
        
        setEntidades(entidadesConContador);
    } catch (err: any) {
        setErrorEntidades(err.message || 'Error al listar entidades');
        throw err;
    } finally {
        setLoadingEntidades(false);
    }
    }, []);
  const crearEntidad = useCallback(async (data: EntidadCrearRequest): Promise<EntidadResponse> => {
    setLoadingEntidades(true)
    setErrorEntidades(null)
    try {
      const nuevaEntidad = await cuentaEntidadService.crearEntidad(data)
      setEntidades(prev => [...prev, nuevaEntidad])
      return nuevaEntidad
    } catch (err: any) {
      setErrorEntidades(err.message || 'Error al crear entidad')
      throw err
    } finally {
      setLoadingEntidades(false)
    }
  }, [])
  
  const actualizarEntidad = useCallback(async (
    id: number, 
    data: EntidadActualizarRequest
  ): Promise<EntidadResponse> => {
    setLoadingEntidades(true)
    setErrorEntidades(null)
    try {
      const entidadActualizada = await cuentaEntidadService.actualizarEntidad(id, data)
      setEntidades(prev => prev.map(e => e.id === id ? entidadActualizada : e))
      if (entidadSeleccionada?.id === id) {
        setEntidadSeleccionada(entidadActualizada)
      }
      return entidadActualizada
    } catch (err: any) {
      setErrorEntidades(err.message || 'Error al actualizar entidad')
      throw err
    } finally {
      setLoadingEntidades(false)
    }
  }, [entidadSeleccionada])
  
  const eliminarEntidad = useCallback(async (id: number): Promise<void> => {
    setLoadingEntidades(true)
    setErrorEntidades(null)
    try {
      await cuentaEntidadService.eliminarEntidad(id)
      setEntidades(prev => prev.filter(e => e.id !== id))
      if (entidadSeleccionada?.id === id) {
        setEntidadSeleccionada(null)
      }
    } catch (err: any) {
      setErrorEntidades(err.message || 'Error al eliminar entidad')
      throw err
    } finally {
      setLoadingEntidades(false)
    }
  }, [entidadSeleccionada])
  
  const buscarEntidades = useCallback(async (nombre: string): Promise<EntidadResponse[]> => {
    setLoadingEntidades(true)
    setErrorEntidades(null)
    try {
      const resultados = await cuentaEntidadService.buscarEntidadesPorNombre(nombre)
      return resultados
    } catch (err: any) {
      setErrorEntidades(err.message || 'Error al buscar entidades')
      throw err
    } finally {
      setLoadingEntidades(false)
    }
  }, [])
  
  const seleccionarEntidad = useCallback((entidad: EntidadResponse | null) => {
    setEntidadSeleccionada(entidad)
  }, [])
  
  // ==================== MÉTODOS COMBINADOS ====================
  
  const obtenerEntidadConCuentas = useCallback(async (
    entidadId: number
  ): Promise<{ entidad: EntidadResponse; cuentas: CuentaResponse[] }> => {
    setLoadingEntidades(true)
    setLoadingCuentas(true)
    setErrorEntidades(null)
    setErrorCuentas(null)
    
    try {
      const resultado = await cuentaEntidadService.obtenerEntidadConCuentas(entidadId)
      return resultado
    } catch (err: any) {
      const mensaje = err.message || 'Error al obtener entidad con cuentas'
      setErrorEntidades(mensaje)
      setErrorCuentas(mensaje)
      throw err
    } finally {
      setLoadingEntidades(false)
      setLoadingCuentas(false)
    }
  }, [])
  
  // ==================== EFECTOS INICIALES ====================
  
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        await Promise.all([listarCuentas(), listarEntidades()])
      } catch (err) {
        console.error('Error al cargar datos iniciales:', err)
      }
    }
    
    cargarDatosIniciales()
  }, [listarCuentas, listarEntidades])
  
  return {
    // Estado para cuentas
    cuentas,
    cuentaSeleccionada,
    loadingCuentas,
    errorCuentas,
    
    // Estado para entidades
    entidades,
    entidadSeleccionada,
    loadingEntidades,
    errorEntidades,
    
    // Estado combinado
    loading,
    error,
    
    // Métodos para cuentas
    crearCuenta,
    actualizarCuenta,
    eliminarCuenta,
    seleccionarCuenta,
    listarCuentas,
    buscarCuentas,
    obtenerCuentasPorEntidad,
    contarCuentasPorEntidad,
    
    // Métodos para entidades
    crearEntidad,
    actualizarEntidad,
    eliminarEntidad,
    seleccionarEntidad,
    listarEntidades,
    buscarEntidades,
    
    // Métodos combinados
    obtenerEntidadConCuentas,
    
    // Métodos auxiliares
    limpiarErrores,
    resetearEstado,
  }
}

export default useCuentaEntidadService