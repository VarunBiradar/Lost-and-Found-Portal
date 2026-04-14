package com.lostfound.repository;

import com.lostfound.model.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LostItemRepository extends JpaRepository<LostItem, Long> {

    List<LostItem> findByStatusOrderByCreatedAtDesc(LostItem.ItemStatus status);

    List<LostItem> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<LostItem> findByCategoryAndStatusOrderByCreatedAtDesc(String category, LostItem.ItemStatus status);

    @Query("SELECT l FROM LostItem l WHERE l.status = :status AND " +
           "(LOWER(l.itemName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(l.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<LostItem> searchByKeyword(@Param("keyword") String keyword, @Param("status") LostItem.ItemStatus status);

    @Query("SELECT COUNT(l) FROM LostItem l WHERE l.status = :status")
    long countByStatus(@Param("status") LostItem.ItemStatus status);
}
