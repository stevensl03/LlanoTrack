// EntityManagementPage.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useCuentaEntidadService } from '../../../shared/hooks/useCuentaEntidadService';
import type { 
  EntidadCrearRequest, 
  EntidadActualizarRequest, 
  EntidadResponse, 
} from '../../../shared/types/cuentaEntidadType';

// Importar componentes
import HeaderBar from '../components/Entidad/HeaderBar';
import SearchBar from '../components/Entidad/SearchBar';
import StatsBar from '../components/Entidad/StatsBar';
import EntityList from '../components/Entidad/EntityList';
import ErrorDisplay from '../components/Entidad/ErrorDisplay';
import EntityModal from '../components/modal/EntityModal';

const EntityManagementPage: React.FC = () => {
  // Usar el hook del servicio
  const { 
    entidades,
    entidadSeleccionada,
    loadingEntidades,
    errorEntidades,
    crearEntidad,
    actualizarEntidad,
    eliminarEntidad,
    listarEntidades,
    buscarEntidades,
    seleccionarEntidad,
    limpiarErrores,
    resetearEstado,
   // actualizarContadoresEntidades, // Asegúrate de agregar esto al hook
  } = useCuentaEntidadService();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingEntity, setEditingEntity] = useState<EntidadResponse | null>(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        await listarEntidades();
        // Opcional: Actualizar contadores si es necesario
        // await actualizarContadoresEntidades();
      } catch (error) {
        console.error('Error al cargar entidades:', error);
      }
    };
    
    cargarDatos();
    
    return () => {
      resetearEstado();
    };
  }, [listarEntidades, resetearEstado]);

  // Filtrar entidades localmente
  const filteredEntities = useMemo(() => {
    if (!searchTerm.trim()) return entidades;
    
    const termino = searchTerm.toLowerCase();
    return entidades.filter(entity =>
      entity.nombreEntidad.toLowerCase().includes(termino) ||
      entity.dominioCorreo.toLowerCase().includes(termino)
    );
  }, [entidades, searchTerm]);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta entidad?\n\nEsto también eliminará todas las cuentas asociadas.')) {
      try {
        await eliminarEntidad(id);
        alert('Entidad eliminada exitosamente');
      } catch (error: any) {
        alert(error.message || 'Error al eliminar entidad');
      }
    }
  };

  const handleEdit = (entity: EntidadResponse) => {
    setEditingEntity(entity);
    setShowModal(true);
  };

  const handleSave = async (entityData: { nombreEntidad: string; dominioCorreo: string }) => {
    try {
      if (editingEntity) {
        const updateData: EntidadActualizarRequest = {
          nombreEntidad: entityData.nombreEntidad,
          dominioCorreo: entityData.dominioCorreo,
        };
        await actualizarEntidad(editingEntity.id, updateData);
      } else {
        const createData: EntidadCrearRequest = {
          nombreEntidad: entityData.nombreEntidad,
          dominioCorreo: entityData.dominioCorreo,
        };
        await crearEntidad(createData);
      }
      
      await listarEntidades();
      setShowModal(false);
      setEditingEntity(null);
      alert(editingEntity ? 'Entidad actualizada exitosamente' : 'Entidad creada exitosamente');
    } catch (error: any) {
      alert(error.message || 'Error al guardar entidad');
    }
  };

  const handleAddNew = () => {
    setEditingEntity(null);
    setShowModal(true);
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        await buscarEntidades(searchTerm);
      } catch (error) {
        console.error('Error en búsqueda:', error);
      }
    } else {
      await listarEntidades();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    listarEntidades();
  };

  if (errorEntidades && entidades.length === 0) {
    return (
      <ErrorDisplay 
        error={errorEntidades}
        onRetry={() => listarEntidades()}
        onClear={limpiarErrores}
      />
    );
  }

  return (
    <div className="p-6">
      <HeaderBar 
        title="🏢 Gestión de Entidades"
        buttonText="Nueva Entidad"
        loading={loadingEntidades}
        onButtonClick={handleAddNew}
      />

      <SearchBar
        searchTerm={searchTerm}
        loading={loadingEntidades}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onSearchTermChange={setSearchTerm}
      />

      {errorEntidades && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error: </strong> {errorEntidades}
        </div>
      )}

      <StatsBar
        filteredCount={filteredEntities.length}
        totalCount={entidades.length}
        searchTerm={searchTerm}
      />

      <EntityList
        entities={filteredEntities}
        loading={loadingEntidades}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <EntityModal
          entity={editingEntity}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingEntity(null);
          }}
          loading={loadingEntidades}
        />
      )}
    </div>
  );
};

export default EntityManagementPage;