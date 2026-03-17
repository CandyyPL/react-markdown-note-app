package com.candyy.backend.domain.repositories;

import com.candyy.backend.domain.entities.TagEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface TagRepository extends ListCrudRepository<TagEntity, UUID>,
        PagingAndSortingRepository<TagEntity, UUID> {
}
