package com.candyy.backend.services;

import com.candyy.backend.domain.entities.TagEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TagService {
    TagEntity create(TagEntity tag);

    List<TagEntity> findAll();

    Page<TagEntity> findAll(Pageable pageable);

    Optional<TagEntity> findOne(UUID id);

    boolean exists(UUID id);

    TagEntity partialUpdate(UUID id, TagEntity tag);

    void delete(UUID id);
}
