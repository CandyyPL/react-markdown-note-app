package com.candyy.backend.controllers;

import com.candyy.backend.domain.dto.TagDTO;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.mappers.impl.TagMapper;
import com.candyy.backend.services.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TagsController {
    private final TagService tagService;
    private final TagMapper tagMapper;

    public TagsController(TagService tagService, TagMapper tagMapper) {
        this.tagService = tagService;
        this.tagMapper = tagMapper;
    }

    @PostMapping(path = "/tags")
    public ResponseEntity<TagDTO> createTag(@RequestBody final TagDTO tagDTO) {
        TagEntity tag = tagMapper.mapFrom(tagDTO);
        TagEntity savedTag = tagService.create(tag);

        return new ResponseEntity<>(tagMapper.mapTo(savedTag), HttpStatus.CREATED);
    }
}
