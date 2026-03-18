package com.candyy.backend.repositories;

import com.candyy.backend.TestDataUtil;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.domain.repositories.NoteRepository;
import com.candyy.backend.domain.repositories.TagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class TagRepositoryIntegrationTests {
    private final NoteRepository noteRepository;
    private final TagRepository tagRepository;

    @Autowired
    public TagRepositoryIntegrationTests(NoteRepository noteRepository, TagRepository tagRepository) {
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
    }

    @BeforeEach
    public void setup() {
        noteRepository.deleteAll();
        tagRepository.deleteAll();
    }

    @Test
    public void tagCreatedAndRecalled() {
        TagEntity tag = TestDataUtil.createTestTag();

        TagEntity savedTag = tagRepository.save(tag);

        assertThat(savedTag.getName()).isEqualTo(tag.getName());
        assertThat(savedTag.getSlug()).isEqualTo(tag.getSlug());
    }
}
