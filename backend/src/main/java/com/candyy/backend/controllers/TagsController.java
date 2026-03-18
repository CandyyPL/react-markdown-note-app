package com.candyy.backend.controllers;

import com.candyy.backend.domain.dto.TagDTO;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.mappers.impl.TagMapper;
import com.candyy.backend.services.TagsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/tags")
public class TagsController {
    private final TagsService tagsService;
    private final TagMapper tagMapper;

    public TagsController(TagsService tagsService, TagMapper tagMapper) {
        this.tagsService = tagsService;
        this.tagMapper = tagMapper;
    }

    @PostMapping
    public ResponseEntity<TagDTO> createTag(@RequestBody final TagDTO tagDTO) {
        TagEntity tag = tagMapper.mapFrom(tagDTO);
        TagEntity savedTag = tagsService.create(tag);

        return new ResponseEntity<>(tagMapper.mapTo(savedTag), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TagDTO>> getAllTags() {
        List<TagEntity> tags = tagsService.findAll();
        List<TagDTO> tagsDTO = tags.stream().map(tagMapper::mapTo).toList();

        return new ResponseEntity<>(tagsDTO, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<TagDTO> getTag(@PathVariable("id") final UUID id) {
        Optional<TagEntity> tag = tagsService.findOne(id);

        TagDTO tagDTO = tagMapper.mapTo(tag.get());

        return new ResponseEntity<>(tagDTO, HttpStatus.OK);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<TagDTO> partialUpdateTag(
            @PathVariable("id") final UUID id,
            @RequestBody final TagDTO tagDTO
    ) {
        if (!tagsService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        TagEntity tag = tagMapper.mapFrom(tagDTO);
        TagEntity savedTag = tagsService.partialUpdate(id, tag);
        TagDTO savedTagDTO = tagMapper.mapTo(savedTag);

        return new ResponseEntity<>(savedTagDTO, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable("id") final UUID id) {
        if (!tagsService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        tagsService.delete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
