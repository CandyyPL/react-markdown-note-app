package com.candyy.backend.domain.dto;

public record Response<T>(
        T data,
        ErrorDTO error
) {
    public static <T> Response<T> success(T data) {
        return new Response<>(data, null);
    }

    public static <T> Response<T> failure(ErrorDTO error) {
        return new Response<>(null, error);
    }
}
