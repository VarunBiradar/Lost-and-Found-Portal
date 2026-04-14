package com.lostfound.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStats {
    private long totalLostItems;
    private long totalFoundItems;
    private long activeLostItems;
    private long unclaimedFoundItems;
    private long pendingClaims;
    private long resolvedItems;
}
