import React, { useState, useEffect } from 'react';
import { useMockService } from '../../../shared/hooks/useMockService';
import type { Entity, EntityFormData, User } from '../types/index';

const EntityManagementPage: React.FC = () => {
  // Usar el hook del servicio
  const { 
    getEntities, 
    createEntity, 
    updateEntity, 
    deleteEntity, 
    getUsers,
    loading, 
    error 
  } = useMockService();

  const [entities, setEntities] = useState<Entity[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Cargar entidades
    const entitiesResponse = await getEntities();
    if (entitiesResponse.success && entitiesResponse.data) {
      setEntities(entitiesResponse.data);
    }

    // Cargar usuarios para seleccionar responsables
    const usersResponse = await getUsers();
    if (usersResponse.success && usersResponse.data) {
      setUsers(usersResponse.data);
    }
  };

  const filteredEntities = entities.filter(entity =>
    entity.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.dominios.some(domain => domain.includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar esta entidad?')) {
      const response = await deleteEntity(id);
      if (response.success) {
        await loadData(); // Recargar la lista
      }
    }
  };

  const handleEdit = (entity: Entity) => {
    setEditingEntity(entity);
    setShowModal(true);
  };

  const handleSave = async (entityData: EntityFormData) => {
    if (editingEntity) {
      // Actualizar entidad existente
      const response = await updateEntity(editingEntity.id, entityData);
      if (response.success) {
        await loadData();
      }
    } else {
      // Crear nueva entidad
      const response = await createEntity(entityData);
      if (response.success) {
        await loadData();
      }
    }
    setShowModal(false);
    setEditingEntity(null);
  };

  const handleAddNew = () => {
    setEditingEntity(null);
    setShowModal(true);
  };

  // Filtrar usuarios para mostrar solo los que pueden ser responsables
  const availableResponsibles = users.filter(user => 
    user.rol === 'GESTOR' || user.rol === 'ADMIN'
  );

  if (loading && entities.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando entidades...</div>
      </div>
    );
  }

  if (error && entities.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error: </strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🏢 Gestión de Entidades</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <span className="mr-2">+</span> Nueva Entidad
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre o dominio..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error: </strong> {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dominios
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Responsable
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEntities.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'No se encontraron entidades con ese criterio' : 'No hay entidades registradas'}
                </td>
              </tr>
            ) : (
              filteredEntities.map((entity) => (
                <tr key={entity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entity.nombre}</div>
                    {entity.codigo && (
                      <div className="text-xs text-gray-500">Código: {entity.codigo}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {entity.dominios.map((domain, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
                          title={domain}
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entity.responsableNombre}</div>
                    <div className="text-xs text-gray-500">ID: {entity.responsableId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entity.activa 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {entity.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(entity)}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(entity.id)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear/editar entidad */}
      {showModal && (
        <EntityModal
          entity={editingEntity}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingEntity(null);
          }}
          responsibles={availableResponsibles}
          loading={loading}
        />
      )}
    </div>
  );
};

interface EntityModalProps {
  entity: Entity | null;
  onSave: (entityData: EntityFormData) => void;
  onClose: () => void;
  responsibles: User[];
  loading?: boolean;
}

const EntityModal: React.FC<EntityModalProps> = ({ 
  entity, 
  onSave, 
  onClose, 
  responsibles, 
  loading 
}) => {
  const [formData, setFormData] = useState<EntityFormData>({
    nombre: entity?.nombre || '',
    dominios: entity?.dominios || [],
    responsableId: entity?.responsableId || '',
    activa: entity?.activa ?? true,
  });
  const [tempDomain, setTempDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addDomain = () => {
    const domain = tempDomain.trim();
    if (domain && !formData.dominios.includes(domain)) {
      // Asegurar que el dominio empiece con @
      const formattedDomain = domain.startsWith('@') ? domain : `@${domain}`;
      setFormData({
        ...formData,
        dominios: [...formData.dominios, formattedDomain]
      });
      setTempDomain('');
    }
  };

  const removeDomain = (domain: string) => {
    setFormData({
      ...formData,
      dominios: formData.dominios.filter(d => d !== domain)
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addDomain();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {entity ? 'Editar Entidad' : 'Nueva Entidad'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Entidad *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dominios de Email *
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Ej: gov.co (sin @)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  value={tempDomain}
                  onChange={(e) => setTempDomain(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={addDomain}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                  disabled={loading || !tempDomain.trim()}
                >
                  Agregar
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 min-h-8">
                {formData.dominios.map((domain, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {domain}
                    <button
                      type="button"
                      onClick={() => removeDomain(domain)}
                      className="ml-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {formData.dominios.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Agregue al menos un dominio (ej: gov.co)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsable Predeterminado *
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={formData.responsableId}
                onChange={(e) => setFormData({ ...formData, responsableId: e.target.value })}
                disabled={loading}
              >
                <option value="">Seleccionar responsable...</option>
                {responsibles.map((responsible) => (
                  <option key={responsible.id} value={responsible.id}>
                    {responsible.nombre} ({responsible.rol})
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Solo se muestran usuarios con rol GESTOR o ADMIN
              </p>
            </div>

            {entity && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    checked={formData.activa}
                    onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
                    disabled={loading}
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Entidad activa
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={formData.dominios.length === 0 || !formData.responsableId || loading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                formData.dominios.length === 0 || !formData.responsableId || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Guardando...' : entity ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityManagementPage;