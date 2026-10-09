package com.example.demo.story;

import java.util.List;

import com.example.demo.chapter.Chapter;

public record StoryWithChapters(Story story, List<Chapter> chapters) {
}
