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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Test
    public void manyTagsCreatedAndRecalled() {
        List<TagEntity> tags = new ArrayList<>();

        for (var i = 0; i < 3; i++) {
            TagEntity tag = TestDataUtil.createTestTag();

            TagEntity savedTag = tagRepository.save(tag);

            tags.add(tag);
        }

        List<TagEntity> dbTags = tagRepository.findAll();

        assertThat(dbTags).hasSize(3);
        assertThat(dbTags).containsExactlyElementsOf(tags);
    }

    @Test
    public void tagCreatedUpdatedAndRecalled() {
        TagEntity tag = TestDataUtil.createTestTag();
        TagEntity savedTag = tagRepository.save(tag);

        savedTag.setName("Updated Name");

        tagRepository.save(savedTag);

        Optional<TagEntity> dbTag = tagRepository.findById(savedTag.getId());

        assertThat(dbTag).isPresent();
        assertThat(dbTag.get()).isEqualTo(savedTag);
    }

    @Test
    public void tagCreatedAndDeleted() {
        TagEntity tag = TestDataUtil.createTestTag();
        TagEntity savedTag = tagRepository.save(tag);

        tagRepository.deleteById(savedTag.getId());

        Optional<TagEntity> dbTag = tagRepository.findById(savedTag.getId());

        assertThat(dbTag).isEmpty();
    }
}
