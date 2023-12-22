package com.example.config;

import io.smallrye.config.ConfigMapping;

import java.util.Map;

@ConfigMapping(prefix = "openai")
public interface OpenAIClientConfig {

    Map<String, String> config();
}
