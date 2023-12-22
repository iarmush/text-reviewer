package com.example.service;

import com.example.model.Text;
import com.microsoft.semantickernel.SKBuilders;
import com.microsoft.semantickernel.orchestration.SKContext;
import com.microsoft.semantickernel.textcompletion.CompletionSKFunction;
import jakarta.enterprise.context.ApplicationScoped;


@ApplicationScoped
public class TextCompletionService {

    private final CompletionSKFunction completionSKFunction;

    public TextCompletionService(CompletionSKFunction completionSKFunction) {
        this.completionSKFunction = completionSKFunction;
    }

    public String review(Text text) {
        SKContext reviewerContext = SKBuilders.context().build();
        reviewerContext.setVariable("body", text.body());
        reviewerContext.setVariable("messageType", text.messageType().getMessageTypeName());
        reviewerContext.setVariable("from", text.from().getTittleName());
        reviewerContext.setVariable("to", text.to().getTittleName());
        reviewerContext.setVariable("isOfficial", String.valueOf(text.isOfficial()));
        reviewerContext.setVariable("beCreative", String.valueOf(text.beCreative()));

        return completionSKFunction.invokeAsync(reviewerContext)
                .block().getResult();
    }
}
