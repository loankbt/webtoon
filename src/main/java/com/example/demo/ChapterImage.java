package com.example.demo;

import java.sql.Timestamp;

public class ChapterImage {
    private Long id;
    private Long chapterId;
    private Integer pageNumber;
    private String filePath;
    private String caption;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public ChapterImage() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getChapterId() { return chapterId; }
    public void setChapterId(Long chapterId) { this.chapterId = chapterId; }

    public Integer getPageNumber() { return pageNumber; }
    public void setPageNumber(Integer pageNumber) { this.pageNumber = pageNumber; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}
