"use client"

import { useState } from "react"
import UserFormModal from "../components/modal/UserFormModal"

interface User {
    id: string
    name: string
    email: string
    employeeId: string
    process: string
    role: string[]
    status: "active" | "inactive"
    createdAt: string
    lastActivity?: string
}

export default function UsersManagementPage() {
    const [users, setUsers] = useState<User[]>([
        {
            id: "1",
            name: "María García López",
            email: "maria.garcia@azdigital.gov.co",
            employeeId: "AZ00123",
            process: "Gestión Administrativa",
            role: ["Gestor"],
            status: "active",
            createdAt: "2024-01-15",
            lastActivity: "Hace 2 horas",
        },
        {
            id: "2",
            name: "Carlos Rodríguez Pérez",
            email: "carlos.rodriguez@azdigital.gov.co",
            employeeId: "AZ00124",
            process: "Gestión Financiera",
            role: ["Aprobador"],
            status: "active",
            createdAt: "2024-01-14",
            lastActivity: "Ayer, 15:30",
        },
        {
            id: "3",
            name: "Ana Martínez Sánchez",
            email: "ana.martinez@azdigital.gov.co",
            employeeId: "AZ00125",
            process: "Gestión Técnica",
            role: ["Integrador", "Revisor"],
            status: "active",
            createdAt: "2024-01-13",
            lastActivity: "Hace 1 día",
        },
        {
            id: "4",
            name: "Juan Pérez Díaz",
            email: "juan.perez@azdigital.gov.co",
            employeeId: "AZ00126",
            process: "Auditoría Interna",
            role: ["Auditor"],
            status: "inactive",
            createdAt: "2024-01-10",
            lastActivity: "Hace 5 días",
        },
        {
            id: "5",
            name: "Laura Ruiz Torres",
            email: "laura.ruiz@azdigital.gov.co",
            employeeId: "AZ00127",
            process: "Seguimiento",
            role: ["Seguimiento"],
            status: "active",
            createdAt: "2024-01-09",
            lastActivity: "Hoy, 09:15",
        },
        {
            id: "6",
            name: "Pedro Sánchez Morales",
            email: "pedro.sanchez@azdigital.gov.co",
            employeeId: "AZ00128",
            process: "Gestión Social",
            role: ["Gestor"],
            status: "active",
            createdAt: "2024-01-08",
            lastActivity: "Hace 3 horas",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
    const [roleFilter, setRoleFilter] = useState("all")
    const [showUserForm, setShowUserForm] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const roles = ["Integrador", "Gestor", "Revisor", "Aprobador", "Auditor", "Seguimiento"]

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.process.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || user.status === statusFilter
        const matchesRole = roleFilter === "all" || user.role.includes(roleFilter)

        return matchesSearch && matchesStatus && matchesRole
    })

    const handleCreateUser = () => {
        setSelectedUser(null)
        setShowUserForm(true)
    }

    const handleEditUser = (user: User) => {
        setSelectedUser(user)
        setShowUserForm(true)
    }

    const handleToggleStatus = (userId: string) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === "active" ? "inactive" : "active" }
                : user
        ))
    }

    const handleDeleteUser = (userId: string) => {
        if (window.confirm("¿Está seguro de eliminar este usuario?")) {
            setUsers(users.filter(user => user.id !== userId))
        }
    }

    const handleSaveUser = (userData: Omit<User, "id" | "createdAt">) => {
        if (selectedUser) {
            // Editar usuario existente
            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? { ...user, ...userData }
                    : user
            ))
        } else {
            // Crear nuevo usuario
            const newUser: User = {
                id: `user_${Date.now()}`,
                ...userData,
                createdAt: new Date().toISOString().split('T')[0],
            }
            setUsers([newUser, ...users])
        }
        setShowUserForm(false)
        setSelectedUser(null)
    }

    const getRoleBadge = (role: string) => {
        const roleColors: Record<string, string> = {
            "Integrador": "bg-blue-100 text-blue-700 border-blue-200",
            "Gestor": "bg-green-100 text-green-700 border-green-200",
            "Revisor": "bg-yellow-100 text-yellow-700 border-yellow-200",
            "Aprobador": "bg-purple-100 text-purple-700 border-purple-200",
            "Auditor": "bg-red-100 text-red-700 border-red-200",
            "Seguimiento": "bg-indigo-100 text-indigo-700 border-indigo-200",
        }

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${roleColors[role] || "bg-gray-100 text-gray-700"}`}>
                {role}
            </span>
        )
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">👥 Gestión de Usuarios</h1>
                        <p className="text-gray-600">Administra los usuarios del sistema AZ Digital</p>
                    </div>
                    <button
                        onClick={handleCreateUser}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <span>+</span>
                        Crear nuevo usuario
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar usuario</label>
                            <input
                                type="text"
                                placeholder="Nombre, email o ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as any)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Todos los roles</option>
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Usuario</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Proceso/Área</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rol(es)</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Creado</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700 font-mono">{user.employeeId}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700">{user.process}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {user.role.map(role => getRoleBadge(role))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.status === "active" ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                <span>●</span> Activo
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                <span>●</span> Inactivo
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700">{user.createdAt}</p>
                                        {user.lastActivity && (
                                            <p className="text-xs text-gray-500">Activo: {user.lastActivity}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(user.id)}
                                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${user.status === "active"
                                                    ? "text-yellow-600 hover:bg-yellow-50"
                                                    : "text-green-600 hover:bg-green-50"
                                                    }`}
                                            >
                                                {user.status === "active" ? "Desactivar" : "Activar"}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">👤</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron usuarios</h3>
                        <p className="text-gray-500 mb-4">Intenta cambiar los filtros de búsqueda</p>
                        <button
                            onClick={() => {
                                setSearchTerm("")
                                setStatusFilter("all")
                                setRoleFilter("all")
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Total usuarios</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Activos</p>
                    <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === "active").length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Inactivos</p>
                    <p className="text-2xl font-bold text-red-600">{users.filter(u => u.status === "inactive").length}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Roles distintos</p>
                    <p className="text-2xl font-bold text-blue-600">{roles.length}</p>
                </div>
            </div>

            {/* User Form Modal */}
            {showUserForm && (
                <UserFormModal
                    user={selectedUser}
                    onClose={() => {
                        setShowUserForm(false)
                        setSelectedUser(null)
                    }}
                    onSave={handleSaveUser}
                    roles={roles}
                />
            )}
        </div>
    )
}