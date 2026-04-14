package com.lostfound.controller;

import com.lostfound.dto.ClaimRequest;
import com.lostfound.dto.ClaimResponse;
import com.lostfound.model.User;
import com.lostfound.service.ClaimService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    @PostMapping
    public ResponseEntity<ClaimResponse> submitClaim(
            @Valid @RequestBody ClaimRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(claimService.submitClaim(request, user.getId()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ClaimResponse>> getMyClaims(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(claimService.getUserClaims(user.getId()));
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<ClaimResponse>> getClaimsForItem(
            @PathVariable Long itemId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(claimService.getClaimsForItem(itemId));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ClaimResponse>> getPendingClaims() {
        return ResponseEntity.ok(claimService.getPendingClaims());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ClaimResponse> approveClaim(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(claimService.approveClaim(id, user.getId()));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ClaimResponse> rejectClaim(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(claimService.rejectClaim(id, user.getId()));
    }
}
