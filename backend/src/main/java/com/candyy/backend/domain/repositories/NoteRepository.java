package com.candyy.backend.domain.repositories;

import com.candyy.backend.domain.entities.NoteEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NoteRepository extends ListCrudRepository<NoteEntity, UUID>,
        PagingAndSortingRepository<NoteEntity, UUID> {
}
