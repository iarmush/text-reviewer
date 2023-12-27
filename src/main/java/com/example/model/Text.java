package com.example.model;

public record Text(String input, Tittle from, Tittle to, MessageType messageType,
                   OptionalFeatures optionalFeatures) {

    public enum Tittle {
        SE("Software Engineer"),
        EM("Engineering Manager");

        private final String tittleName;

        Tittle(String tittleName) {
            this.tittleName = tittleName;
        }

        public String getTittleName() {
            return tittleName;
        }
    }

    public enum MessageType {
        EMAIL("email"),
        DM("direct message");

        private final String messageTypeName;

        MessageType(String messageTypeName) {
            this.messageTypeName = messageTypeName;
        }

        public String getMessageTypeName() {
            return messageTypeName;
        }
    }

    public record OptionalFeatures(boolean isConcise, boolean isCreative, boolean isOfficial) {
    }
}

