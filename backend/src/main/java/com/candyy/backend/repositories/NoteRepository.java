package com.candyy.backend.repositories;

import com.candyy.backend.entities.NoteEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface NoteRepository extends ListCrudRepository<NoteEntity, UUID>,
        PagingAndSortingRepository<NoteEntity, UUID> {
}
