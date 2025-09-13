import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface FolderCreationContextType {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  removeFile: () => void;
  fileSize: number;
}

const FolderCreationContext = createContext<
  FolderCreationContextType | undefined
>(undefined);

interface FolderCreationProviderProps {
  children: ReactNode;
}

export const FolderCreationProvider: React.FC<FolderCreationProviderProps> = ({
  children,
}) => {
  const [selectedFile, setSelectedFileState] = useState<File | null>(null);

  const setSelectedFile = useCallback((file: File | null) => {
    setSelectedFileState(file);
  }, []);

  const removeFile = useCallback(() => {
    setSelectedFileState(null);
  }, []);

  const fileSize = selectedFile?.size || 0;

  const value: FolderCreationContextType = {
    selectedFile,
    setSelectedFile,
    removeFile,
    fileSize,
  };

  return (
    <FolderCreationContext.Provider value={value}>
      {children}
    </FolderCreationContext.Provider>
  );
};

export const useFolderCreation = (): FolderCreationContextType => {
  const context = useContext(FolderCreationContext);
  if (!context) {
    throw new Error(
      "useFolderCreation must be used within a FolderCreationProvider"
    );
  }
  return context;
};
