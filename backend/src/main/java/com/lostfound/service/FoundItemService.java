package com.lostfound.service;

import com.lostfound.dto.FoundItemRequest;
import com.lostfound.dto.FoundItemResponse;
import com.lostfound.model.FoundItem;
import com.lostfound.model.User;
import com.lostfound.repository.FoundItemRepository;
import com.lostfound.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoundItemService {

    private final FoundItemRepository foundItemRepository;
    private final UserRepository userRepository;

    public FoundItemResponse reportFoundItem(FoundItemRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FoundItem item = FoundItem.builder()
                .user(user)
                .itemName(request.getItemName())
                .description(request.getDescription())
                .category(request.getCategory())
                .locationFound(request.getLocationFound())
                .foundDate(request.getFoundDate())
                .status(FoundItem.ItemStatus.UNCLAIMED)
                .build();

        item = foundItemRepository.save(item);
        return mapToResponse(item);
    }

    public List<FoundItemResponse> getAllUnclaimedItems() {
        return foundItemRepository.findByStatusOrderByCreatedAtDesc(FoundItem.ItemStatus.UNCLAIMED)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public FoundItemResponse getItemById(Long id) {
        FoundItem item = foundItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Found item not found"));
        return mapToResponse(item);
    }

    public List<FoundItemResponse> searchItems(String keyword) {
        return foundItemRepository.searchByKeyword(keyword, FoundItem.ItemStatus.UNCLAIMED)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<FoundItemResponse> getItemsByCategory(String category) {
        return foundItemRepository.findByCategoryAndStatusOrderByCreatedAtDesc(category, FoundItem.ItemStatus.UNCLAIMED)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<FoundItemResponse> getUserItems(Long userId) {
        return foundItemRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public FoundItemResponse updateStatus(Long id, String status, Long userId) {
        FoundItem item = foundItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Found item not found"));

        if (!item.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only update your own items");
        }

        item.setStatus(FoundItem.ItemStatus.valueOf(status.toUpperCase()));
        item = foundItemRepository.save(item);
        return mapToResponse(item);
    }

    private FoundItemResponse mapToResponse(FoundItem item) {
        return FoundItemResponse.builder()
                .id(item.getId())
                .userId(item.getUser().getId())
                .userName(item.getUser().getName())
                .itemName(item.getItemName())
                .description(item.getDescription())
                .category(item.getCategory())
                .locationFound(item.getLocationFound())
                .foundDate(item.getFoundDate())
                .imagePath(item.getImagePath())
                .status(item.getStatus().name())
                .createdAt(item.getCreatedAt())
                .build();
    }
}
