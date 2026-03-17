package com.candyy.backend.controllers;

import com.candyy.backend.TestDataUtil;
import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.domain.repositories.NoteRepository;
import com.candyy.backend.services.NotesService;
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
public class NotesControllerIntegrationTests {
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;
    private final NotesService notesService;
    private final NoteRepository noteRepository;

    @Autowired
    public NotesControllerIntegrationTests(MockMvc mockMvc, ObjectMapper objectMapper, NotesService notesService, NoteRepository noteRepository) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
        this.notesService = notesService;
        this.noteRepository = noteRepository;
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
    public void recallNoteReturnsNote() throws Exception {
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
}
