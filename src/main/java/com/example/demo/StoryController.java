package com.example.demo;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    private final StoryService storyService;
    private final ChapterService chapterService;

    public StoryController(StoryService storyService, ChapterService chapterService) {
        this.storyService = storyService;
        this.chapterService = chapterService;
    }

    @GetMapping
    public List<Story> listAll() {
        return storyService.listAll();
    }

    @GetMapping("/{title_id}")
    public StoryWithChapters getStoryByTitleId(@PathVariable("title_id") String titleId) {
        return storyService.findDetailsByTitleId(titleId);
    }

    @GetMapping("/{title_id}/{chapter_number}")
    public ChapterWithImages getChapterByTitleIdAndChapterNumber(@PathVariable("title_id") String titleId, @PathVariable("chapter_number") String chapterNumber) {
        return chapterService.findChapterByTitleIdAndChapterNumber(titleId, chapterNumber);
    }
}
