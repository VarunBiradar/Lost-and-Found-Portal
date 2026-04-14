package com.lostfound.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClaimRequest {

    @NotNull(message = "Found item ID is required")
    private Long foundItemId;

    @NotBlank(message = "Proof of ownership is required")
    private String proof;
}
