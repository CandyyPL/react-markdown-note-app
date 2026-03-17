package com.candyy.backend.mappers.impl;

import com.candyy.backend.domain.dto.NoteDTO;
import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.mappers.Mapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class NoteMapper implements Mapper<NoteEntity, NoteDTO> {
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
        return new NoteEntity(
                null,
                null,
                noteDTO.title(),
                noteDTO.body(),
                null
        );
    }
}
