"use client"

import styled from 'styled-components';
import React, { useState, ChangeEvent } from "react";

type FileUploaderProps = {
  onFileSelect: (file: File | null) => void;
};

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setFileName(null);
      onFileSelect(null);
      return;
    }

    const isXlsx =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.endsWith(".xlsx");

    if (!isXlsx) {
      alert("Apenas arquivos .xlsx são permitidos");
      event.target.value = "";
      setFileName(null);
      onFileSelect(null);
      return;
    }

    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <Container>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <Label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        {fileName ? <FileUploaded>Arquivo: {fileName.substring(0, 10) + '...'}</FileUploaded> : 'Selecionar arquivo XLSX'}
      </Label>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: .5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const Label = styled.label`
  font-size: 12px;
`

const FileUploaded = styled.label`
  color: green;
  font-weight: bold;
  margin: 0;
`