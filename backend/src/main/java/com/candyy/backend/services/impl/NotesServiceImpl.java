package com.candyy.backend.services.impl;

import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.domain.repositories.NoteRepository;
import com.candyy.backend.services.NotesService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NotesServiceImpl implements NotesService {
    private final NoteRepository noteRepository;

    public NotesServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public NoteEntity create(NoteEntity note) {
        note.setCreated(LocalDateTime.now());
        return noteRepository.save(note);
    }

    @Override
    public List<NoteEntity> findAll() {
        return noteRepository.findAll();
    }

    @Override
    public Page<NoteEntity> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Optional<NoteEntity> findOne(UUID id) {
        return noteRepository.findById(id);
    }

    @Override
    public boolean exists(UUID id) {
        return false;
    }

    @Override
    public NoteEntity partialUpdate(UUID id, NoteEntity note) {
        return null;
    }

    @Override
    public void delete(UUID id) {

    }
}
