"use client"

import styled from 'styled-components';
import React, { useState, ChangeEvent } from "react";

type FileUploaderProps = {
  onFileSelect: (files: File[]) => void;
};

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      setFileNames([]);
      onFileSelect([]);
      return;
    }

    // Validate that all files are .xlsx
    const invalidFiles = files.filter(file => {
      const isXlsx =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx");
      return !isXlsx;
    });

    if (invalidFiles.length > 0) {
      alert("Apenas arquivos .xlsx são permitidos");
      event.target.value = "";
      setFileNames([]);
      onFileSelect([]);
      return;
    }

    const names = files.map(file => file.name);
    setFileNames(names);
    onFileSelect(files);
  };

  return (
    <Container>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx"
        multiple
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <Label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        {fileNames.length > 0 ? (
          <div>
            <FileUploaded>
              {fileNames.length} arquivo(s) selecionado(s):
            </FileUploaded>
            <FileList>
              {fileNames.map((name, index) => (
                <FileItem key={index}>{name.substring(0, 20) + '...'}</FileItem>
              ))}
            </FileList>
          </div>
        ) : (
          'Selecionar arquivo(s) XLSX'
        )}
      </Label>
    </Container>
  );
};

const Container = styled.div`
  border: 1px dashed black;
  border-radius: 8px;
  padding: .5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 13.7rem;
`

const Label = styled.label`
  font-size: 12px;
  align-items: center;
`

const FileUploaded = styled.label`
  color: green;
  font-weight: bold;
  margin: 0;
  display: block;
`

const FileList = styled.ul`
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
  list-style-type: disc;
`

const FileItem = styled.li`
  font-size: 11px;
  color: #333;
  margin: 0.25rem 0;
`