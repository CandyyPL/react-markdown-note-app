package com.candyy.backend.controllers;

import com.candyy.backend.domain.dto.NoteDTO;
import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.mappers.impl.NoteMapper;
import com.candyy.backend.services.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class NotesController {
    private final NoteService noteService;
    private final NoteMapper noteMapper;

    public NotesController(NoteService noteService, NoteMapper noteMapper) {
        this.noteService = noteService;
        this.noteMapper = noteMapper;
    }

    @PostMapping(path = "/notes")
    public ResponseEntity<NoteDTO> createNote(@RequestBody final NoteDTO noteDTO) {
        NoteEntity note = noteMapper.mapFrom(noteDTO);
        NoteEntity savedNote = noteService.create(note);

        return new ResponseEntity<>(noteMapper.mapTo(savedNote), HttpStatus.CREATED);
    }
}
