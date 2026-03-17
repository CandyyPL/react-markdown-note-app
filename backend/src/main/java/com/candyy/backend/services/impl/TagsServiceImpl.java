package com.candyy.backend.services.impl;

import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.domain.repositories.TagRepository;
import com.candyy.backend.services.TagsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TagsServiceImpl implements TagsService {
    private final TagRepository tagRepository;

    public TagsServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public TagEntity create(TagEntity tag) {
        return tagRepository.save(tag);
    }

    @Override
    public List<TagEntity> findAll() {
        return tagRepository.findAll();
    }

    @Override
    public Page<TagEntity> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Optional<TagEntity> findOne(UUID id) {
        return tagRepository.findById(id);
    }

    @Override
    public boolean exists(UUID id) {
        return false;
    }

    @Override
    public TagEntity partialUpdate(UUID id, TagEntity tag) {
        return null;
    }

    @Override
    public void delete(UUID id) {

    }
}
