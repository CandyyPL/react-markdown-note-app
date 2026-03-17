package com.candyy.backend.controllers;

import com.candyy.backend.TestDataUtil;
import com.candyy.backend.domain.entities.TagEntity;
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

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class TagsControllerIntegrationTests {
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    @Autowired
    public TagsControllerIntegrationTests(MockMvc mockMvc, ObjectMapper objectMapper) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
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
}
