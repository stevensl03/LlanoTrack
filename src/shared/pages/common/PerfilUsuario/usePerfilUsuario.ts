// hooks/usePerfilUsuario.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../../state/AuthContext';
import useUsuarios from '../../../../shared/hooks/useUsuarios';
import type { UsuarioResponse, UsuarioActualizarRequest } from '../../../../shared/types/usuarioTypes';

export const usePerfilUsuario = () => {
  const { user: currentUser } = useAuth();
  const { obtenerUsuarioPorCorreo, actualizarUsuario, loading, error } = useUsuarios();
  
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Cargar datos del usuario
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser?.email) {
        try {
          const usuarioData = await obtenerUsuarioPorCorreo(currentUser.email);
          setUsuario(usuarioData);
        } catch (error) {
          console.error('Error cargando datos del usuario:', error);
        }
      }
    };

    loadUserData();
  }, [currentUser?.email, obtenerUsuarioPorCorreo]);

  // Actualizar perfil
  const handleSavePerfil = useCallback(async (userData: UsuarioActualizarRequest) => {
    if (!usuario) return;

    setSaving(true);
    setSaveMessage(null);

    try {
      const usuarioActualizado = await actualizarUsuario(usuario.id, userData);
      setUsuario(usuarioActualizado);
      setSaveMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      
      setTimeout(() => setSaveMessage(null), 3000);
      return usuarioActualizado;
    } catch (error: any) {
      setSaveMessage({ 
        type: 'error', 
        text: error.message || 'Error al actualizar el perfil' 
      });
      throw error;
    } finally {
      setSaving(false);
    }
  }, [usuario, actualizarUsuario]);

  const clearSaveMessage = useCallback(() => {
    setSaveMessage(null);
  }, []);

  return {
    usuario,
    loading,
    error,
    saving,
    saveMessage,
    handleSavePerfil,
    clearSaveMessage
  };
};