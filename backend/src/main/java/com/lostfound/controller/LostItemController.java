package com.lostfound.controller;

import com.lostfound.dto.LostItemRequest;
import com.lostfound.dto.LostItemResponse;
import com.lostfound.model.User;
import com.lostfound.service.LostItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lost-items")
@RequiredArgsConstructor
public class LostItemController {

    private final LostItemService lostItemService;

    @PostMapping
    public ResponseEntity<LostItemResponse> reportItem(
            @Valid @RequestBody LostItemRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(lostItemService.reportLostItem(request, user.getId()));
    }

    @GetMapping
    public ResponseEntity<List<LostItemResponse>> getAllItems() {
        return ResponseEntity.ok(lostItemService.getAllActiveItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LostItemResponse> getItem(@PathVariable Long id) {
        return ResponseEntity.ok(lostItemService.getItemById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<LostItemResponse>> searchItems(@RequestParam String keyword) {
        return ResponseEntity.ok(lostItemService.searchItems(keyword));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<LostItemResponse>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(lostItemService.getItemsByCategory(category));
    }

    @GetMapping("/my")
    public ResponseEntity<List<LostItemResponse>> getMyItems(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(lostItemService.getUserItems(user.getId()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LostItemResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(lostItemService.updateStatus(id, status, user.getId()));
    }
}
