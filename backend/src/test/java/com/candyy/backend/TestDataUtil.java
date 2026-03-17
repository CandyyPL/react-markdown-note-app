package com.candyy.backend;

import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.domain.entities.TagEntity;

import java.time.LocalDateTime;
import java.util.Collections;

public class TestDataUtil {
    public static TagEntity createTestTag() {
        return new TagEntity(null, "Example Tag Name", "Example Tag Slug");
    }

    public static NoteEntity createTestNote() {
        return new NoteEntity(null,
                LocalDateTime.now(),
                "Example Note Title",
                "Example note Body",
                Collections.emptySet());
    }
}
