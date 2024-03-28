import { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

// eslint-disable-next-line react/prop-types
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false, shouldRender: false });

  const showToast = (message, type = 'info') => {
    setToast({ message, type, visible: true, shouldRender: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  useEffect(() => {
    if (!toast.visible && toast.shouldRender) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, shouldRender: false }));
      }, 300); // Match this with fade-out duration
      return () => clearTimeout(timer);
    }
  }, [toast.visible, toast.shouldRender]);

  const toastClasses = {
    info: "alert-info",
    success: "alert-success",
    error: "alert-error",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.shouldRender && (
        <div
          className={`toast toast-top toast-center transition-opacity duration-300 ${toast.visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: "opacity 0.5s ease-in-out" }}
        >
          <div className={`alert ${toastClasses[toast.type]}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
