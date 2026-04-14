package com.lostfound.service;

import com.lostfound.dto.ClaimRequest;
import com.lostfound.dto.ClaimResponse;
import com.lostfound.model.Claim;
import com.lostfound.model.FoundItem;
import com.lostfound.model.User;
import com.lostfound.repository.ClaimRepository;
import com.lostfound.repository.FoundItemRepository;
import com.lostfound.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final FoundItemRepository foundItemRepository;
    private final UserRepository userRepository;

    @Transactional
    public ClaimResponse submitClaim(ClaimRequest request, Long claimantId) {
        FoundItem foundItem = foundItemRepository.findById(request.getFoundItemId())
                .orElseThrow(() -> new RuntimeException("Found item not found"));

        if (foundItem.getUser().getId().equals(claimantId)) {
            throw new RuntimeException("You cannot claim your own found item");
        }

        if (claimRepository.existsByFoundItemIdAndClaimantId(request.getFoundItemId(), claimantId)) {
            throw new RuntimeException("You have already submitted a claim for this item");
        }

        if (foundItem.getStatus() != FoundItem.ItemStatus.UNCLAIMED) {
            throw new RuntimeException("This item has already been claimed");
        }

        User claimant = userRepository.findById(claimantId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Claim claim = Claim.builder()
                .foundItem(foundItem)
                .claimant(claimant)
                .proof(request.getProof())
                .status(Claim.ClaimStatus.PENDING)
                .build();

        claim = claimRepository.save(claim);
        return mapToResponse(claim);
    }

    public List<ClaimResponse> getUserClaims(Long userId) {
        return claimRepository.findByClaimantIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ClaimResponse> getClaimsForItem(Long itemId) {
        return claimRepository.findByFoundItemIdOrderByCreatedAtDesc(itemId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ClaimResponse> getPendingClaims() {
        return claimRepository.findByStatusOrderByCreatedAtDesc(Claim.ClaimStatus.PENDING)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ClaimResponse approveClaim(Long claimId, Long userId) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        // Only the person who found the item can approve claims
        if (!claim.getFoundItem().getUser().getId().equals(userId)) {
            throw new RuntimeException("Only the finder can approve claims");
        }

        claim.setStatus(Claim.ClaimStatus.APPROVED);
        claim = claimRepository.save(claim);

        // Update found item status to CLAIMED
        FoundItem foundItem = claim.getFoundItem();
        foundItem.setStatus(FoundItem.ItemStatus.CLAIMED);
        foundItemRepository.save(foundItem);

        // Reject all other pending claims for this item
        List<Claim> otherClaims = claimRepository.findByFoundItemIdOrderByCreatedAtDesc(foundItem.getId());
        for (Claim other : otherClaims) {
            if (!other.getId().equals(claimId) && other.getStatus() == Claim.ClaimStatus.PENDING) {
                other.setStatus(Claim.ClaimStatus.REJECTED);
                claimRepository.save(other);
            }
        }

        return mapToResponse(claim);
    }

    @Transactional
    public ClaimResponse rejectClaim(Long claimId, Long userId) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        if (!claim.getFoundItem().getUser().getId().equals(userId)) {
            throw new RuntimeException("Only the finder can reject claims");
        }

        claim.setStatus(Claim.ClaimStatus.REJECTED);
        claim = claimRepository.save(claim);
        return mapToResponse(claim);
    }

    private ClaimResponse mapToResponse(Claim claim) {
        return ClaimResponse.builder()
                .id(claim.getId())
                .foundItemId(claim.getFoundItem().getId())
                .foundItemName(claim.getFoundItem().getItemName())
                .claimantId(claim.getClaimant().getId())
                .claimantName(claim.getClaimant().getName())
                .proof(claim.getProof())
                .status(claim.getStatus().name())
                .createdAt(claim.getCreatedAt())
                .build();
    }
}
