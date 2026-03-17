package com.candyy.backend.domain.repositories;

import com.candyy.backend.domain.entities.NoteEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface NoteRepository extends ListCrudRepository<NoteEntity, UUID>,
        PagingAndSortingRepository<NoteEntity, UUID> {
}
