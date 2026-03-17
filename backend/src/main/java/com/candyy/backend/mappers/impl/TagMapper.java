package com.candyy.backend.mappers.impl;

import com.candyy.backend.domain.dto.TagDTO;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.mappers.Mapper;

public class TagMapper implements Mapper<TagEntity, TagDTO> {
    @Override
    public TagDTO mapTo(TagEntity tagEntity) {
        return new TagDTO(
                tagEntity.getId(),
                tagEntity.getName(),
                tagEntity.getSlug()
        );
    }

    @Override
    public TagEntity mapFrom(TagDTO tagDTO) {
        return new TagEntity(
                tagDTO.id(),
                tagDTO.name(),
                tagDTO.slug()
        );
    }
}
