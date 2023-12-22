package com.example.controller;

import com.example.model.Text;
import com.example.service.TextCompletionService;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/v1/text-review")
public class TextReviewerResource {

    private final TextCompletionService textCompletionService;

    public TextReviewerResource(TextCompletionService textCompletionService) {
        this.textCompletionService = textCompletionService;
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    public String review(Text text) {
        return textCompletionService.review(text);
    }
}
