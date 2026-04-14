package com.lostfound.service;

import com.lostfound.dto.LostItemRequest;
import com.lostfound.dto.LostItemResponse;
import com.lostfound.model.LostItem;
import com.lostfound.model.User;
import com.lostfound.repository.LostItemRepository;
import com.lostfound.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LostItemService {

    private final LostItemRepository lostItemRepository;
    private final UserRepository userRepository;

    public LostItemResponse reportLostItem(LostItemRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LostItem item = LostItem.builder()
                .user(user)
                .itemName(request.getItemName())
                .description(request.getDescription())
                .category(request.getCategory())
                .location(request.getLocation())
                .lostDate(request.getLostDate())
                .status(LostItem.ItemStatus.ACTIVE)
                .build();

        item = lostItemRepository.save(item);
        return mapToResponse(item);
    }

    public List<LostItemResponse> getAllActiveItems() {
        return lostItemRepository.findByStatusOrderByCreatedAtDesc(LostItem.ItemStatus.ACTIVE)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public LostItemResponse getItemById(Long id) {
        LostItem item = lostItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lost item not found"));
        return mapToResponse(item);
    }

    public List<LostItemResponse> searchItems(String keyword) {
        return lostItemRepository.searchByKeyword(keyword, LostItem.ItemStatus.ACTIVE)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<LostItemResponse> getItemsByCategory(String category) {
        return lostItemRepository.findByCategoryAndStatusOrderByCreatedAtDesc(category, LostItem.ItemStatus.ACTIVE)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<LostItemResponse> getUserItems(Long userId) {
        return lostItemRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public LostItemResponse updateStatus(Long id, String status, Long userId) {
        LostItem item = lostItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lost item not found"));

        if (!item.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only update your own items");
        }

        item.setStatus(LostItem.ItemStatus.valueOf(status.toUpperCase()));
        item = lostItemRepository.save(item);
        return mapToResponse(item);
    }

    private LostItemResponse mapToResponse(LostItem item) {
        return LostItemResponse.builder()
                .id(item.getId())
                .userId(item.getUser().getId())
                .userName(item.getUser().getName())
                .itemName(item.getItemName())
                .description(item.getDescription())
                .category(item.getCategory())
                .location(item.getLocation())
                .lostDate(item.getLostDate())
                .imagePath(item.getImagePath())
                .status(item.getStatus().name())
                .createdAt(item.getCreatedAt())
                .build();
    }
}
