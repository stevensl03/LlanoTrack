"use client"

import type React from "react"
import { useState } from "react"
import { useUsuarios } from "../../../shared/hooks/useUsuarios"
import type { UsuarioResponse, Rol } from "../../../shared/types/usuarioTypes"
import { Rol as RolEnum } from "../../../shared/types/usuarioTypes"
import UserModal from "../components/modal/UserModal"
import UsersTable from "../components/modal/UsersTable"
import UsersHeader from "../components/modal/UsersHeader"

const UsersManagementPage: React.FC = () => {
  const {
    usuarios,
    usuarioSeleccionado,
    loading,
    error,
    pagination,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    // 🔥 AGREGAR ESTOS MÉTODOS (debes tenerlos en tu hook):
    activarUsuario,
    desactivarUsuario,
    cambiarEstadoUsuario,
    seleccionarUsuario,
    obtenerUsuarioPorId,
    buscarUsuariosPorNombre,
    buscarUsuariosPorRol,
    cambiarPagina,
    cambiarTamanoPagina,
    limpiarError,
    resetearEstado,
  } = useUsuarios()

  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<UsuarioResponse | null>(null)
  const [filtroRol, setFiltroRol] = useState<string>("")
  const [modoBusqueda, setModoBusqueda] = useState<"todos" | "nombre" | "rol">("todos")
  const [cambiandoEstados, setCambiandoEstados] = useState<Set<number>>(new Set()) // 🔥 AGREGAR ESTADO

  // 🔥 ACTUALIZAR: Incluir propiedad activo (si tu UsuarioResponse no la tiene, asumimos true)
  const usuariosParaTabla = usuarios.map((usuario) => ({
    id: usuario.id.toString(),
    nombre: `${usuario.nombres} ${usuario.apellidos || ""}`.trim(),
    email: usuario.correo,
    rol: usuario.roles.length > 0 ? usuario.roles[0] : "Sin rol",
    roles: usuario.roles,
    activo: (usuario as any).activo ?? true, // 🔥 Usar la propiedad activo si existe
    numeroCelular: usuario.numeroCelular,
    datosCompletos: usuario,
  }))

  const filteredUsers = usuariosParaTabla.filter((user) =>
    searchTerm === ""
      ? true
      : user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearchByName = async () => {
    if (searchTerm.trim()) {
      setModoBusqueda("nombre")
      try {
        await buscarUsuariosPorNombre(searchTerm)
      } catch (err) {
        console.error("Error en búsqueda:", err)
      }
    } else {
      cambiarPagina(0)
      setModoBusqueda("todos")
    }
  }

  const handleFilterByRole = async (rol: string) => {
    setFiltroRol(rol)
    if (rol) {
      setModoBusqueda("rol")
      try {
        await buscarUsuariosPorRol(rol)
      } catch (err) {
        console.error("Error al filtrar por rol:", err)
      }
    } else {
      cambiarPagina(0)
      setModoBusqueda("todos")
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      try {
        await eliminarUsuario(Number.parseInt(id))
      } catch (err: any) {
        alert(err.message || "Error al eliminar usuario")
      }
    }
  }

  // 🔥 REEMPLAZAR COMPLETAMENTE ESTA FUNCIÓN:
  const handleToggleActivo = async (id: string, activoActual: boolean) => {
    const usuarioId = Number.parseInt(id)
    const nuevoEstado = !activoActual
    const accion = nuevoEstado ? "activar" : "desactivar"
    
    // Confirmación más detallada
    const confirmMessage = `¿Está seguro de ${accion} este usuario?\n\n${
      nuevoEstado 
        ? "El usuario recuperará acceso al sistema."
        : "El usuario perderá acceso al sistema pero no será eliminado."
    }`
    
    if (!window.confirm(confirmMessage)) {
      return
    }

    try {
      // Marcar que estamos cambiando este usuario
      setCambiandoEstados(prev => new Set(prev).add(usuarioId))
      
      // Usar el método del hook
      if (activoActual) {
        await desactivarUsuario(usuarioId)
      } else {
        await activarUsuario(usuarioId)
      }
      
      // Mostrar mensaje de éxito
      alert(`Usuario ${accion === "activar" ? "activado" : "desactivado"} exitosamente`)
      
    } catch (err: any) {
      console.error(`Error al ${accion} usuario:`, err)
      alert(err.message || `Error al ${accion} el usuario`)
    } finally {
      // Limpiar el estado de cambio
      setCambiandoEstados(prev => {
        const nuevoSet = new Set(prev)
        nuevoSet.delete(usuarioId)
        return nuevoSet
      })
    }
  }

  const handleEdit = async (userId: string) => {
    try {
      const usuario = await obtenerUsuarioPorId(Number.parseInt(userId))
      setEditingUser(usuario)
      setShowModal(true)
    } catch (err: any) {
      alert(err.message || "Error al cargar usuario")
    }
  }

  const handleSave = async (userData: any) => {
    try {
      if (editingUser) {
        const updateData = {
          nombres: userData.nombres,
          apellidos: userData.apellidos || "",
          correo: userData.correo,
          numeroCelular: userData.numeroCelular,
          roles: userData.roles,
        }
        await actualizarUsuario(editingUser.id, updateData)
      } else {
        const createData = {
          nombres: userData.nombres,
          apellidos: userData.apellidos || "",
          correo: userData.correo,
          numeroCelular: userData.numeroCelular,
          password: userData.password,
          roles: userData.roles,
        }
        await crearUsuario({ ...createData, activo: true })
      }
      setShowModal(false)
      setEditingUser(null)
    } catch (err: any) {
      alert(err.message || "Error al guardar usuario")
    }
  }

  const handleAddNew = () => {
    setEditingUser(null)
    setShowModal(true)
  }

  const rolesDisponibles: Rol[] = [RolEnum.INTEGRADOR, RolEnum.GESTOR, RolEnum.REVISOR, RolEnum.APROBADOR]

  if (loading && usuarios.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          Cargando usuarios...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <div className="flex justify-between items-center">
            <div>
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
            <button onClick={limpiarError} className="text-red-700 hover:text-red-900">
              ✕
            </button>
          </div>
        </div>
        <button
          onClick={() => cambiarPagina(0)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <UsersHeader onAddNew={handleAddNew} loading={loading} totalUsuarios={pagination.total} />

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearchByName()}
              disabled={loading}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
            <button
              onClick={handleSearchByName}
              className="absolute right-2 top-1.5 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              Buscar
            </button>
          </div>
        </div>

        <div>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filtroRol}
            onChange={(e) => handleFilterByRole(e.target.value)}
            disabled={loading}
          >
            <option value="">Todos los roles</option>
            {rolesDisponibles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between text-sm text-gray-600">
        <div>
          Mostrando <span className="font-semibold">{filteredUsers.length}</span> de{" "}
          <span className="font-semibold">{pagination.total}</span> usuarios
          {modoBusqueda === "nombre" && searchTerm && (
            <span className="ml-2">
              para "<span className="font-semibold">{searchTerm}</span>"
            </span>
          )}
          {modoBusqueda === "rol" && filtroRol && (
            <span className="ml-2">
              con rol <span className="font-semibold">{filtroRol}</span>
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2">Mostrar:</span>
            <select
              className="px-2 py-1 border rounded"
              value={pagination.size}
              onChange={(e) => cambiarTamanoPagina(Number.parseInt(e.target.value))}
              disabled={loading}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      <UsersTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActivo={handleToggleActivo}
        cambiandoEstados={cambiandoEstados} // 🔥 PASAR EL ESTADO DE CAMBIOS
        loading={loading}
      />

      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => cambiarPagina(pagination.page - 1)}
              disabled={pagination.page === 0 || loading}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              &larr; Anterior
            </button>
            {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
              let pageNum
              if (pagination.totalPages <= 5) {
                pageNum = i
              } else if (pagination.page < 3) {
                pageNum = i
              } else if (pagination.page > pagination.totalPages - 3) {
                pageNum = pagination.totalPages - 5 + i
              } else {
                pageNum = pagination.page - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => cambiarPagina(pageNum)}
                  disabled={loading}
                  className={`px-3 py-2 border-t border-b border-r border-gray-300 bg-white text-sm font-medium ${
                    pagination.page === pageNum
                      ? "bg-blue-50 text-blue-600 border-blue-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNum + 1}
                </button>
              )
            })}
            <button
              onClick={() => cambiarPagina(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages - 1 || loading}
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Siguiente &rarr;
            </button>
          </nav>
        </div>
      )}

      {showModal && (
        <UserModal
          user={editingUser}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingUser(null)
          }}
          roles={rolesDisponibles}
          loading={loading}
        />
      )}
    </div>
  )
}

export default UsersManagementPage