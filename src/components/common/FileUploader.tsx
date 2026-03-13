'use client';

import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

interface FileUploaderProps {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;           // e.g. "image/*,.pdf"
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;        // optional size limit
  className?: string;
}

export default function FileUploader({
  onFilesSelected,
  accept = '.xlsx',
  multiple = true,
  maxFiles = 5,
  maxSizeMB = 10,
  className,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (selectedFiles: File[]): File[] => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    selectedFiles.forEach((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push(`${file.name} is too large (max ${maxSizeMB}MB)`);
        return;
      }
      validFiles.push(file);
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
      setTimeout(() => setError(''), 4000);
    }

    return validFiles.slice(0, maxFiles);
  };

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const valid = validateFiles(fileArray);

    const updatedFiles = multiple
      ? [...files, ...valid].slice(0, maxFiles)
      : valid.slice(0, 1);

    setFiles(updatedFiles);
    onFilesSelected?.(updatedFiles);
    setError('');
  }, [files, multiple, maxFiles, onFilesSelected]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesSelected?.(updated);
  };

  const clearAll = () => {
    setFiles([]);
    onFilesSelected?.([]);
  };

  const getPreviewUrl = (file: File): string | null => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const displayText = files.length > 0
    ? `Drop more files here or click to add (${files.length} selected)`
    : 'Drag & drop files here or click to browse';

  return (
    <UploaderContainer className={className}>
      <DropZone
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        isDragging={isDragging}
      >
        <UploadIcon>📤</UploadIcon>
        <DropText>{displayText}</DropText>
        <SupportedText>
          Supports: images, PDF, DOC • Max {maxSizeMB}MB per file
        </SupportedText>

        {files.length > 0 && (
          <InnerFileList>
            <InnerHeader>
              <span>Selected files</span>
              <ClearButton onClick={clearAll}>Clear all</ClearButton>
            </InnerHeader>

            {files.map((file, index) => {
              const previewUrl = getPreviewUrl(file);
              return (
                <FileItem key={index}>
                  {previewUrl ? (
                    <PreviewImage src={previewUrl} alt={file.name} />
                  ) : (
                    <FileIcon>📄</FileIcon>
                  )}

                  <FileInfo>
                    <FileName>{file.name}</FileName>
                    <FileSize>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </FileSize>
                  </FileInfo>

                  <RemoveButton
                    onClick={(e) => {
                      e.stopPropagation(); // ← prevents opening file dialog when removing
                      removeFile(index);
                    }}
                  >
                    ✕
                  </RemoveButton>
                </FileItem>
              );
            })}
          </InnerFileList>
        )}

        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
        />
      </DropZone>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </UploaderContainer>
  );
};

const UploaderContainer = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
`;

const DropZone = styled.div<{ isDragging: boolean }>`
  border: 3px dashed
    ${({ isDragging }) => (isDragging ? '#3b82f6' : '#d1d5db')};
  border-radius: 16px;
  padding: 48px 24px 32px;
  text-align: center;
  background: ${({ isDragging }) =>
    isDragging ? '#eff6ff' : '#f8fafc'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  user-select: none;
  position: relative;

  &:hover {
    border-color: #3b82f6;
    background: #f0f9ff;
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const DropText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const SupportedText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const InnerFileList = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  max-height: 260px;
  overflow-y: auto;
  width: 100%;
`;

const InnerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 12px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 14px;
  margin: 12px 0 0 0;
  text-align: center;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const PreviewImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
  border: 1px solid #e5e7eb;
`;

const FileIcon = styled.div`
  font-size: 28px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    background: #fee2e2;
  }
`;

const RemoveButton = styled.button`
  background: #fee2e2;
  color: #ef4444;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fecaca;
    transform: scale(1.1);
  }
`;