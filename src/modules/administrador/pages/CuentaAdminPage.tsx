// src/pages/CuentaAdminPage.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useCuentaEntidadService } from '../../../shared/hooks/useCuentaEntidadService';
import type { 
  CuentaResponse, 
  CuentaCrearRequest, 
  CuentaActualizarRequest 
} from '../../../shared/types/cuentaEntidadType';

// Componentes
import ConfirmDeleteDialog from '../components/modal/ConfirmDeleteDialog';
import CuentaForm from '../components/cuenta/CuentaForm';
import CuentaTable from '../components/cuenta/CuentaTable';
import CuentaSearchBar from '../components/cuenta/CuentaSearchBar';
import CuentaStats from '../components/cuenta/CuentaStats';
import CuentaFilters from '../components/cuenta/CuentaFilters';

const CuentaAdminPage: React.FC = () => {
  // Usar el hook del servicio
  const {
    cuentas,
    loadingCuentas,
    errorCuentas,
    crearCuenta,
    actualizarCuenta,
    eliminarCuenta,
    listarCuentas,
    buscarCuentas,
    entidades,
    limpiarErrores,
  } = useCuentaEntidadService();

  // Estados para la UI
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<CuentaResponse | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showCuentaForm, setShowCuentaForm] = useState<boolean>(false);
  const [editingAccount, setEditingAccount] = useState<CuentaResponse | null>(null);
  const [filterEntity, setFilterEntity] = useState<number | 'all'>('all');

  // Cargar datos al montar
  useEffect(() => {
    const loadData = async () => {
      try {
        await listarCuentas();
      } catch (error) {
        console.error('Error al cargar cuentas:', error);
      }
    };
    loadData();
  }, [listarCuentas]);

  // Manejar búsqueda
  const handleSearch = useCallback(async () => {
    if (searchTerm.trim()) {
      try {
        await buscarCuentas(searchTerm);
      } catch (error) {
        console.error('Error en búsqueda:', error);
      }
    } else {
      await listarCuentas();
    }
  }, [searchTerm, buscarCuentas, listarCuentas]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    listarCuentas();
  }, [listarCuentas]);

  // Manejar eliminación
  const handleDeleteClick = (cuenta: CuentaResponse) => {
    setSelectedAccount(cuenta);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAccount) {
      try {
        await eliminarCuenta(selectedAccount.id);
        alert(`✓ Cuenta "${selectedAccount.nombreCuenta}" eliminada exitosamente`);
        await listarCuentas();
      } catch (error: any) {
        alert(`✗ Error al eliminar cuenta: ${error.message || 'Error desconocido'}`);
      } finally {
        setSelectedAccount(null);
      }
    }
  };

  // Manejar crear/editar
  const handleAddNew = () => {
    setEditingAccount(null);
    setShowCuentaForm(true);
  };

  const handleEditClick = (cuenta: CuentaResponse) => {
    setEditingAccount(cuenta);
    setShowCuentaForm(true);
  };

  const handleFormSubmit = async (data: CuentaCrearRequest | CuentaActualizarRequest) => {
    try {
      if (editingAccount) {
        // Actualizar cuenta existente
        await actualizarCuenta(editingAccount.id, data as CuentaActualizarRequest);
        alert(`✓ Cuenta "${data.nombreCuenta}" actualizada exitosamente`);
      } else {
        // Crear nueva cuenta
        await crearCuenta(data as CuentaCrearRequest);
        alert(`✓ Cuenta "${data.nombreCuenta}" creada exitosamente`);
      }
      
      // Recargar lista y cerrar formulario
      await listarCuentas();
      setShowCuentaForm(false);
      setEditingAccount(null);
    } catch (error: any) {
      alert(`✗ Error: ${error.message || 'Error desconocido'}`);
    }
  };

  // Filtrar cuentas
  const filteredAccounts = useMemo(() => {
    let filtered = [...cuentas];

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        cuenta =>
          cuenta.nombreCuenta.toLowerCase().includes(term) ||
          cuenta.correoCuenta.toLowerCase().includes(term) ||
          cuenta.nombreEntidad?.toLowerCase().includes(term)
      );
    }

    // Filtrar por entidad
    if (filterEntity !== 'all') {
      filtered = filtered.filter(cuenta => cuenta.entidadId === filterEntity);
    }

    return filtered;
  }, [cuentas, searchTerm, filterEntity]);

  // Estados de carga y error
  if (loadingCuentas && cuentas.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          Cargando cuentas...
        </div>
      </div>
    );
  }

  if (errorCuentas && cuentas.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <div className="flex justify-between items-center">
            <div>
              <strong>Error: </strong> {errorCuentas}
            </div>
            <button onClick={limpiarErrores} className="text-red-700 hover:text-red-900">
              ✕
            </button>
          </div>
        </div>
        <button
          onClick={() => listarCuentas()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👤 Administración de Cuentas</h1>
        <p className="text-gray-600 mt-1">Gestiona todas las cuentas de correo del sistema</p>
      </div>

      {/* Barra de búsqueda */}
      <CuentaSearchBar
        searchTerm={searchTerm}
        loading={loadingCuentas}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onSearchTermChange={setSearchTerm}
        onAddNew={handleAddNew}
      />

      {/* Estadísticas */}
      <CuentaStats
        totalCuentas={cuentas.length}
        cuentasFiltradas={filteredAccounts.length}
        totalEntidades={entidades.length}
      />

      {/* Filtros */}
      <CuentaFilters
        entidades={entidades}
        filterEntity={filterEntity}
        loading={loadingCuentas}
        onFilterChange={setFilterEntity}
      />

      {/* Mensajes de error */}
      {errorCuentas && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error: </strong> {errorCuentas}
        </div>
      )}

      {/* Información de filtros */}
      <div className="mb-4 text-sm text-gray-600">
        {searchTerm && (
          <div className="inline-block mr-4">
            Búsqueda: <span className="font-semibold">"{searchTerm}"</span>
          </div>
        )}
        {filterEntity !== 'all' && (
          <div className="inline-block">
            Entidad: <span className="font-semibold">
              {entidades.find(e => e.id === filterEntity)?.nombreEntidad || 'Desconocida'}
            </span>
          </div>
        )}
      </div>

      {/* Tabla de cuentas */}
      <CuentaTable
        cuentas={filteredAccounts}
        loading={loadingCuentas}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Diálogo de confirmación de eliminación */}
      <ConfirmDeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedAccount(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación de Cuenta"
        message="¿Estás completamente seguro de que deseas eliminar esta cuenta de correo? Esta acción es irreversible."
        confirmText="CONFIRMAR"
        itemName={selectedAccount ? `${selectedAccount.nombreCuenta} (${selectedAccount.correoCuenta})` : ''}
        itemType="esta cuenta de correo"
      />

      {/* Formulario para crear/editar cuenta */}
      {showCuentaForm && (
        <CuentaForm
          entidades={entidades}
          cuentaExistente={editingAccount ? {
            id: editingAccount.id,
            nombreCuenta: editingAccount.nombreCuenta,
            correoCuenta: editingAccount.correoCuenta,
            entidadId: editingAccount.entidadId,
          } : undefined}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowCuentaForm(false);
            setEditingAccount(null);
          }}
          loading={loadingCuentas}
        />
      )}

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Información importante</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Puedes crear nuevas cuentas usando el botón "Nueva Cuenta"</li>
                <li>Para editar una cuenta, haz clic en el botón "Editar" correspondiente</li>
                <li>La eliminación de cuentas requiere doble confirmación por seguridad</li>
                <li>Cada cuenta debe tener un correo único en el sistema</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuentaAdminPage;