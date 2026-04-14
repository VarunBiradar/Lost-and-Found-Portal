package com.lostfound.repository;

import com.lostfound.model.FoundItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoundItemRepository extends JpaRepository<FoundItem, Long> {

    List<FoundItem> findByStatusOrderByCreatedAtDesc(FoundItem.ItemStatus status);

    List<FoundItem> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<FoundItem> findByCategoryAndStatusOrderByCreatedAtDesc(String category, FoundItem.ItemStatus status);

    @Query("SELECT f FROM FoundItem f WHERE f.status = :status AND " +
           "(LOWER(f.itemName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<FoundItem> searchByKeyword(@Param("keyword") String keyword, @Param("status") FoundItem.ItemStatus status);

    @Query("SELECT COUNT(f) FROM FoundItem f WHERE f.status = :status")
    long countByStatus(@Param("status") FoundItem.ItemStatus status);
}
