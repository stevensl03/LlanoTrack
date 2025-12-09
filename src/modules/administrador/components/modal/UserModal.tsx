"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { UsuarioResponse, Rol } from "../../../../shared/types/usuarioTypes"
import { Rol as RolEnum } from "../../../../shared/types/usuarioTypes"

interface UserModalProps {
  user: UsuarioResponse | null
  onSave: (userData: UserFormData) => Promise<void>
  onClose: () => void
  roles: Rol[]
  loading?: boolean
}

interface UserFormData {
  nombres: string
  apellidos?: string
  correo: string
  numeroCelular: string
  password?: string
  confirmPassword?: string
  roles: Rol[]
}

const UserModal: React.FC<UserModalProps> = ({ user, onSave, onClose, roles, loading }) => {
  const [formData, setFormData] = useState<UserFormData>({
    nombres: user?.nombres || "",
    apellidos: user?.apellidos || "",
    correo: user?.correo || "",
    numeroCelular: user?.numeroCelular || "",
    password: "",
    confirmPassword: "",
    roles: user?.roles?.map((r) => r as Rol) || [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        correo: user.correo || "",
        numeroCelular: user.numeroCelular || "",
        password: "",
        confirmPassword: "",
        roles: (user.roles as Rol[]) || [],
      })
    } else {
      setFormData({
        nombres: "",
        apellidos: "",
        correo: "",
        numeroCelular: "",
        password: "",
        confirmPassword: "",
        roles: [],
      })
    }
    setErrors({})
  }, [user])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombres.trim()) {
      newErrors.nombres = "Los nombres son requeridos"
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Correo electrónico inválido"
    }

    if (formData.numeroCelular && !/^(3[0-2])[0-9]{8}$/.test(formData.numeroCelular)) {
      newErrors.numeroCelular = "Número de teléfono inválido. Formato: 3XXYYYYYYY"
    }

    if (!user && !formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    if (formData.roles.length === 0) {
      newErrors.roles = "Seleccione al menos un rol"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      await onSave(formData)
    }
  }

  const handleRoleChange = (role: Rol) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter((r) => r !== role) : [...prev.roles, role],
    }))
    if (errors.roles) {
      setErrors((prev) => ({ ...prev, roles: "" }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{user ? "✏️ Editar Usuario" : "👤 Nuevo Usuario"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" disabled={loading}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombres *</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.nombres ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                disabled={loading}
              />
              {errors.nombres && <p className="mt-1 text-sm text-red-600">{errors.nombres}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
              <input
                type="email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.correo ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                disabled={loading}
              />
              {errors.correo && <p className="mt-1 text-sm text-red-600">{errors.correo}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (Colombia)</label>
              <input
                type="tel"
                placeholder="3001234567"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.numeroCelular ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.numeroCelular}
                onChange={(e) => setFormData({ ...formData, numeroCelular: e.target.value })}
                disabled={loading}
              />
              {errors.numeroCelular && <p className="mt-1 text-sm text-red-600">{errors.numeroCelular}</p>}
              <p className="mt-1 text-xs text-gray-500">Formato: 3XXYYYYYYY</p>
            </div>

            {!user && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña *</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    disabled={loading}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Roles *</label>
            {errors.roles && <p className="mb-2 text-sm text-red-600">{errors.roles}</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.values(RolEnum).map((role) => {
                const roleInfo: Record<Rol, { color: string; desc: string }> = {
                  [RolEnum.INTEGRADOR]: {
                    color: "bg-purple-100 text-purple-800 border-purple-200",
                    desc: "Recibe y distribuye correos",
                  },
                  [RolEnum.GESTOR]: { color: "bg-blue-100 text-blue-800 border-blue-200", desc: "Elabora respuestas" },
                  [RolEnum.REVISOR]: {
                    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                    desc: "Revisa respuestas",
                  },
                  [RolEnum.APROBADOR]: {
                    color: "bg-green-100 text-green-800 border-green-200",
                    desc: "Aprueba envíos finales",
                  },
                }

                const info = roleInfo[role] || { color: "bg-gray-100 text-gray-800 border-gray-200", desc: "" }

                return (
                  <div
                    key={role}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      formData.roles.includes(role)
                        ? `${info.color} border-blue-500 ring-2 ring-blue-200`
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleRoleChange(role)}
                  >
                    <div className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(role)}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={loading}
                      />
                      <span className="ml-2 font-medium">{role}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{info.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Guardando...
                </>
              ) : user ? (
                "Actualizar Usuario"
              ) : (
                "Crear Usuario"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal
