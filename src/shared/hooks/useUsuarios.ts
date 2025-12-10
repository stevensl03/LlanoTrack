// src/hooks/useUsuarios.ts
import { useState, useEffect, useCallback } from 'react';
import { usuariosService } from '../../services/usuariosService';
import type {
  UsuarioResponse,
  UsuarioCrearRequest,
  UsuarioActualizarRequest,
  UsuarioFiltros,
  PaginatedResponse,
  Rol
} from '../types/usuarioTypes';

interface UseUsuariosReturn {
  // Estado
  usuarios: UsuarioResponse[];
  usuarioSeleccionado: UsuarioResponse | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };

  // Métodos CRUD
  crearUsuario: (data: UsuarioCrearRequest) => Promise<UsuarioResponse>;
  actualizarUsuario: (id: number, data: UsuarioActualizarRequest) => Promise<UsuarioResponse>;
  eliminarUsuario: (id: number) => Promise<void>;
  seleccionarUsuario: (usuario: UsuarioResponse | null) => void;
  
  // Métodos de gestión de estado (activar/desactivar)
  cambiarEstadoUsuario: (id: number, activo: boolean) => Promise<void>;
  activarUsuario: (id: number) => Promise<void>;
  desactivarUsuario: (id: number) => Promise<void>;
  
  // Métodos de consulta
  obtenerUsuarios: () => Promise<void>;
  obtenerUsuarioPorId: (id: number) => Promise<UsuarioResponse>;
  buscarUsuariosPorNombre: (nombre: string) => Promise<UsuarioResponse[]>;
  buscarUsuariosPorRol: (rol: Rol | string) => Promise<UsuarioResponse[]>;
  obtenerUsuarioPorCorreo: (correo: string) => Promise<UsuarioResponse>;
  buscarUsuariosPorCorreo: (correo: string) => Promise<UsuarioResponse[]>;
  
  // Métodos de paginación
  obtenerUsuariosPaginados: (page: number, size: number) => Promise<void>;
  cambiarPagina: (page: number) => Promise<void>;
  cambiarTamanoPagina: (size: number) => Promise<void>;
  
  // Métodos auxiliares
  limpiarError: () => void;
  resetearEstado: () => void;
  actualizarListaLocal: (usuarioActualizado: UsuarioResponse) => void;
}

