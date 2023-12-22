package com.example.config;

import com.azure.ai.openai.OpenAIAsyncClient;
import com.microsoft.semantickernel.connectors.ai.openai.util.OpenAIClientProvider;
import com.microsoft.semantickernel.exceptions.ConfigurationException;
import jakarta.enterprise.inject.Produces;

public class OpenAIClientFactory {
    private final OpenAIClientConfig openAIClientConfig;

    public OpenAIClientFactory(OpenAIClientConfig openAIClientConfig) {
        this.openAIClientConfig = openAIClientConfig;
    }

    @Produces
    public OpenAIAsyncClient getClient() throws ConfigurationException {
        return new OpenAIClientProvider(openAIClientConfig.config(), null).getAsyncClient();
    }
}