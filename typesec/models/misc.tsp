import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Rest;
using TypeSpec.Http;


model ResponseHeaders {
    @header("ETag") eTag: string;
    @header("Cf-Cache-Status") cacheStatus: string;
    @header("X-Frame-Options") contentType: "SAMEORIGIN";
    @header("X-Content-Type-Options") contentOptions: "nosniff";
    @header("X-XSS-Protection") xssProtection: "1; mode=block";

    // Spond API version (probably /o/)
    @header("X-Spond-Release") release: string;
    @header("X-Spond-Requestid") requestId: string;
};

model Attachment {
    id: string;
    media: string;
    type: integer;
    title: string;
    ownerId: User.id;
    timestamp: utcDateTime;
}

model Comment {
    id: string;
    fromProfileId: User.id;
    text: string;
    timestamp: utcDateTime;
    reactions: Record<Record<unixTimestamp32>>;
}

model Location {
    latitude: integer;
    longitude: integer;
    addressLine: integer;
    featureName: string;
    country: string;
    administrativeAreaLevel1: string;
    administrativeAreaLevel2: string;
    locality: string;
    feature: string;
    address: string;
}

model Task {
    id: string;
    name: string;
    description: string;
    type: string;
    adultsOnly: boolean;
    limit: integer;
}


