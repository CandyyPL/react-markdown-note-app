package com.candyy.backend.mappers.impl;

import com.candyy.backend.domain.dto.NoteDTO;
import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.domain.repositories.TagRepository;
import com.candyy.backend.mappers.Mapper;
import com.candyy.backend.services.TagsService;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class NoteMapper implements Mapper<NoteEntity, NoteDTO> {
    private final TagsService tagsService;
    private final TagRepository tagRepository;

    public NoteMapper(TagsService tagsService, TagRepository tagRepository) {
        this.tagsService = tagsService;
        this.tagRepository = tagRepository;
    }

    @Override
    public NoteDTO mapTo(NoteEntity noteEntity) {
        Set<TagEntity> noteTags = noteEntity.getTags();
        Set<UUID> noteTagIds = noteTags != null
                ? noteTags.stream().map(TagEntity::getId).collect(Collectors.toSet())
                : Collections.emptySet();

        return new NoteDTO(
                noteEntity.getId(),
                noteEntity.getTitle(),
                noteEntity.getBody(),
                noteTagIds
        );
    }

    @Override
    public NoteEntity mapFrom(NoteDTO noteDTO) {
        List<TagEntity> tags = tagsService.findAllById(noteDTO.tagIds().stream().toList());

        Set<TagEntity> tagEntities = noteDTO.tagIds().isEmpty()
                ? null
                : new HashSet<>(tags);

        return new NoteEntity(
                null,
                null,
                noteDTO.title(),
                noteDTO.body(),
                tagEntities
        );
    }
}
