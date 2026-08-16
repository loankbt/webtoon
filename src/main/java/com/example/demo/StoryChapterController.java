package com.example.demo;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StoryChapterController {

    private final ChapterRepository chapterRepo;
    private final ChapterImageRepository chapterImageRepo;

    public StoryChapterController(StoryRepository storyRepo, ChapterRepository chapterRepo, ChapterImageRepository chapterImageRepo) {
        this.chapterRepo = chapterRepo;
        this.chapterImageRepo = chapterImageRepo;
    }

    @GetMapping("/stories/{id}/chapters")
    public List<Chapter> getChapters(@PathVariable Long id) {
        return chapterRepo.findByStoryId(id);
    }

    @GetMapping("/chapter/{id}")
    public List<ChapterImage> getChapterImages(@PathVariable Long id) {
        return chapterImageRepo.findByChapterId(id);
    }
}
