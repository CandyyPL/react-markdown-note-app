package com.candyy.backend.repositories;

import com.candyy.backend.TestDataUtil;
import com.candyy.backend.domain.entities.NoteEntity;
import com.candyy.backend.domain.entities.TagEntity;
import com.candyy.backend.domain.repositories.NoteRepository;
import com.candyy.backend.domain.repositories.TagRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@Transactional
public class NoteRepositoryIntegrationTests {
    private final NoteRepository noteRepository;
    private final TagRepository tagRepository;

    @Autowired
    public NoteRepositoryIntegrationTests(NoteRepository noteRepository, TagRepository tagRepository) {
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
    }

    @BeforeEach
    public void setup() {
        noteRepository.deleteAll();
    }

    @Test
    public void noteCreatedAndRecalled() {
        NoteEntity note = TestDataUtil.createTestNote();

        NoteEntity savedNote = noteRepository.save(note);

        assertThat(savedNote.getTitle()).isEqualTo(note.getTitle());
        assertThat(savedNote.getBody()).isEqualTo(note.getBody());
    }

    @Test
    public void noteWithTagCreatedAndRecalled() {
        NoteEntity note = TestDataUtil.createTestNote();
        TagEntity tag = TestDataUtil.createTestTag();

        HashSet<TagEntity> tagSet = new HashSet<>(Set.of(tag));

        note.setTags(tagSet);

        tagRepository.save(tag);
        NoteEntity savedNote = noteRepository.save(note);

        assertThat(savedNote.getTags()).isEqualTo(tagSet);
    }

    @Test
    public void manyNotesCreatedAndRecalled() {
        List<NoteEntity> notes = new ArrayList<>();

        for (var i = 0; i < 3; i++) {
            NoteEntity note = TestDataUtil.createTestNote();

            NoteEntity savedNote = noteRepository.save(note);

            notes.add(savedNote);
        }

        List<NoteEntity> dbNotes = noteRepository.findAll();

        assertThat(dbNotes).hasSize(3);
        assertThat(dbNotes).containsExactlyElementsOf(notes);
    }

    @Test
    public void noteCreatedUpdatedAndRecalled() {
        NoteEntity note = TestDataUtil.createTestNote();

        NoteEntity savedNote = noteRepository.save(note);

        savedNote.setTitle("Updated Title");

        noteRepository.save(savedNote);

        Optional<NoteEntity> dbNote = noteRepository.findById((savedNote.getId()));

        assertThat(dbNote).isPresent();
        assertThat(dbNote.get()).isEqualTo(savedNote);
    }

    @Test
    public void noteCreatedAndDeleted() {
        NoteEntity note = TestDataUtil.createTestNote();
        NoteEntity savedNote = noteRepository.save(note);

        noteRepository.deleteById(savedNote.getId());

        Optional<NoteEntity> dbNote = noteRepository.findById(savedNote.getId());

        assertThat(dbNote).isEmpty();
    }
}
