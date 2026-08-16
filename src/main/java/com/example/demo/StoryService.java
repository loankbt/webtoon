package com.example.demo;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class StoryService {

    private final StoryRepository repository;

    public StoryService(StoryRepository repository) {
        this.repository = repository;
    }

    public List<Story> listAll() {
        return repository.findAll();
    }
}
