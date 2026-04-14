package com.lostfound.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class FoundItemRequest {

    @NotBlank(message = "Item name is required")
    private String itemName;

    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    private String locationFound;

    private LocalDate foundDate;
}
