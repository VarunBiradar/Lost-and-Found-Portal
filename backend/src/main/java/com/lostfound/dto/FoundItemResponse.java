package com.lostfound.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoundItemResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String itemName;
    private String description;
    private String category;
    private String locationFound;
    private LocalDate foundDate;
    private String imagePath;
    private String status;
    private LocalDateTime createdAt;
}
