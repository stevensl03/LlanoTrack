// src/components/ConfirmDeleteDialog.tsx
import React, { useState } from 'react';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  itemName?: string;
  itemType?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar Eliminación',
  message = 'Esta acción no se puede deshacer. Para confirmar, escribe "CONFIRMAR" en el campo de abajo.',
  confirmText = 'CONFIRMAR',
  itemName = '',
  itemType = 'este elemento',
}) => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (inputText.trim() === confirmText) {
      onConfirm();
      onClose();
      setInputText('');
      setError('');
    } else {
      setError(`Debes escribir exactamente "${confirmText}" para confirmar`);
    }
  };

  const handleClose = () => {
    onClose();
    setInputText('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>

        <div className="px-6 py-4 space-y-4">
          {itemName && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-md">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ Estás por eliminar: <span className="font-bold">{itemName}</span>
              </p>
            </div>
          )}

          <p className="text-gray-700">
            {message}
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Escribe <span className="font-mono font-bold text-red-600">{confirmText}</span> para confirmar:
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value.toUpperCase());
                if (error) setError('');
              }}
              placeholder={confirmText}
              autoFocus
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Advertencia:</strong> Esta acción eliminará permanentemente {itemType}.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={inputText.trim() !== confirmText}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              inputText.trim() === confirmText
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Confirmar Eliminación
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;