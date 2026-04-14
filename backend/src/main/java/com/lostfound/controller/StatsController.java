package com.lostfound.controller;

import com.lostfound.dto.DashboardStats;
import com.lostfound.model.Claim;
import com.lostfound.model.FoundItem;
import com.lostfound.model.LostItem;
import com.lostfound.repository.ClaimRepository;
import com.lostfound.repository.FoundItemRepository;
import com.lostfound.repository.LostItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StatsController {

    private final LostItemRepository lostItemRepository;
    private final FoundItemRepository foundItemRepository;
    private final ClaimRepository claimRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getStats() {
        DashboardStats stats = DashboardStats.builder()
                .totalLostItems(lostItemRepository.count())
                .totalFoundItems(foundItemRepository.count())
                .activeLostItems(lostItemRepository.countByStatus(LostItem.ItemStatus.ACTIVE))
                .unclaimedFoundItems(foundItemRepository.countByStatus(FoundItem.ItemStatus.UNCLAIMED))
                .pendingClaims(claimRepository.countByStatus(Claim.ClaimStatus.PENDING))
                .resolvedItems(
                    lostItemRepository.countByStatus(LostItem.ItemStatus.FOUND) +
                    foundItemRepository.countByStatus(FoundItem.ItemStatus.RETURNED)
                )
                .build();

        return ResponseEntity.ok(stats);
    }
}
