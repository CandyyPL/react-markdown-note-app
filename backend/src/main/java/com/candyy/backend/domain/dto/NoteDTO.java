package com.candyy.backend.domain.dto;

import java.util.Set;
import java.util.UUID;

public record NoteDTO(
        UUID id,
        String createdAt,
        String title,
        String body,
        Set<UUID> tagIds
) {
}
