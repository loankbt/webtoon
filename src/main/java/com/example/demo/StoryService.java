package com.example.demo;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class StoryService {

    private final StoryRepository repository;
    private final ChapterRepository chapterRepository;

    public StoryService(StoryRepository repository, ChapterRepository chapterRepository) {
        this.repository = repository;
        this.chapterRepository = chapterRepository;
    }

    public List<Story> listAll() {
        return repository.findAll();
    }

    public StoryWithChapters findDetailsByTitleId(String titleId) {
        Story story = repository.findByTitleId(titleId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Not found title_id: " + titleId));
        return new StoryWithChapters(story, chapterRepository.findByStoryId(story.getId()));
    }
}
