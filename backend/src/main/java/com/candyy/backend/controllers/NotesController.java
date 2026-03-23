package com.candyy.backend.controllers;

import com.candyy.backend.domain.dto.NoteDTO;
import com.candyy.backend.domain.dto.Response;
import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.exceptions.NotFoundException;
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
@CrossOrigin(origins = "http://localhost:5173")
public class NotesController {
    private final NotesService notesService;
    private final NoteMapper noteMapper;

    public NotesController(NotesService notesService, NoteMapper noteMapper) {
        this.notesService = notesService;
        this.noteMapper = noteMapper;
    }

    @PostMapping
    public ResponseEntity<Response<NoteDTO>> createNote(@RequestBody final NoteDTO noteDTO) {
        NoteEntity note = noteMapper.mapFrom(noteDTO);
        NoteEntity savedNote = notesService.create(note);
        NoteDTO savedNoteDTO = noteMapper.mapTo(savedNote);

        return new ResponseEntity<>(Response.success(savedNoteDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Response<List<NoteDTO>>> getAllNotes() {
        List<NoteEntity> notes = notesService.findAll();
        List<NoteDTO> notesDTO = notes.stream().map(noteMapper::mapTo).toList();

        return new ResponseEntity<>(Response.success(notesDTO), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<NoteDTO>> getNote(@PathVariable("id") final UUID id) {
        Optional<NoteEntity> note = notesService.findOne(id);

        if (note.isEmpty()) {
            throw new NotFoundException("Could not find note with given id.");
        }

        NoteDTO noteDTO = noteMapper.mapTo(note.get());

        return new ResponseEntity<>(Response.success(noteDTO), HttpStatus.OK);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Response<NoteDTO>> partialUpdateNote(
            @PathVariable("id") final UUID id,
            @RequestBody final NoteDTO noteDTO
    ) {
        if (!notesService.exists(id)) {
            throw new NotFoundException("Could not find note with given id.");
        }

        NoteEntity note = noteMapper.mapFrom(noteDTO);
        NoteEntity savedNote = notesService.partialUpdate(id, note);
        NoteDTO savedNoteDTO = noteMapper.mapTo(savedNote);

        return new ResponseEntity<>(Response.success(savedNoteDTO), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") final UUID id) {
        if (!notesService.exists(id)) {
            throw new NotFoundException("Could not find note with given id.");
        }

        notesService.delete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
