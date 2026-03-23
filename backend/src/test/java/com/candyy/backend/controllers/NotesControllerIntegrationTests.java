package com.candyy.backend.controllers;

import com.candyy.backend.TestDataUtil;
import com.candyy.backend.domain.dto.NoteDTO;
import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.domain.repositories.NoteRepository;
import com.candyy.backend.services.NotesService;
import com.candyy.backend.services.TagsService;
import org.hamcrest.Matchers;
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

import java.util.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class NotesControllerIntegrationTests {
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;
    private final NotesService notesService;
    private final NoteRepository noteRepository;
    private final TagsService tagsService;

    @Autowired
    public NotesControllerIntegrationTests(MockMvc mockMvc, ObjectMapper objectMapper, NotesService notesService, NoteRepository noteRepository, TagsService tagsService) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
        this.notesService = notesService;
        this.noteRepository = noteRepository;
        this.tagsService = tagsService;
    }

    @BeforeEach
    public void setup() {
        noteRepository.deleteAll();
    }

    @Test
    public void noteCreatedGivesCorrectResponse() throws Exception {
        NoteEntity note = TestDataUtil.createTestNote();
        String noteJson = objectMapper.writeValueAsString(note);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/notes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(noteJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void noteCreatedReturnsCorrectNote() throws Exception {
        NoteEntity note = TestDataUtil.createTestNote();
        String noteJson = objectMapper.writeValueAsString(note);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/notes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(noteJson)
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.title").value(note.getTitle())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.body").value(note.getBody())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.tagIds").isEmpty()
        );
    }

    @Test
    public void recallAllNotesGivesCorrectResponse() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/notes")
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void recallAllNotesReturnsNotesList() throws Exception {
        List<NoteEntity> notes = new ArrayList<>();

        for (var i = 0; i < 3; i++) {
            NoteEntity note = TestDataUtil.createTestNote();
            NoteEntity savedNote = notesService.create(note);

            notes.add(savedNote);
        }

        mockMvc.perform(
                MockMvcRequestBuilders.get("/notes")
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].id").value(notes.get(0).getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[2].id").value(notes.get(2).getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].title").value(notes.get(0).getTitle())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[2].title").value(notes.get(2).getTitle())
        );
    }

    @Test
    public void recallNoteGivesCorrectResponse() throws Exception {
        NoteEntity note = TestDataUtil.createTestNote();
        NoteEntity savedNote = notesService.create(note);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/notes/" + savedNote.getId().toString())
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void recallNoteReturnsCorrectNote() throws Exception {
        NoteEntity note = TestDataUtil.createTestNote();
        NoteEntity savedNote = notesService.create(note);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/notes/" + savedNote.getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.id").value(savedNote.getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.title").value(savedNote.getTitle())
        );
    }

    @Test
    public void notePartialUpdateGivesCorrectResponse() throws Exception {
        NoteEntity note = TestDataUtil.createTestNote();
        NoteEntity savedNote = notesService.create(note);

        NoteDTO updatedNote = new NoteDTO(
                null,
                "New Title",
                null,
                Collections.emptySet()
        );

        String updatedNoteJson = objectMapper.writeValueAsString(updatedNote);

        mockMvc.perform(
                MockMvcRequestBuilders.patch("/notes/" + savedNote.getId().toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedNoteJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void notePartialUpdateReturnsUpdatedNote() throws Exception {
        NoteEntity note = TestDataUtil.createTestNote();
        TagEntity tag = TestDataUtil.createTestTag();

        NoteEntity savedNote = notesService.create(note);
        TagEntity savedTag = tagsService.create(tag);

        Set<UUID> tagIds = new HashSet<>(Set.of(savedTag.getId()));

        NoteDTO updatedNote = new NoteDTO(
                null,
                "New Title",
                null,
                tagIds
        );

        String updatedNoteJson = objectMapper.writeValueAsString(updatedNote);

        mockMvc.perform(
                MockMvcRequestBuilders.patch("/notes/" + savedNote.getId().toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedNoteJson)
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.id").value(savedNote.getId().toString())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.title").value(updatedNote.title())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.tagIds").isArray()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.tagIds", Matchers.hasSize(1))
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.tagIds", Matchers.everyItem(Matchers.isA(String.class)))
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$.tagIds", Matchers.contains(savedTag.getId().toString()))
        );
    }

    @Test
    public void noteDeleteGivesCorrectResponse() throws Exception {
        NoteEntity note = TestDataUtil.createTestNote();
        NoteEntity savedNote = notesService.create(note);

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/notes/" + savedNote.getId().toString())
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }
}
