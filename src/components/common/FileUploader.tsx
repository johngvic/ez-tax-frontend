"use client"

import styled from 'styled-components';
import { useState, ChangeEvent } from "react";
import { CloudUploadIcon, Trash2Icon } from 'lucide-react';

type FileUploaderProps = {
  onFileSelect: (files: File[]) => void;
};

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);

    if (uploadedFiles.length === 0) {
      setFileNames([]);
      setFiles([]);
      onFileSelect([]);
      return;
    }

    // Validate that all files are .xlsx
    const invalidFiles = uploadedFiles.filter(file => {
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
      setFiles([]);
      onFileSelect([]);
      return;
    }

    const names = uploadedFiles.map(file => file.name);
    setFileNames(names);
    setFiles(uploadedFiles);
    onFileSelect(uploadedFiles);
  };

  const handleRemoveFile = (e: React.MouseEvent<SVGSVGElement>, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    const newFileNames = [...fileNames];
    newFileNames.splice(index, 1);
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFileNames(newFileNames);
    setFiles(newFiles);
    onFileSelect(newFiles);
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

      <Label htmlFor="file-upload">
        {fileNames.length > 0 ? (
          <FilesContainer>
            {fileNames.map((name, index) => (
              <FileItem key={index}>
                <FileName>{name.substring(0, 20) + '...'}</FileName>
                <Trash2Icon
                  onClick={(event) => handleRemoveFile(event, index)}
                  style={{ color: '#676F79', width: 16, height: 16, cursor: 'pointer' }}
                />
              </FileItem>
            ))}
          </FilesContainer>
        ) : (
          <ExplanationContainer>
            <CloudUploadIcon style={{ color: '#676F79', width: 50, height: 50 }} />
            <ExplanationTitle>selecione arquivos XLSX</ExplanationTitle>
          </ExplanationContainer>
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
  height: 10rem;
  cursor: pointer;
  background-color: #F0F1F5;
  overflow-y: auto;
`

const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .8rem;
  align-items: center;
  margin-top: 2rem;
  cursor: pointer;
`

const ExplanationTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #676F79;
  margin: 0;
`

const Label = styled.label`
  font-size: 12px;
  align-items: center;
`

const FilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  align-items: center;
  gap: .4rem;
  
`

const FileItem = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: .5rem;
  height: 2.3rem;
  width: 16rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 .8rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`

const FileName = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  text-align: left;
`