export const useUsuarios = (initialPage: number = 0, initialSize: number = 10): UseUsuariosReturn => {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    size: initialSize,
    total: 0,
    totalPages: 0
  });

  // Limpiar error
  const limpiarError = () => setError(null);

  // Resetear estado
  const resetearEstado = () => {
    setUsuarios([]);
    setUsuarioSeleccionado(null);
    setLoading(false);
    setError(null);
    setPagination({
      page: initialPage,
      size: initialSize,
      total: 0,
      totalPages: 0
    });
  };

  // Actualizar usuario en la lista local
  const actualizarListaLocal = useCallback((usuarioActualizado: UsuarioResponse) => {
    setUsuarios(prev => prev.map(u => 
      u.id === usuarioActualizado.id ? usuarioActualizado : u
    ));
    
    if (usuarioSeleccionado?.id === usuarioActualizado.id) {
      setUsuarioSeleccionado(usuarioActualizado);
    }
  }, [usuarioSeleccionado]);

  // ========== MÉTODOS DE GESTIÓN DE ESTADO (ACTIVAR/DESACTIVAR) ==========

  /**
   * Cambia el estado de un usuario (activo/inactivo)
   */
  const cambiarEstadoUsuario = useCallback(async (id: number, activo: boolean): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await usuariosService.cambiarEstadoUsuario(id, activo);
      
      // Actualizar usuario en la lista local
      const usuarioActualizado = await usuariosService.obtenerUsuarioPorId(id);
      actualizarListaLocal(usuarioActualizado);
      
    } catch (err: any) {
      const mensaje = err.message || `Error al cambiar estado del usuario ${id}`;
      setError(mensaje);
      throw new Error(mensaje);
    } finally {
      setLoading(false);
    }
  }, [actualizarListaLocal]);

  /**
   * Activa un usuario (establece activo = true)
   */
  const activarUsuario = useCallback(async (id: number): Promise<void> => {
    return cambiarEstadoUsuario(id, true);
  }, [cambiarEstadoUsuario]);

  /**
   * Desactiva un usuario (establece activo = false)
   */
  const desactivarUsuario = useCallback(async (id: number): Promise<void> => {
    return cambiarEstadoUsuario(id, false);
  }, [cambiarEstadoUsuario]);

  // ========== MÉTODOS EXISTENTES (CRUD) ==========

  // Obtener todos los usuarios (sin paginación)
  const obtenerUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usuariosService.obtenerTodosUsuarios();
      setUsuarios(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener usuarios');
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener usuarios paginados
  const obtenerUsuariosPaginados = useCallback(async (page: number, size: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await usuariosService.obtenerUsuariosPaginados(page, size);
      setUsuarios(response.content);
      setPagination({
        page: response.number,
        size: response.size,
        total: response.totalElements,
        totalPages: response.totalPages
      });
    } catch (err: any) {
      setError(err.message || 'Error al obtener usuarios paginados');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cambiar página
  const cambiarPagina = useCallback(async (page: number) => {
    await obtenerUsuariosPaginados(page, pagination.size);
  }, [pagination.size, obtenerUsuariosPaginados]);

  // Cambiar tamaño de página
  const cambiarTamanoPagina = useCallback(async (size: number) => {
    await obtenerUsuariosPaginados(0, size);
  }, [obtenerUsuariosPaginados]);

  // Obtener usuario por ID
  const obtenerUsuarioPorId = useCallback(async (id: number): Promise<UsuarioResponse> => {
    setLoading(true);
    setError(null);
    try {
      const usuario = await usuariosService.obtenerUsuarioPorId(id);
      setUsuarioSeleccionado(usuario);
      return usuario;
    } catch (err: any) {
      setError(err.message || `Error al obtener usuario ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear usuario
  const crearUsuario = useCallback(async (data: UsuarioCrearRequest): Promise<UsuarioResponse> => {
    setLoading(true);
    setError(null);
    try {
      const nuevoUsuario = await usuariosService.crearUsuario(data);
      // Actualizar lista localmente
      setUsuarios(prev => [...prev, nuevoUsuario]);
      return nuevoUsuario;
    } catch (err: any) {
      setError(err.message || 'Error al crear usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar usuario
  const actualizarUsuario = useCallback(async (id: number, data: UsuarioActualizarRequest): Promise<UsuarioResponse> => {
    setLoading(true);
    setError(null);
    try {
      const usuarioActualizado = await usuariosService.actualizarUsuario(id, data);
      actualizarListaLocal(usuarioActualizado);
      return usuarioActualizado;
    } catch (err: any) {
      setError(err.message || `Error al actualizar usuario ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [actualizarListaLocal]);

  // Eliminar usuario
  const eliminarUsuario = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await usuariosService.eliminarUsuario(id);
      // Actualizar lista localmente
      setUsuarios(prev => prev.filter(u => u.id !== id));
      if (usuarioSeleccionado?.id === id) {
        setUsuarioSeleccionado(null);
      }
    } catch (err: any) {
      setError(err.message || `Error al eliminar usuario ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [usuarioSeleccionado]);

  // Buscar por nombre
  const buscarUsuariosPorNombre = useCallback(async (nombre: string): Promise<UsuarioResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const resultados = await usuariosService.buscarUsuariosPorNombre(nombre);
      return resultados;
    } catch (err: any) {
      setError(err.message || 'Error al buscar usuarios por nombre');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar por rol
  const buscarUsuariosPorRol = useCallback(async (rol: Rol | string): Promise<UsuarioResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const resultados = await usuariosService.buscarUsuariosPorRol(rol);
      return resultados;
    } catch (err: any) {
      setError(err.message || 'Error al buscar usuarios por rol');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar por correo
const obtenerUsuarioPorCorreo = useCallback(async (correo: string): Promise<UsuarioResponse> => {
  setLoading(true);
  setError(null);
  try {
    const usuario = await usuariosService.obtenerUsuarioPorCorreo(correo);
    setUsuarioSeleccionado(usuario);
    return usuario;
  } catch (err: any) {
    setError(err.message || `Error al obtener usuario por correo ${correo}`);
    throw err;
  } finally {
    setLoading(false);
  }
}, []);

const buscarUsuariosPorCorreo = useCallback(async (correo: string): Promise<UsuarioResponse[]> => {
  setLoading(true);
  setError(null);
  try {
    const resultados = await usuariosService.buscarUsuariosPorCorreo(correo);
    return resultados;
  } catch (err: any) {
    setError(err.message || 'Error al buscar usuarios por correo');
    throw err;
  } finally {
    setLoading(false);
  }
}, []);

  // Seleccionar usuario
  const seleccionarUsuario = useCallback((usuario: UsuarioResponse | null) => {
    setUsuarioSeleccionado(usuario);
  }, []);

  // Cargar usuarios inicialmente
  useEffect(() => {
    obtenerUsuariosPaginados(initialPage, initialSize);
  }, [initialPage, initialSize, obtenerUsuariosPaginados]);

  return {
    // Estado
    usuarios,
    usuarioSeleccionado,
    loading,
    error,
    pagination,

    // Métodos CRUD
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    seleccionarUsuario,

    // Métodos de gestión de estado
    cambiarEstadoUsuario,
    activarUsuario,
    desactivarUsuario,

    // Métodos de consulta
    obtenerUsuarios,
    obtenerUsuarioPorId,
    buscarUsuariosPorNombre,
    buscarUsuariosPorRol,
    obtenerUsuarioPorCorreo,
    buscarUsuariosPorCorreo,

    // Métodos de paginación
    obtenerUsuariosPaginados,
    cambiarPagina,
    cambiarTamanoPagina,

    // Métodos auxiliares
    limpiarError,
    resetearEstado,
    actualizarListaLocal
  };
};

export default useUsuarios;