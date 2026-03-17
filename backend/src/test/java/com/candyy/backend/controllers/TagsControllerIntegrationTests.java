package com.candyy.backend.controllers;

import com.candyy.backend.TestDataUtil;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.domain.repositories.TagRepository;
import com.candyy.backend.services.TagsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class TagsControllerIntegrationTests {
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;
    private final TagsService tagsService;
    private final TagRepository tagRepository;

    @Autowired
    public TagsControllerIntegrationTests(MockMvc mockMvc, ObjectMapper objectMapper, TagsService tagsService, TagRepository tagRepository) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
        this.tagsService = tagsService;
        this.tagRepository = tagRepository;
    }

    @BeforeEach
    public void setup() {
        tagRepository.deleteAll();
    }

    @Test
    public void crateTagGivesCorrectResponse() throws Exception {
        TagEntity tag = TestDataUtil.createTestTag();
        String tagJson = objectMapper.writeValueAsString(tag);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/tags")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void tagCreatedReturnsCorrectTag() throws Exception {
        TagEntity tag = TestDataUtil.createTestTag();
        String tagJson = objectMapper.writeValueAsString(tag);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/tags")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagJson)
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.name").value(tag.getName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.slug").value(tag.getSlug())
        );
    }

    @Test
    public void recallAllTagsGivesCorrectResponse() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/tags")
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void recallAllTagsReturnsTagsList() throws Exception {
        List<TagEntity> tags = new ArrayList<>();

        for (var i = 0; i < 3; i++) {
            TagEntity tag = TestDataUtil.createTestTag();
            TagEntity savedTag = tagsService.create(tag);

            tags.add(savedTag);
        }

        mockMvc.perform(
                MockMvcRequestBuilders.get("/tags")
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].id").value(tags.get(0).getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].id").value(tags.get(0).getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[2].name").value(tags.get(2).getName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[2].name").value(tags.get(2).getName())
        );
    }

    @Test
    public void recallTagGivesCorrectResponse() throws Exception {
        TagEntity tag = TestDataUtil.createTestTag();
        TagEntity savedTag = tagsService.create(tag);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/tags/" + savedTag.getId().toString())
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void recallTagReturnsTag() throws Exception {
        TagEntity tag = TestDataUtil.createTestTag();
        TagEntity savedTag = tagsService.create(tag);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/tags/" + savedTag.getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.id").value(savedTag.getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.name").value(savedTag.getName())
        );
    }
}
