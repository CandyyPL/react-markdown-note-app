package com.candyy.backend.services;

import com.candyy.backend.domain.entities.NoteEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NoteService {
    NoteEntity create(NoteEntity note);

    List<NoteEntity> findAll();

    Page<NoteEntity> findAll(Pageable pageable);

    Optional<NoteEntity> findOne(UUID id);

    boolean exists(UUID id);

    NoteEntity partialUpdate(UUID id, NoteEntity note);

    void delete(UUID id);
}
