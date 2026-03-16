package com.candyy.backend;

import com.candyy.backend.entities.NoteEntity;
import com.candyy.backend.entities.TagEntity;
import com.candyy.backend.repositories.NoteRepository;
import com.candyy.backend.repositories.TagRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    private final NoteRepository noteRepository;
    private final TagRepository tagRepository;

    public BackendApplication(NoteRepository noteRepository, TagRepository tagRepository) {
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        TagEntity tag = new TagEntity(null, "Example Tag", "tag-example-tag");
        HashSet<TagEntity> tags = new HashSet<>(Set.of(tag));
        NoteEntity note = new NoteEntity(null, LocalDateTime.now(), "Example Note", "Example body", tags);

        TagEntity savedTag = tagRepository.save(tag);
        NoteEntity savedNote = noteRepository.save(note);

        System.out.println("Saved tag & note to Database!");

        Optional<NoteEntity> dbNote = noteRepository.findById(savedNote.getId());
        Set<TagEntity> noteTags = dbNote.get().getTags();

        UUID noteTagId = noteTags.stream().findFirst().get().getId();
        Optional<TagEntity> noteTag = tagRepository.findById(noteTagId);

        System.out.println("Note title: " + dbNote.get().getTitle());
        System.out.println("Note Tag: " + noteTag.get().getName());
    }
}
