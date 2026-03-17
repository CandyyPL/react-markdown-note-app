package com.candyy.backend.controllers;

import com.candyy.backend.domain.dto.NoteDTO;
import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.mappers.impl.NoteMapper;
import com.candyy.backend.services.NotesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/notes")
public class NotesController {
    private final NotesService notesService;
    private final NoteMapper noteMapper;

    public NotesController(NotesService notesService, NoteMapper noteMapper) {
        this.notesService = notesService;
        this.noteMapper = noteMapper;
    }

    @PostMapping
    public ResponseEntity<NoteDTO> createNote(@RequestBody final NoteDTO noteDTO) {
        NoteEntity note = noteMapper.mapFrom(noteDTO);
        NoteEntity savedNote = notesService.create(note);

        return new ResponseEntity<>(noteMapper.mapTo(savedNote), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getAllNotes() {
        List<NoteEntity> notes = notesService.findAll();
        List<NoteDTO> notesDTO = notes.stream().map(noteMapper::mapTo).toList();

        return new ResponseEntity<>(notesDTO, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<NoteDTO> getNote(@PathVariable("id") final UUID id) {
        Optional<NoteEntity> note = notesService.findOne(id);

        NoteDTO noteDTO = noteMapper.mapTo(note.get());

        return new ResponseEntity<>(noteDTO, HttpStatus.OK);
    }
}
