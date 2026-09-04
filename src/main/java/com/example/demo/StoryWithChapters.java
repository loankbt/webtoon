package com.example.demo;

import java.util.List;

public record StoryWithChapters(Story story, List<Chapter> chapters) {
}
