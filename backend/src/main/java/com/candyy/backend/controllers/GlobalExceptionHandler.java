package com.candyy.backend.controllers;

import com.candyy.backend.domain.dto.ErrorDTO;
import com.candyy.backend.domain.dto.Response;
import com.candyy.backend.exceptions.NotFoundException;
import com.candyy.backend.exceptions.ReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Response<Void>> handleException(RuntimeException ex) {
        ErrorDTO error = new ErrorDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                ex.getMessage()
        );

        return new ResponseEntity<>(Response.failure(error), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Response<Void>> handleNotFoundException(NotFoundException ex) {
        ErrorDTO error = new ErrorDTO(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage()
        );

        return new ResponseEntity<>(Response.failure(error), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ReferenceException.class)
    public ResponseEntity<Response<Void>> handleReferenceException(ReferenceException ex) {
        ErrorDTO error = new ErrorDTO(
                HttpStatus.CONFLICT.value(),
                ex.getMessage()
        );

        return new ResponseEntity<>(Response.failure(error), HttpStatus.CONFLICT);
    }
}
