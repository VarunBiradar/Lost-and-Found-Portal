package com.lostfound.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClaimResponse {
    private Long id;
    private Long foundItemId;
    private String foundItemName;
    private Long claimantId;
    private String claimantName;
    private String proof;
    private String status;
    private LocalDateTime createdAt;
}
