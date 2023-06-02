package com.mizule.server.utils;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class File {
    @Column(insertable=false, updatable=false)
    private String fileName;

    @Column(insertable=false, updatable=false)
    private String fileType;

    @Column(insertable=false, updatable=false)
    private byte[] fileData;

    public String getFileName() {
        return fileName;
    }

    public void setName(String name) {
        this.fileName = name;
    }

    public String getType() {
        return fileType;
    }

    public void setFileType(String type) {
        this.fileType = type;
    }

    public byte[] getData() {
        return fileData;
    }

    public void setFileData(byte[] data) {
        this.fileData = data;
    }
}
