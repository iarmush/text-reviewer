package com.example.config;

import com.microsoft.semantickernel.SKBuilders;
import com.microsoft.semantickernel.exceptions.ConfigurationException;
import com.microsoft.semantickernel.textcompletion.CompletionSKFunction;
import jakarta.enterprise.inject.Produces;

public class CompletionFunctionFactory {

    private static final String GPT_3_5_TURBO = "gpt-3.5-turbo";
    private static final String FUNCTION_NAME = "TextReview";
    private static final String SKILL_NAME = "TextReviewSkill";

    private final OpenAIClientFactory openAIClientFactory;

    public CompletionFunctionFactory(OpenAIClientFactory openAIClientFactory) {
        this.openAIClientFactory = openAIClientFactory;
    }

    @Produces
    public CompletionSKFunction getFunction() throws ConfigurationException {
        var textCompletion = SKBuilders.chatCompletion()
                .withOpenAIClient(openAIClientFactory.getClient())
                .withModelId(GPT_3_5_TURBO)
                .build();

        var kernel = SKBuilders.kernel()
                .withDefaultAIService(textCompletion)
                .build();

        return kernel.importSkillFromResources("", SKILL_NAME, FUNCTION_NAME)
                .getFunction(FUNCTION_NAME, CompletionSKFunction.class);
    }
}
