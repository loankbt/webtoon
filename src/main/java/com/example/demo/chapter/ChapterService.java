package com.example.demo.chapter;

import java.util.List;

import com.example.demo.ImageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ChapterService {

    private final ChapterRepository repository;
    private final ImageRepository imageRepository;

    public ChapterService(ChapterRepository repository, ImageRepository imageRepository) {
        this.repository = repository;
        this.imageRepository = imageRepository;
    }

    public List<Chapter> findByStoryId(Long storyId) {
        return repository.findByStoryId(storyId);
    }

    public ChapterWithImages findChapterByTitleIdAndChapterNumber(String titleId, String chapterNumber) {
        Chapter chapter = repository.findChapterByTitleIdAndChapterNumber(titleId, chapterNumber)
            .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Not found chapter: " + chapterNumber));
        return new ChapterWithImages(chapter, imageRepository.findByChapterId(chapter.getId()));
    }
}
