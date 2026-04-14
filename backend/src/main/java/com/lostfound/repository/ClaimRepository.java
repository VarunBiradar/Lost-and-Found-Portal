package com.lostfound.repository;

import com.lostfound.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {

    List<Claim> findByClaimantIdOrderByCreatedAtDesc(Long claimantId);

    List<Claim> findByFoundItemIdOrderByCreatedAtDesc(Long foundItemId);

    List<Claim> findByStatusOrderByCreatedAtDesc(Claim.ClaimStatus status);

    boolean existsByFoundItemIdAndClaimantId(Long foundItemId, Long claimantId);

    long countByStatus(Claim.ClaimStatus status);
}
