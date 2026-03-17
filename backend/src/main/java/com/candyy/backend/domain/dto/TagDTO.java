package com.candyy.backend.domain.dto;

import java.util.UUID;

public record TagDTO(
        UUID id,
        String name,
        String slug
) {
}
