package com.lostfound.controller;

import com.lostfound.dto.FoundItemRequest;
import com.lostfound.dto.FoundItemResponse;
import com.lostfound.model.User;
import com.lostfound.service.FoundItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/found-items")
@RequiredArgsConstructor
public class FoundItemController {

    private final FoundItemService foundItemService;

    @PostMapping
    public ResponseEntity<FoundItemResponse> reportItem(
            @Valid @RequestBody FoundItemRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(foundItemService.reportFoundItem(request, user.getId()));
    }

    @GetMapping
    public ResponseEntity<List<FoundItemResponse>> getAllItems() {
        return ResponseEntity.ok(foundItemService.getAllUnclaimedItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoundItemResponse> getItem(@PathVariable Long id) {
        return ResponseEntity.ok(foundItemService.getItemById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<FoundItemResponse>> searchItems(@RequestParam String keyword) {
        return ResponseEntity.ok(foundItemService.searchItems(keyword));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<FoundItemResponse>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(foundItemService.getItemsByCategory(category));
    }

    @GetMapping("/my")
    public ResponseEntity<List<FoundItemResponse>> getMyItems(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(foundItemService.getUserItems(user.getId()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<FoundItemResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(foundItemService.updateStatus(id, status, user.getId()));
    }
}
