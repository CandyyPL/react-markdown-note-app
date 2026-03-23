package com.candyy.backend.domain.dto;

public record ErrorDTO(
        int code,
        String message
) {
}
